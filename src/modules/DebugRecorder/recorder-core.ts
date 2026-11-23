import {
	SESSION_STALE_HIDDEN_MS,
	SESSION_STALE_MS,
	STALL_THRESHOLD_MS,
} from './config';
import type { RecorderStorage } from './storage';
import type { StoredRecord, WorkerRequest, WorkerResponse } from './types';

interface SessionMeta {
	app?: string;
	startedAt?: number;
	lastHeartbeat?: number;
	stallSince?: number | null;
	hidden?: boolean;
}

// one entry per page load: several tabs and apps write into the same store at once
const SESSION_PREFIX = 'session:';
const sessionKey = (sid: string) => `${SESSION_PREFIX}${sid}`;

// storage-side logic shared by the worker and the inline fallback
export function createRecorderCore(storage: RecorderStorage) {
	let sid = '';
	let app = '';
	let startedAt = 0;
	let lastHbAt = 0;
	let lastHbPersistedAt = 0;
	let hidden = false;
	let stallSince: number | null = null;

	const internal = (type: string, data: unknown): StoredRecord => {
		const t = Date.now();
		const json = JSON.stringify({
			t,
			sid,
			app,
			ch: 'recorder',
			type,
			data,
		});
		return {
			t,
			ch: 'recorder',
			sid,
			app,
			type,
			n: json.length,
			json,
		};
	};

	const saveSession = () =>
		storage.setMeta(sessionKey(sid), {
			app,
			startedAt,
			lastHeartbeat: lastHbAt || undefined,
			stallSince,
			hidden,
		} satisfies SessionMeta);

	// page loads that ended since anyone last looked: closed (marker) or dead (no heartbeat for too long)
	const reportEndedSessions = async (now: number, cleanExitSids: string[]) => {
		const clean = new Set(cleanExitSids);
		const records: StoredRecord[] = [];
		for (const [key, meta] of await storage.listMeta<SessionMeta>(
			SESSION_PREFIX,
		)) {
			const otherSid = key.slice(SESSION_PREFIX.length);
			if (otherSid === sid) continue;
			const lastSeen = meta?.lastHeartbeat ?? meta?.startedAt ?? 0;
			const staleAfter = meta?.hidden
				? SESSION_STALE_HIDDEN_MS
				: SESSION_STALE_MS;
			const cleanExit = clean.has(otherSid);
			// still alive in another tab
			if (!cleanExit && now - lastSeen < staleAfter) continue;
			// another tab may be reporting the same one right now
			const taken = await storage.takeMeta<SessionMeta>(key);
			if (!taken) continue;
			records.push(
				internal('previous-session', {
					sid: otherSid,
					app: taken.app,
					lastHeartbeat: taken.lastHeartbeat,
					// set only if the page was still frozen when it died
					stallSince: taken.stallSince ?? null,
					cleanExit,
				}),
			);
		}
		await storage.append(records);
	};

	// runs on the storage side, so it fires while the main thread is frozen
	const checkStall = async () => {
		if (!sid || !lastHbAt || hidden || stallSince !== null) return;
		const gap = Date.now() - lastHbAt;
		if (gap < STALL_THRESHOLD_MS) return;
		stallSince = lastHbAt;
		await saveSession();
		await storage.append([
			internal('main-thread-stall-start', {
				lastHeartbeat: lastHbAt,
				gapMs: gap,
			}),
		]);
	};

	const handle = async (
		msg: WorkerRequest,
	): Promise<WorkerResponse | undefined> => {
		switch (msg.kind) {
			case 'init': {
				sid = msg.sid;
				app = msg.app;
				startedAt = msg.t;
				await saveSession();
				await reportEndedSessions(msg.t, msg.cleanExitSids);
				return undefined;
			}
			case 'events':
				await storage.append(msg.events);
				return undefined;
			case 'hb': {
				lastHbAt = Date.now();
				if (stallSince !== null) {
					const durationMs = msg.t - stallSince;
					stallSince = null;
					await storage.append([
						internal('main-thread-stall-end', {
							durationMs,
						}),
					]);
					await saveSession();
					lastHbPersistedAt = lastHbAt;
				} else if (lastHbAt - lastHbPersistedAt > 5_000) {
					lastHbPersistedAt = lastHbAt;
					await saveSession();
				}
				return undefined;
			}
			case 'visibility':
				// background tabs throttle timers, a missing heartbeat there is not a freeze
				hidden = msg.hidden;
				lastHbAt = Date.now();
				await saveSession();
				return undefined;
			case 'dump':
				return {
					reqId: msg.reqId,
					result: await storage.readAll(),
				};
			case 'clear':
				await storage.clear();
				// this page load goes on recording: keep it known to the others
				await saveSession();
				return {
					reqId: msg.reqId,
				};
			case 'stats':
				return {
					reqId: msg.reqId,
					result: await storage.stats(),
				};
		}
	};

	return {
		handle,
		checkStall,
		close: () => storage.close(),
	};
}
