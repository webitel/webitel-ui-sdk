import { installConsoleCollector, originalConsole } from './collectors/console';
import { installDeviceCollector } from './collectors/devices';
import { collectEnvironment } from './collectors/environment';
import { installErrorCollector } from './collectors/errors';
import { installHttpCollector } from './collectors/http';
import { installLifecycleCollector } from './collectors/lifecycle';
import { installWebRtcCollector } from './collectors/webrtc';
import { installWebSocketCollector } from './collectors/websocket';
import {
	type RecorderNames,
	recorderNames,
	resolveEnabled,
	setEnabled,
	stripUrlFlag,
} from './config';
import { downloadArchive } from './export';
import { flash, showIndicator } from './indicator';
import { RecorderSink } from './sink';
import type { RecorderApp, RecorderStats, RecordFn } from './types';

const PREFIX = '[debug-recorder]';

export interface DebugRecorderOptions {
	/** short app id, e.g. `workspace`; names the archive and namespaces the storage */
	app: string;
	/** app version written into the archive */
	version?: string;
}

export interface WebitelDebugApi {
	readonly recording: boolean;
	/** turns recording on for 24 h, starting with the next page load */
	enable(): void;
	/** stops recording and deletes everything recorded */
	disable(): Promise<void>;
	download(): Promise<void>;
	stats(): Promise<RecorderStats | null>;
}

declare global {
	interface Window {
		webitelDebug?: WebitelDebugApi;
	}
}

let app: RecorderApp | null = null;
let names: RecorderNames | null = null;
let sink: RecorderSink | null = null;
let hideIndicator: (() => void) | null = null;

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

async function download(): Promise<void> {
	if (!sink || !app) {
		originalConsole.info(PREFIX, 'not recording, nothing to download');
		return;
	}
	const records = await sink.dump();
	await downloadArchive(records, sink.sid, app);
	originalConsole.info(PREFIX, `archive with ${records.length} records saved`);
}

/**
 * Stops recording and deletes this app's store. Call it on logout: workstations
 * are shared, and the next user must not get the previous user's records.
 * Never rejects and is time-bounded, so a logout cannot hang on it.
 */
export async function wipeDebugRecorder(): Promise<void> {
	if (!names) return;
	const current = names;
	let hadData = false;
	safeLocalStorage((s) => {
		hadData = s.getItem(current.hasData) !== null;
		setEnabled(current, false);
		s.removeItem(current.hasData);
		s.removeItem(current.cleanExit);
	});
	stripUrlFlag();
	hideIndicator?.();
	hideIndicator = null;
	const running = sink;
	sink = null;
	if (running) await running.destroy();
	if (running || hadData) deleteDatabase(current.db);
}

function startRecording(current: RecorderNames, info: RecorderApp): void {
	const s = new RecorderSink(current);
	sink = s;
	safeLocalStorage((storage) => storage.setItem(current.hasData, '1'));
	const record: RecordFn = (ch, type, data) => s.record(ch, type, data);

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
			() => collectEnvironment(record, info),
		],
		[
			'lifecycle',
			() =>
				installLifecycleCollector(record, {
					onExit: () => s.markCleanExit(),
					onResume: () => s.markResumed(),
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
	s.startHeartbeat();
	record('recorder', 'start', {
		worker: s.usesWorker,
		failedCollectors: failed,
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
	hideIndicator = showIndicator({
		download,
		stats: async () => (sink ? sink.stats() : null),
		stop: async () => {
			await wipeDebugRecorder();
			flash('Debug recording stopped, recorded data deleted.');
		},
	});
	originalConsole.info(
		PREFIX,
		'recording. Archive: REC badge menu, Ctrl+Alt+Shift+D or webitelDebug.download(). Stop and wipe: REC badge menu or webitelDebug.disable()',
	);
}

/**
 * Opt-in debug recorder: `?debug=1` turns it on for 24 h, `?debug=0` off.
 * Call it before anything opens a WebSocket or RTCPeerConnection — in practice
 * from a file imported first in `main.ts` — so the SDK and JsSIP get the wrapped APIs.
 * Off by default: then it only defines `window.webitelDebug` and cleans up leftovers.
 */
export function installDebugRecorder(
	options: DebugRecorderOptions,
): WebitelDebugApi {
	if (window.webitelDebug && app) return window.webitelDebug;
	app = {
		name: options.app,
		version: options.version,
	};
	const info = app;
	const current = recorderNames(options.app);
	names = current;

	const api: WebitelDebugApi = {
		get recording() {
			return sink !== null;
		},
		enable() {
			setEnabled(current, true);
			originalConsole.info(
				PREFIX,
				'enabled, reload the page to start recording',
			);
		},
		async disable() {
			await wipeDebugRecorder();
			originalConsole.info(PREFIX, 'stopped, recorded data deleted');
		},
		download,
		stats: async () => (sink ? sink.stats() : null),
	};
	window.webitelDebug = api;

	if (resolveEnabled(current)) {
		try {
			startRecording(current, info);
		} catch (err) {
			originalConsole.error(PREFIX, 'failed to start', err);
		}
	} else {
		// flag expired or switched off since the last recording: drop what is left
		safeLocalStorage((storage) => {
			if (!storage.getItem(current.hasData)) return;
			storage.removeItem(current.hasData);
			deleteDatabase(current.db);
		});
	}
	return api;
}
