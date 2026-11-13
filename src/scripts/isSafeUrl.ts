// http: stays: on-prem runs without TLS
const SAFE_URL_PROTOCOLS = new Set([
	'http:',
	'https:',
	'blob:',
]);

/** Scheme check only; the host is not inspected. */
export const isSafeUrl = (url?: string | null): boolean => {
	if (!url || typeof window === 'undefined') return false;

	try {
		const { protocol } = new URL(url, window.location.href);

		return SAFE_URL_PROTOCOLS.has(protocol);
	} catch {
		return false;
	}
};
