export type RecorderChannel =
	| 'console'
	| 'error'
	| 'http'
	| 'ws'
	| 'sip'
	| 'webrtc'
	| 'device'
	| 'env'
	| 'lifecycle'
	| 'perf'
	| 'recorder';

export interface RecorderEvent {
	/** epoch ms */
	t: number;
	/** page-load session id: a new one after every F5 */
	sid: string;
	/** the app the page load belongs to, e.g. `admin` */
	app?: string;
	ch: RecorderChannel;
	type: string;
	data?: unknown;
}

/** what is stored in IndexedDB: the event is serialized once, on the main thread */
export interface StoredRecord {
	t: number;
	ch: RecorderChannel;
	sid: string;
	/** absent on records written before the store was shared between apps */
	app?: string;
	type: string;
	/** length of `json`, used for volume stats */
	n: number;
	json: string;
}

export type RecordFn = (
	ch: RecorderChannel,
	type: string,
	data?: unknown,
) => void;

export interface RecorderStats {
	records: number;
	chars: number;
	firstT: number | null;
	lastT: number | null;
	byChannel: Record<
		string,
		{
			count: number;
			chars: number;
		}
	>;
}

export type WorkerRequest =
	| {
			kind: 'init';
			sid: string;
			app: string;
			t: number;
			/** page loads that reached pagehide, read (and removed) from localStorage */
			cleanExitSids: string[];
	  }
	| {
			kind: 'events';
			events: StoredRecord[];
	  }
	| {
			kind: 'hb';
			t: number;
	  }
	| {
			kind: 'visibility';
			hidden: boolean;
	  }
	| {
			kind: 'dump' | 'clear' | 'stats';
			reqId: number;
	  };

/** sent by the worker once its module has loaded; request ids start at 1 */
export const WORKER_READY_ID = 0;

export interface WorkerResponse {
	reqId: number;
	result?: unknown;
	error?: string;
}

export type ChannelTally = RecorderStats['byChannel'];

/** one place for the per-channel count/size, used by the store stats and the archive */
export function tallyChannel(
	tally: ChannelTally,
	ch: string,
	chars: number,
): void {
	tally[ch] ??= {
		count: 0,
		chars: 0,
	};
	tally[ch].count += 1;
	tally[ch].chars += chars;
}

/** the app the recorder runs in, as shown in the archive */
export interface RecorderApp {
	/** short id, e.g. `workspace`; tags every record and names the archive */
	name: string;
	version?: string;
}
