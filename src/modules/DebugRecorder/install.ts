import {
	getSessionUser,
	onBeforeLogout,
	onSessionUser,
} from '../../scripts/sessionHooks';
import { installConsoleCollector, originalConsole } from './collectors/console';
import { installDeviceCollector, snapshotDevices } from './collectors/devices';
import { collectEnvironment, watchConnection } from './collectors/environment';
import { installErrorCollector } from './collectors/errors';
import { installHttpCollector } from './collectors/http';
import { installLifecycleCollector } from './collectors/lifecycle';
import { installWebRtcCollector } from './collectors/webrtc';
import { installWebSocketCollector } from './collectors/websocket';
import {
	appSlug,
	ENABLED_TTL_MS,
	enabledUntil,
	LEGACY_PREFIX,
	resolveEnabled,
	STORAGE,
	setEnabled,
	stripUrlFlag,
} from './config';
import { downloadArchive } from './export';
import { flash, showIndicator } from './indicator';
import { RecorderSink } from './sink';
import { t } from './texts';
import type { RecorderApp, RecorderStats, RecordFn } from './types';

const PREFIX = '[debug-recorder]';

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
	enable(): void;
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

interface Owner {
	id: string;
	/** last time this user was seen signed in */
	at: number;
}

let app: RecorderApp | null = null;
let sink: RecorderSink | null = null;
let hideIndicator: (() => void) | null = null;
let collectorsFailed: string[] | null = null;

// collectors wrap globals once per page and write to whichever sink is current
const recordToSink: RecordFn = (ch, type, data) => sink?.record(ch, type, data);

function safeLocalStorage(action: (storage: Storage) => void): void {
	try {
		action(localStorage);
	} catch {
		// storage blocked: nothing to persist or clean
	}
}

function deleteDatabase(name: string): void {
	try {
		indexedDB.deleteDatabase(name);
	} catch {
		// IndexedDB unavailable: nothing was stored either
	}
}

// earlier, unreleased versions: the Workspace spike and the per-app stores
function removeLegacyStores(): void {
	safeLocalStorage((s) => {
		for (const key of Object.keys(s)) {
			if (key.startsWith(LEGACY_PREFIX)) s.removeItem(key);
		}
	});
	try {
		if (typeof indexedDB.databases !== 'function') {
			deleteDatabase(LEGACY_PREFIX);
			return;
		}
		indexedDB
			.databases()
			.then((dbs) => {
				for (const { name } of dbs) {
					if (name?.startsWith(LEGACY_PREFIX)) deleteDatabase(name);
				}
			})
			.catch(() => {});
	} catch {
		// IndexedDB unavailable
	}
}

function readItem(key: string): string | null {
	try {
		return localStorage.getItem(key);
	} catch {
		return null;
	}
}

function readOwner(): Owner | null {
	try {
		const raw = localStorage.getItem(STORAGE.owner);
		const owner = raw ? (JSON.parse(raw) as Owner) : null;
		return owner && typeof owner.id === 'string' ? owner : null;
	} catch {
		return null;
	}
}

function writeOwner(id: string): void {
	safeLocalStorage((s) =>
		s.setItem(
			STORAGE.owner,
			JSON.stringify({
				id,
				at: Date.now(),
			} satisfies Owner),
		),
	);
}

// records left from an earlier recording period, while nothing is recording
function clearStoredData(): void {
	safeLocalStorage((s) => {
		for (const key of Object.keys(s)) {
			if (key.startsWith(STORAGE.cleanExitPrefix)) s.removeItem(key);
		}
		s.removeItem(STORAGE.hasData);
		s.removeItem(STORAGE.owner);
	});
	deleteDatabase(STORAGE.db);
}

/** switches recording on; a fresh start (it was off) begins with an empty store owned by the signed-in user */
function arm(wasOn: boolean): void {
	if (!wasOn) clearStoredData();
	const user = getSessionUser();
	safeLocalStorage((s) => {
		setEnabled(true);
		if (!wasOn) s.setItem(STORAGE.enabledBy, user ?? '');
	});
	if (!wasOn && user !== null) writeOwner(user);
}

// records bound to a user are readable only by that user: not before sign-in, not by another one
function canRead(): boolean {
	const owner = readOwner();
	return !owner || getSessionUser() === owner.id;
}

async function download(): Promise<void> {
	if (!sink || !app) {
		originalConsole.info(PREFIX, 'not recording, nothing to download');
		return;
	}
	if (!canRead()) {
		originalConsole.info(
			PREFIX,
			'sign in as the user who recorded this to download it',
		);
		flash(t('signInToDownload'));
		return;
	}
	const records = await sink.dump();
	await downloadArchive(records, sink.sid, app);
	originalConsole.info(PREFIX, `archive with ${records.length} records saved`);
}

// this tab only: another tab already removed the flag and is deleting the store
async function stopHere(): Promise<void> {
	hideIndicator?.();
	hideIndicator = null;
	const running = sink;
	sink = null;
	if (running) await running.destroy();
}

/**
 * Stops recording in every app of this origin and deletes everything recorded.
 * Runs by itself on logout (Userinfo store); call it only from a logout that
 * bypasses the store. Never rejects and is time-bounded.
 */
