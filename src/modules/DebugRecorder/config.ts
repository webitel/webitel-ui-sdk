export const RECORDER_VERSION = '1.0.0';

/** recording switches itself off after this, so a forgotten flag does not record for days */
export const ENABLED_TTL_MS = 24 * 60 * 60 * 1000;
/** records older than this are dropped when the store opens */
export const RETENTION_MS = 48 * 60 * 60 * 1000;
/** `?debug=1` turns the recorder on, `?debug=0` turns it off */
export const URL_PARAM = 'debug';

export const DB_VERSION = 1;

/**
 * Storage names of one app. All webitel apps share an origin, so each keeps its
 * own flag and database: `?debug=1` in one app neither records nor wipes another.
 */
export interface RecorderNames {
	app: string;
	/** IndexedDB database */
	db: string;
	/** localStorage: keeps the recorder on across reloads; holds the expiry time */
	enabled: string;
	/** localStorage: set while the store may hold records, so a disabled start knows to wipe it */
	hasData: string;
	/** localStorage: sid of the last page-load that reached pagehide; written synchronously on exit */
	cleanExit: string;
}

export function recorderNames(app: string): RecorderNames {
	const slug =
		app
			.toLowerCase()
			.replace(/[^a-z0-9-]+/g, '-')
			.replace(/^-+|-+$/g, '') || 'app';
	const base = `wt-debug-recorder:${slug}`;
	return {
		app: slug,
		db: base,
		enabled: base,
		hasData: `${base}:has-data`,
		cleanExit: `${base}:clean-exit`,
	};
}

/** ring buffer size: the oldest records are dropped above this */
export const MAX_RECORDS = 100_000;
export const EVICTION_BATCH = 5_000;

/** a single string inside an event is cut above this */
export const MAX_TEXT_CHARS = 16_384;
/** a whole serialized event is replaced by a preview above this */
export const MAX_EVENT_CHARS = 65_536;

export const FLUSH_INTERVAL_MS = 250;
export const FLUSH_QUEUE_SIZE = 200;

/** dump/clear/stats give up after this, so a dead worker cannot hang logout or download */
export const REQUEST_TIMEOUT_MS = 30_000;

export const HEARTBEAT_INTERVAL_MS = 1_000;
export const STALL_THRESHOLD_MS = 3_000;

export const WEBRTC_STATS_INTERVAL_MS = 5_000;
export const LONG_FRAME_THRESHOLD_MS = 200;

function readUrlFlag(): string | null {
	const fromSearch = new URLSearchParams(window.location.search).get(URL_PARAM);
	if (fromSearch !== null) return fromSearch;
	const hashQuery = window.location.hash.split('?')[1];
	return hashQuery ? new URLSearchParams(hashQuery).get(URL_PARAM) : null;
}

// after a stop, so F5 on a ?debug=1 URL does not start recording again
export function stripUrlFlag(): void {
	try {
		const url = new URL(window.location.href);
		url.searchParams.delete(URL_PARAM);
		const [path, hashQuery] = url.hash.split('?');
		if (hashQuery !== undefined) {
			const params = new URLSearchParams(hashQuery);
			params.delete(URL_PARAM);
			const rest = params.toString();
			url.hash = rest ? `${path}?${rest}` : path;
		}
		if (url.href !== window.location.href) {
			history.replaceState(history.state, '', url.href);
		}
	} catch {
		// URL left as is: worst case F5 records again, with the REC badge on
	}
}

export function setEnabled(
	names: RecorderNames,
	enabled: boolean,
	now = Date.now(),
): void {
	if (enabled) {
		localStorage.setItem(names.enabled, String(now + ENABLED_TTL_MS));
	} else {
		localStorage.removeItem(names.enabled);
	}
}

/**
 * Reads the URL flag (persisting it) and falls back to the stored one.
 * The URL flag is honoured without login on purpose: the recorder must work
 * when login itself is what fails. The TTL, the REC indicator and wiping on
 * logout/disable limit what a forgotten flag can collect.
 */
export function resolveEnabled(
	names: RecorderNames,
	now = Date.now(),
): boolean {
	try {
		const urlFlag = readUrlFlag();
		if (urlFlag === '1' || urlFlag === 'true') setEnabled(names, true, now);
		else if (urlFlag === '0' || urlFlag === 'false') setEnabled(names, false);

		const expiresAt = Number(localStorage.getItem(names.enabled));
		if (expiresAt > now) return true;
		setEnabled(names, false);
		return false;
	} catch {
		return false;
	}
}
