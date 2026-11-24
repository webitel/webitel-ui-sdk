// main-thread side: serializes and batches events for the store
import {
	FLUSH_INTERVAL_MS,
	FLUSH_QUEUE_SIZE,
	HEARTBEAT_INTERVAL_MS,
	MAX_EVENT_CHARS,
	REQUEST_TIMEOUT_MS,
	STORAGE,
} from '../config';
import {
	type RecorderChannel,
	type RecorderStats,
	type StoredRecord,
	WORKER_READY_ID,
	type WorkerResponse,
} from '../types';
import { type Transport, workerWithFallback } from './transport';

// logout waits for destroy(): keep it short, the database is deleted afterwards anyway
export const DESTROY_CLEAR_TIMEOUT_MS = 2_000;

// main-thread side: serializes and batches events for the worker; only the unflushed batch can be lost
export class RecorderSink {
	readonly sid: string;
	private transport: Transport;
	private queue: StoredRecord[] = [];
	private flushTimer: ReturnType<typeof setTimeout> | null = null;
	private heartbeatTimer: ReturnType<typeof setInterval> | null = null;
	private reqId = WORKER_READY_ID;
	private stopped = false;
	private worker = true;
	private pending = new Map<
		number,
		{
			resolve: (v: unknown) => void;
			reject: (e: Error) => void;
			timer: ReturnType<typeof setTimeout>;
		}
	>();

	private readonly onVisibility = () =>
		this.transport.post({
			kind: 'visibility',
			hidden: document.visibilityState === 'hidden',
		});

	readonly app: string;

	constructor(app: string) {
		this.app = app;
		this.sid =
			typeof crypto.randomUUID === 'function'
				? crypto.randomUUID()
				: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
		this.transport = workerWithFallback(
			STORAGE.db,
			(res) => this.settle(res),
			() => {
				this.worker = false;
			},
		);
		const cleanExitSids: string[] = [];
		try {
			for (const key of Object.keys(localStorage)) {
				if (!key.startsWith(STORAGE.cleanExitPrefix)) continue;
				cleanExitSids.push(key.slice(STORAGE.cleanExitPrefix.length));
				localStorage.removeItem(key);
			}
		} catch {
			// storage blocked: earlier exits are reported as not clean
		}
		this.transport.post({
			kind: 'init',
			sid: this.sid,
			app,
			t: Date.now(),
			cleanExitSids,
		});
	}

	get usesWorker(): boolean {
		return this.worker;
	}

	private settle(res: WorkerResponse): void {
		const waiter = this.pending.get(res.reqId);
		if (!waiter) return;
		this.pending.delete(res.reqId);
		clearTimeout(waiter.timer);
		if (res.error) waiter.reject(new Error(res.error));
		else waiter.resolve(res.result);
	}

	record(ch: RecorderChannel, type: string, data?: unknown): void {
		if (this.stopped) return;
		const t = Date.now();
		let json: string;
		try {
			json = JSON.stringify({
				t,
				sid: this.sid,
				app: this.app,
				ch,
				type,
				data,
			});
		} catch (err) {
			json = JSON.stringify({
				t,
				sid: this.sid,
				app: this.app,
				ch,
				type,
				data: `[Unserializable: ${(err as Error)?.message}]`,
			});
		}
		if (json.length > MAX_EVENT_CHARS) {
			json = JSON.stringify({
				t,
				sid: this.sid,
				app: this.app,
				ch,
				type,
				data: {
					truncated: true,
					chars: json.length,
					preview: json.slice(0, 4_096),
				},
			});
		}
		this.queue.push({
			t,
			ch,
			sid: this.sid,
			app: this.app,
			type,
			n: json.length,
			json,
		});
		if (this.queue.length >= FLUSH_QUEUE_SIZE) this.flush();
		else this.flushTimer ??= setTimeout(() => this.flush(), FLUSH_INTERVAL_MS);
	}

	flush(): void {
		if (this.flushTimer) {
			clearTimeout(this.flushTimer);
			this.flushTimer = null;
		}
		if (!this.queue.length) return;
		const events = this.queue;
		this.queue = [];
		this.transport.post({
			kind: 'events',
			events,
		});
	}

	startHeartbeat(): void {
		this.heartbeatTimer = setInterval(
			() =>
				this.transport.post({
					kind: 'hb',
					t: Date.now(),
				}),
			HEARTBEAT_INTERVAL_MS,
		);
		document.addEventListener('visibilitychange', this.onVisibility);
	}

	// pagehide: the worker dies with the page, so the marker is written synchronously to localStorage
	markCleanExit(): void {
		if (this.stopped) return;
		this.flush();
		try {
			localStorage.setItem(`${STORAGE.cleanExitPrefix}${this.sid}`, '1');
		} catch {
			// storage blocked: the next page-load reports this exit as not clean
		}
	}

	// restored from bfcache: the page-load goes on, so its earlier pagehide was not an exit
	markResumed(): void {
		try {
			localStorage.removeItem(`${STORAGE.cleanExitPrefix}${this.sid}`);
		} catch {
			// storage blocked: nothing was written either
		}
	}

	// stops recording and terminates the worker; never rejects. Clears the store (time-bounded) unless `keepData`
	async destroy({ keepData = false } = {}): Promise<void> {
		if (keepData) {
			// the archive outlives the recording: the last batch goes in, and a reply proves the store has it
			try {
				await this.request('stats', DESTROY_CLEAR_TIMEOUT_MS);
			} catch {
				// the worker is gone: what it stored stays
			}
		}
		this.stopped = true;
		this.queue = [];
		if (this.flushTimer) clearTimeout(this.flushTimer);
		this.flushTimer = null;
		if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
		document.removeEventListener('visibilitychange', this.onVisibility);
		if (!keepData) {
			try {
				await this.request('clear', DESTROY_CLEAR_TIMEOUT_MS);
			} catch {
				// the caller deletes the whole database right after
			}
		}
		this.transport.terminate();
	}

	private request<T>(
		kind: 'dump' | 'clear' | 'stats',
		timeoutMs = REQUEST_TIMEOUT_MS,
	): Promise<T> {
		this.flush();
		const reqId = ++this.reqId;
		return new Promise<T>((resolve, reject) => {
			const timer = setTimeout(() => {
				this.pending.delete(reqId);
				reject(new Error(`debug recorder: "${kind}" timed out`));
			}, timeoutMs);
			this.pending.set(reqId, {
				resolve: resolve as (v: unknown) => void,
				reject,
				timer,
			});
			this.transport.post({
				kind,
				reqId,
			});
		});
	}

	dump(): Promise<StoredRecord[]> {
		return this.request('dump');
	}

	stats(): Promise<RecorderStats> {
		return this.request('stats');
	}

	/** empties the store but keeps recording */
	async clear(): Promise<void> {
		await this.request('clear');
	}
}