export async function wipeDebugRecorder(): Promise<void> {
	let hadData = false;
	safeLocalStorage((s) => {
		hadData = s.getItem(STORAGE.hasData) !== null;
		setEnabled(false);
		for (const key of Object.keys(s)) {
			if (key.startsWith(STORAGE.cleanExitPrefix)) s.removeItem(key);
		}
		s.removeItem(STORAGE.hasData);
		s.removeItem(STORAGE.owner);
		s.removeItem(STORAGE.enabledBy);
	});
	stripUrlFlag();
	const running = sink;
	await stopHere();
	if (running || hadData) deleteDatabase(STORAGE.db);
}

// records belong to one user: another user signing in on this browser must not get them
async function onSessionUserChanged(userId: string): Promise<void> {
	const owner = readOwner();
	const enabledBy = readItem(STORAGE.enabledBy);
	// nobody signed in while it recorded, but another user switched it on: still theirs
	if (!owner && enabledBy && enabledBy !== userId) {
		await wipeDebugRecorder();
		originalConsole.info(
			PREFIX,
			"another user signed in: the previous user's debug records were deleted",
		);
		return;
	}
	if (owner && owner.id !== userId) {
		const until = enabledUntil();
		// switched on by the new user, or before sign-in after the previous user was last seen: keep recording
		const armedForNewUser =
			until !== null &&
			(enabledBy === userId ||
				(!enabledBy && until - ENABLED_TTL_MS > owner.at));
		if (armedForNewUser) {
			if (sink) await sink.clear();
			else deleteDatabase(STORAGE.db);
			writeOwner(userId);
		} else {
			await wipeDebugRecorder();
		}
		originalConsole.info(
			PREFIX,
			"another user signed in: the previous user's debug records were deleted",
		);
		return;
	}
	let hasData = false;
	safeLocalStorage((s) => {
		hasData = s.getItem(STORAGE.hasData) !== null;
	});
	if (sink || hasData) writeOwner(userId);
}

function installCollectors(): string[] {
	const record = recordToSink;
	const steps: [
		string,
		() => void,
	][] = [
		[
			'console',
			() => installConsoleCollector(record),
		],
		[
			'errors',
			() => installErrorCollector(record, window),
		],
		[
			'http',
			() => installHttpCollector(record, window),
		],
		[
			'websocket',
			() => installWebSocketCollector(record, window),
		],
		[
			'webrtc',
			() => installWebRtcCollector(record, window),
		],
		[
			'devices',
			() => installDeviceCollector(record),
		],
		[
			'environment',
			() => watchConnection(record),
		],
		[
			'lifecycle',
			() =>
				installLifecycleCollector(record, {
					onExit: () => sink?.markCleanExit(),
					onResume: () => sink?.markResumed(),
				}),
		],
	];
	const failed: string[] = [];
	for (const [name, install] of steps) {
		try {
			install();
		} catch (err) {
			failed.push(name);
			originalConsole.warn(PREFIX, `collector "${name}" failed`, err);
		}
	}
	return failed;
}

function startRecording(info: RecorderApp, midSession: boolean): void {
	const s = new RecorderSink(info.name);
	sink = s;
	safeLocalStorage((storage) => storage.setItem(STORAGE.hasData, '1'));
	const record = recordToSink;
	const firstStart = collectorsFailed === null;
	collectorsFailed ??= installCollectors();
	const failed = collectorsFailed;
	try {
		collectEnvironment(record, info);
		// the device collector takes its own snapshot when it installs
		if (!firstStart) void snapshotDevices(record, 'start');
	} catch (err) {
		originalConsole.warn(PREFIX, 'environment snapshot failed', err);
	}
	s.startHeartbeat();
	record('recorder', 'start', {
		worker: s.usesWorker,
		failedCollectors: failed,
		midSession: midSession || undefined,
	});

	hideIndicator = showIndicator({
		download,
		stats: async () => (sink && canRead() ? sink.stats() : null),
		stop: async () => {
			await wipeDebugRecorder();
			flash(t('stopped'));
		},
	});
	originalConsole.info(
		PREFIX,
		midSession
			? 'recording from now on; connections opened before are not covered, reload to include them'
			: 'recording. Archive: REC badge menu, Ctrl+Alt+Shift+D or webitelDebug.download(). Stop and wipe: REC badge menu or webitelDebug.disable()',
	);
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
	if (window.webitelDebug && app) return window.webitelDebug;
	const info: RecorderApp = {
		name: appSlug(options.app),
		version: options.version,
	};
	app = info;

	const api: WebitelDebugApi = {
		get recording() {
			return sink !== null;
		},
		get enabledUntil() {
			return enabledUntil();
		},
		enable() {
			arm(enabledUntil() !== null);
			if (!sink) startRecording(info, true);
		},
		async disable() {
			await wipeDebugRecorder();
			originalConsole.info(PREFIX, 'stopped, recorded data deleted');
		},
		download,
		stats: async () => (sink && canRead() ? sink.stats() : null),
	};
	window.webitelDebug = api;
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
