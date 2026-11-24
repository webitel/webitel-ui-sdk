// how batches reach the store: a Dedicated Worker, or the same logic on the main thread when it cannot load
import {
	WORKER_READY_ID,
	type WorkerRequest,
	type WorkerResponse,
} from '../types';

export type Respond = (res: WorkerResponse) => void;

export type Transport = {
	post(msg: WorkerRequest): void;
	/** stops the worker / closes the inline DB connection, so the database can be deleted */
	terminate(): void;
};

export const WORKER_LOAD_TIMEOUT_MS = 10_000;

// no worker (CSP, failed chunk, old browser): same logic on the main thread, no freeze detection
export function inlineTransport(dbName: string, respond: Respond): Transport {
	const corePromise = Promise.all([
		import('../storage'),
		import('../recorder-core'),
	]).then(([{ openStorage }, { createRecorderCore }]) =>
		openStorage(dbName).then(createRecorderCore),
	);
	let queue: Promise<unknown> = Promise.resolve();
	return {
		post: (msg) => {
			queue = queue
				.then(async () => {
					const res = await (await corePromise).handle(msg);
					if (res) respond(res);
				})
				.catch((err) => {
					if ('reqId' in msg)
						respond({
							reqId: msg.reqId,
							error: String(err),
						});
				});
		},
		terminate: () => {
			corePromise.then((core) => core.close()).catch(() => {});
		},
	};
}

// a worker that fails to load only fires an async `error`, so messages are replayed to the inline transport until it is ready
export function workerWithFallback(
	dbName: string,
	respond: Respond,
	onFallback: () => void,
): Transport {
	let worker: Worker;
	try {
		worker = new Worker(new URL('../recorder.worker.ts', import.meta.url), {
			type: 'module',
			name: dbName,
		});
	} catch {
		onFallback();
		return inlineTransport(dbName, respond);
	}

	let ready = false;
	let inline: Transport | null = null;
	const replay: WorkerRequest[] = [];

	const fallBack = () => {
		if (ready || inline) return;
		clearTimeout(loadTimer);
		worker.terminate();
		inline = inlineTransport(dbName, respond);
		for (const msg of replay) inline.post(msg);
		replay.length = 0;
		onFallback();
	};
	const loadTimer = setTimeout(fallBack, WORKER_LOAD_TIMEOUT_MS);

	worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
		if (event.data.reqId === WORKER_READY_ID) {
			ready = true;
			clearTimeout(loadTimer);
			replay.length = 0;
			return;
		}
		respond(event.data);
	};
	worker.onerror = (event) => {
		if (ready) return;
		event.preventDefault();
		fallBack();
	};

	return {
		post: (msg) => {
			if (inline) return inline.post(msg);
			if (!ready) replay.push(msg);
			worker.postMessage(msg);
		},
		terminate: () => {
			clearTimeout(loadTimer);
			if (inline) inline.terminate();
			else worker.terminate();
		},
	};
}
