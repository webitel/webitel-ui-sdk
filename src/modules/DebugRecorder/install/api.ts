// the public entry: installDebugRecorder() and window.webitelDebug
import { onBeforeLogout, onSessionUser } from '../../../scripts/sessionHooks';
import { originalConsole } from '../collectors/console';
import {
	appSlug,
	enabledUntil,
	RETENTION_MS,
	resolveEnabled,
	STORAGE,
} from '../config';
import type { RecorderApp, RecorderStats } from '../types';
import { arm } from './ownership';
import {
	download,
	showArchive,
	startRecording,
	stats,
	stopHere,
	wipeDebugRecorder,
} from './recording';
import { PREFIX, RUNTIME_KEY, runtimeHolder, state } from './state';
import {
	deleteDatabase,
	hasArchive,
	readItem,
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
	/** when recording stops by itself, or null if recording is off */
	readonly enabledUntil: number | null;
	/** recording stopped by itself and its archive is still here to download */
	readonly archived: boolean;
	/** turns recording on for 1 h in every app of this origin and starts it in this tab right away; an earlier archive is deleted */
	enable(): Promise<void>;
	/** stops recording everywhere and deletes everything recorded, the archive too */
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
 * settings toggle) turns it on for 1 h in every webitel app of this origin;
 * all of them write into one store, so one archive shows the whole path.
 * When the hour is up (or on `?debug=0`) recording stops and the records stay
 * as an archive to download, for up to RETENTION_MS.
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
		get archived() {
			return state.sink === null && hasArchive();
		},
		async enable() {
			const wasOn = enabledUntil() !== null;
			// a tab still recording past the expiry, or showing an archive: the store is about to be emptied, start over
			if (!wasOn && (state.sink || state.hideIndicator)) await stopHere();
			arm(wasOn);
			if (!state.sink) startRecording(info, true);
		},
		async disable() {
			await wipeDebugRecorder();
			originalConsole.info(PREFIX, 'stopped, recorded data deleted');
		},
		download,
		stats,
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
		// another tab stopped recording: time ran out (the records stay) or switched off (they go)
		if (event.key === STORAGE.enabled && event.newValue === null) {
			// a wipe removes `has-data` in the same step as the flag
			const keep = readItem(STORAGE.hasData) !== null;
			void stopHere({
				keepData: keep,
			}).then(() => keep && showArchive());
		}
		// another tab deleted everything: the archive chip goes too
		if (event.key === STORAGE.hasData && event.newValue === null) {
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
	// read before resolveEnabled() drops an expired flag: when the last recording ended
	const flagAt = Number(readItem(STORAGE.enabled)) || null;
	if (resolveEnabled()) {
		// `?debug=1` armed it just now
		if (!wasOn) arm(false);
		try {
			startRecording(info, false);
		} catch (err) {
			originalConsole.error(PREFIX, 'failed to start', err);
		}
	} else {
		// the last recording ended while no tab was open (time ran out, `?debug=0`): keep its archive for a while
		const now = Date.now();
		let keep = false;
		safeLocalStorage((storage) => {
			if (!storage.getItem(STORAGE.hasData)) {
				storage.removeItem(STORAGE.enabledBy);
				storage.removeItem(STORAGE.endedAt);
				return;
			}
			const endedAt =
				Number(storage.getItem(STORAGE.endedAt)) ||
				(flagAt ? Math.min(flagAt, now) : null);
			keep = endedAt !== null && now - endedAt < RETENTION_MS;
			if (keep) {
				storage.setItem(STORAGE.endedAt, String(endedAt));
				return;
			}
			// switched off without a wipe finishing, or the archive is too old: drop what is left
			storage.removeItem(STORAGE.enabledBy);
			storage.removeItem(STORAGE.endedAt);
			storage.removeItem(STORAGE.hasData);
			storage.removeItem(STORAGE.owner);
			deleteDatabase(STORAGE.db);
		});
		if (keep) showArchive();
	}
	return api;
}
