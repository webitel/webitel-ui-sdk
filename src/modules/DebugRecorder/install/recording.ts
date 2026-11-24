// starting, stopping and wiping the recording in this tab
import {
	installConsoleCollector,
	originalConsole,
} from '../collectors/console';
import { installDeviceCollector, snapshotDevices } from '../collectors/devices';
import { collectEnvironment, watchConnection } from '../collectors/environment';
import { installErrorCollector } from '../collectors/errors';
import { installHttpCollector } from '../collectors/http';
import { installLifecycleCollector } from '../collectors/lifecycle';
import { installWebRtcCollector } from '../collectors/webrtc';
import { installWebSocketCollector } from '../collectors/websocket';
import {
	EXPIRY_CHECK_MS,
	enabledUntil,
	STORAGE,
	setEnabled,
	stripUrlFlag,
} from '../config';
import { downloadArchive } from '../export';
import { flash, showIndicator } from '../indicator';
import { RecorderSink } from '../sink';
import type { RecorderApp, RecorderStats } from '../types';
import { canRead } from './ownership';
import {
	PREFIX,
	RUNTIME_KEY,
	recordToSink,
	runtimeHolder,
	state,
} from './state';
import {
	deleteDatabase,
	hasArchive,
	readArchive,
	safeLocalStorage,
} from './storage-flags';

/** what the archive holds: the live recording's store, or the stopped recording's */
export async function stats(): Promise<RecorderStats | null> {
	if (!canRead()) return null;
	if (state.sink) return state.sink.stats();
	if (hasArchive()) return readArchive((storage) => storage.stats());
	return null;
}

export async function download(): Promise<void> {
	const archived = !state.sink && hasArchive();
	if ((!state.sink && !archived) || !state.app) {
		originalConsole.info(PREFIX, 'nothing recorded, nothing to download');
		return;
	}
	if (!canRead()) {
		originalConsole.info(
			PREFIX,
			'sign in as the user who recorded this to download it',
		);
		flash('signInToDownload');
		return;
	}
	const records = state.sink
		? await state.sink.dump()
		: await readArchive((storage) => storage.readAll());
	await downloadArchive(records, state.sink?.sid ?? null, state.app);
	originalConsole.info(PREFIX, `archive with ${records.length} records saved`);
}

// this tab only: another tab already removed the flag and is deleting the store, or (`keepData`) keeps it as an archive
export async function stopHere({ keepData = false } = {}): Promise<void> {
	if (state.expiryTimer) clearInterval(state.expiryTimer);
	state.expiryTimer = null;
	state.hideIndicator?.();
	state.hideIndicator = null;
	state.showsArchive = false;
	const running = state.sink;
	state.sink = null;
	if (running) {
		if (keepData)
			running.record('recorder', 'end', {
				reason: 'expired',
			});
		await running.destroy({
			keepData,
		});
	}
}

/** the grey chip of a stopped recording: download its archive or delete it */
export function showArchive(): void {
	if (state.showsArchive || state.sink || !hasArchive()) return;
	state.hideIndicator?.();
	state.showsArchive = true;
	state.hideIndicator = showIndicator({
		mode: 'archive',
		download,
		stats,
		stop: async () => {
			await wipeDebugRecorder();
			flash('deleted');
		},
	});
}

/**
 * Time is up: recording stops in every app of this origin, the records stay as
 * an archive (deleted on logout, by another user, by hand, or after RETENTION_MS).
 */
export async function finishRecording(): Promise<void> {
	safeLocalStorage((s) => {
		if (s.getItem(STORAGE.hasData) && !s.getItem(STORAGE.endedAt)) {
			s.setItem(STORAGE.endedAt, String(Date.now()));
		}
		// other tabs see the flag go and stop too, keeping the data
		setEnabled(false);
	});
	await stopHere({
		keepData: true,
	});
	originalConsole.info(
		PREFIX,
		'recording time is up: stopped; the archive stays until downloaded and deleted',
	);
	showArchive();
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
		s.removeItem(STORAGE.endedAt);
	});
	stripUrlFlag();
	const running = state.sink;
	await (runtimeHolder[RUNTIME_KEY]?.stop ?? stopHere)();
	// the archive chip of this copy, when another copy did the stopping
	if (state.hideIndicator) await stopHere();
	if (running || hadData) deleteDatabase(STORAGE.db);
}

export function installCollectors(): string[] {
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
					onExit: () => state.sink?.markCleanExit(),
					onResume: () => state.sink?.markResumed(),
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

export function startRecording(info: RecorderApp, midSession: boolean): void {
	const s = new RecorderSink(info.name);
	state.sink = s;
	safeLocalStorage((storage) => storage.setItem(STORAGE.hasData, '1'));
	const record = recordToSink;
	const firstStart = state.collectorsFailed === null;
	state.collectorsFailed ??= installCollectors();
	const failed = state.collectorsFailed;
	try {
		collectEnvironment(record, info);
		// the device collector takes its own snapshot when it installs
		if (!firstStart) void snapshotDevices(record, 'start');
	} catch (err) {
		originalConsole.warn(PREFIX, 'environment snapshot failed', err);
	}
	s.startHeartbeat();
	// the flag is checked at load; a tab kept open must notice the time ran out
	state.expiryTimer ??= setInterval(() => {
		if (state.sink && enabledUntil() === null) void finishRecording();
	}, EXPIRY_CHECK_MS);
	record('recorder', 'start', {
		worker: s.usesWorker,
		failedCollectors: failed,
		midSession: midSession || undefined,
	});

	// the grey chip of an earlier archive gives way to the live one
	state.hideIndicator?.();
	state.showsArchive = false;
	state.hideIndicator = showIndicator({
		mode: 'recording',
		download,
		stats,
		stop: async () => {
			await wipeDebugRecorder();
			flash('stopped');
		},
	});
	originalConsole.info(
		PREFIX,
		midSession
			? 'recording from now on; connections opened before are not covered, reload to include them'
			: 'recording. Archive: REC badge menu, Ctrl+Alt+Shift+D or webitelDebug.download(). Stop and wipe: REC badge menu or webitelDebug.disable()',
	);
}
