// the public entry: installDebugRecorder() and window.webitelDebug
import { onBeforeLogout, onSessionUser } from '../../../scripts/sessionHooks';
import { originalConsole } from '../collectors/console';
import { appSlug, enabledUntil, resolveEnabled, STORAGE } from '../config';
import type { RecorderApp, RecorderStats } from '../types';
import { arm, canRead } from './ownership';
import {
	download,
	startRecording,
	stopHere,
	wipeDebugRecorder,
} from './recording';
import { PREFIX, RUNTIME_KEY, runtimeHolder, state } from './state';
import {
	deleteDatabase,
	removeLegacyStores,
	safeLocalStorage,
} from './storage-flags';
import { onSessionUserChanged } from './user-change';

export interface DebugRecorderOptions {
	/** short app id, e.g. `workspace`; tags every record and names the archive */
	app: string;
	/** app version written into the archive */
	version?: string;
}

export interface WebitelDebugApi {
	readonly recording: boolean;
	/** when the flag switches itself off, or null if recording is off */
	readonly enabledUntil: number | null;
	/** turns recording on for 24 h in every app of this origin and starts it in this tab right away */
	enable(): Promise<void>;
	/** stops recording everywhere and deletes everything recorded */
	disable(): Promise<void>;
	download(): Promise<void>;
	stats(): Promise<RecorderStats | null>;
}

declare global {
	interface Window {
		webitelDebug?: WebitelDebugApi;
	}
}

/**
 * Opt-in debug recorder: `?debug=1` (or `webitelDebug.enable()`, or the
 * settings toggle) turns it on for 24 h in every webitel app of this origin;
 * all of them write into one store, so one archive shows the whole path.
 * Call it before anything opens a WebSocket or RTCPeerConnection — in practice
 * from a file imported first in `main.ts`. Off by default: then it only defines
 * `window.webitelDebug` and cleans up leftovers. Records are deleted on logout
 * and when another user signs in, through the Userinfo store's session hooks.
 */
export function installDebugRecorder(
	options: DebugRecorderOptions,
): WebitelDebugApi {
	// a second copy of the module (an app may load it twice) reuses the first one
	if (window.webitelDebug) return window.webitelDebug;
	const info: RecorderApp = {
		name: appSlug(options.app),
		version: options.version,
	};
	state.app = info;

	const api: WebitelDebugApi = {
		get recording() {
			return state.sink !== null;
		},
		get enabledUntil() {
			return enabledUntil();
		},
		async enable() {
			const wasOn = enabledUntil() !== null;
			// a tab still recording past the expiry: its store is about to be emptied, start over
			if (!wasOn && state.sink) await stopHere();
			arm(wasOn);
			if (!state.sink) startRecording(info, true);
		},
		async disable() {
			await wipeDebugRecorder();
			originalConsole.info(PREFIX, 'stopped, recorded data deleted');
		},
		download,
		stats: async () => (state.sink && canRead() ? state.sink.stats() : null),
	};
	// read-only: a stray `webitelDebug = …` (e.g. pasted into the console) cannot swap the API under the settings UI
	Object.defineProperty(window, 'webitelDebug', {
		value: api,
		writable: false,
		enumerable: false,
		configurable: true,
	});
	runtimeHolder[RUNTIME_KEY] = {
		stop: stopHere,
	};
	removeLegacyStores();

	onBeforeLogout(() => wipeDebugRecorder());
	onSessionUser((userId) => onSessionUserChanged(userId));
	window.addEventListener('storage', (event) => {
		if (event.key === STORAGE.enabled && event.newValue === null) {
			void stopHere();
		}
	});
	window.addEventListener('keydown', (event) => {
		if (
			event.ctrlKey &&
			event.altKey &&
			event.shiftKey &&
			event.code === 'KeyD'
		) {
			event.preventDefault();
			void download();
		}
	});

	const wasOn = enabledUntil() !== null;
	if (resolveEnabled()) {
		// `?debug=1` armed it just now
		if (!wasOn) arm(false);
		try {
			startRecording(info, false);
		} catch (err) {
			originalConsole.error(PREFIX, 'failed to start', err);
		}
	} else {
		// flag expired or switched off since the last recording: drop what is left
		safeLocalStorage((storage) => {
			storage.removeItem(STORAGE.enabledBy);
			if (!storage.getItem(STORAGE.hasData)) return;
			storage.removeItem(STORAGE.hasData);
			storage.removeItem(STORAGE.owner);
			deleteDatabase(STORAGE.db);
		});
	}
	return api;
}
