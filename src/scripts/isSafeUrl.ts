// http: stays: on-prem runs without TLS
const SAFE_URL_PROTOCOLS = new Set([
	'http:',
	'https:',
	'blob:',
]);

// no document to resolve a relative URL against outside a browser (SSR, docs)
const resolutionBase = (): string =>
	typeof window === 'undefined' ? 'http://localhost/' : window.location.href;

/** Scheme check only; the host is not inspected. */
export const isSafeUrl = (url?: string | null): boolean => {
	if (!url) return false;

	try {
		const { protocol } = new URL(url, resolutionBase());

		return SAFE_URL_PROTOCOLS.has(protocol);
	} catch {
		return false;
	}
};
