export const RECORDER_VERSION = '1.0.0';

/** recording stops by itself after this; what it recorded stays as an archive until deleted or RETENTION_MS */
export const ENABLED_TTL_MS = 60 * 60 * 1000;
/** how often an open, recording tab checks whether the flag has expired */
export const EXPIRY_CHECK_MS = 60_000;
/** records older than this are dropped when the store opens; a stopped recording's archive is kept as long */
export const RETENTION_MS = 48 * 60 * 60 * 1000;
/** `?debug=1` turns the recorder on, `?debug=0` turns it off */
export const URL_PARAM = 'debug';

export const DB_VERSION = 1;

/**
 * One store for every webitel app of an origin, so a single archive shows the
 * whole path (auth -> admin -> flow diagram). Records carry the app they came from.
 */
export const STORAGE = {
	/** IndexedDB database */
	db: 'wt-debug',
	/** localStorage: keeps the recorder on across reloads; holds the expiry time */
	enabled: 'wt-debug:enabled',
	/** localStorage: set while the store may hold records, so a disabled start knows to wipe it */
	hasData: 'wt-debug:has-data',
	/** localStorage: `{ id, at }` of the user the records belong to */
	owner: 'wt-debug:owner',
	/** localStorage: id of the user who switched recording on; empty when switched on before sign-in */
	enabledBy: 'wt-debug:enabled-by',
	/** localStorage: when recording stopped by itself (time ran out, `?debug=0`); its records stay as an archive */
	endedAt: 'wt-debug:ended-at',
	/** localStorage: `<prefix><sid>` is written synchronously on pagehide of that page load */
	cleanExitPrefix: 'wt-debug:clean-exit:',
} as const;

/** names of earlier, unreleased versions (per-app namespacing and the Workspace spike) */
export const LEGACY_PREFIX = 'wt-debug-recorder';

/** a page load without a clean exit counts as dead after this long without a heartbeat */
export const SESSION_STALE_MS = 15_000;
/** background tabs get timers once a minute, so they get more slack */
export const SESSION_STALE_HIDDEN_MS = 3 * 60_000;

export function appSlug(app: string): string {
	return (
		app
			.toLowerCase()
			.replace(/[^a-z0-9-]+/g, '-')
			.replace(/^-+|-+$/g, '') || 'app'
	);
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

export function setEnabled(enabled: boolean, now = Date.now()): void {
	if (enabled) {
		localStorage.setItem(STORAGE.enabled, String(now + ENABLED_TTL_MS));
	} else {
		localStorage.removeItem(STORAGE.enabled);
	}
}

/** expiry time of the flag, or null when recording is off */
export function enabledUntil(now = Date.now()): number | null {
	try {
		const expiresAt = Number(localStorage.getItem(STORAGE.enabled));
		return expiresAt > now ? expiresAt : null;
	} catch {
		return null;
	}
}

/**
 * Reads the URL flag (persisting it) and falls back to the stored one.
 * The URL flag is honoured without login on purpose: the recorder must work
 * when login itself is what fails. The TTL, the REC indicator and wiping on
 * logout/disable limit what a forgotten flag can collect.
 */
export function resolveEnabled(now = Date.now()): boolean {
	try {
		const urlFlag = readUrlFlag();
		if (urlFlag === '1' || urlFlag === 'true') setEnabled(true, now);
		else if (urlFlag === '0' || urlFlag === 'false') setEnabled(false);

		const expiresAt = Number(localStorage.getItem(STORAGE.enabled));
		if (expiresAt > now) return true;
		setEnabled(false);
		return false;
	} catch {
		return false;
	}
}
