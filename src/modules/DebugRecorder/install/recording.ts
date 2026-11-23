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
import type { RecorderApp } from '../types';
import { canRead } from './ownership';
import {
	PREFIX,
	RUNTIME_KEY,
	recordToSink,
	runtimeHolder,
	state,
} from './state';
import { deleteDatabase, safeLocalStorage } from './storage-flags';

export async function download(): Promise<void> {
	if (!state.sink || !state.app) {
		originalConsole.info(PREFIX, 'not recording, nothing to download');
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
	const records = await state.sink.dump();
	await downloadArchive(records, state.sink.sid, state.app);
	originalConsole.info(PREFIX, `archive with ${records.length} records saved`);
}

// this tab only: another tab already removed the flag and is deleting the store
export async function stopHere(): Promise<void> {
	if (state.expiryTimer) clearInterval(state.expiryTimer);
	state.expiryTimer = null;
	state.hideIndicator?.();
	state.hideIndicator = null;
	const running = state.sink;
	state.sink = null;
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
	const running = state.sink;
	await (runtimeHolder[RUNTIME_KEY]?.stop ?? stopHere)();
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
	// the flag is checked at load; a tab kept open for days must notice it expired
	state.expiryTimer ??= setInterval(() => {
		if (state.sink && enabledUntil() === null) {
			originalConsole.info(PREFIX, 'recording expired, recorded data deleted');
			void wipeDebugRecorder();
		}
	}, EXPIRY_CHECK_MS);
	record('recorder', 'start', {
		worker: s.usesWorker,
		failedCollectors: failed,
		midSession: midSession || undefined,
	});

	state.hideIndicator = showIndicator({
		download,
		stats: async () => (state.sink && canRead() ? state.sink.stats() : null),
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
