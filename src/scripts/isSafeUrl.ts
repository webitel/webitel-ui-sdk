/**
 * Schemes allowed at a navigation sink. `javascript:` and `vbscript:` run in
 * the current origin; `data:` carries its own bytes and file name.
 * `http:` stays: on-prem is served without TLS.
 */
const SAFE_URL_PROTOCOLS = new Set([
	'http:',
	'https:',
	'blob:',
]);

// no document to resolve a relative URL against outside a browser (SSR, docs)
const resolutionBase = (): string =>
	typeof window === 'undefined' ? 'http://localhost/' : window.location.href;

/**
 * Whether `url` may be handed to a navigation sink — scheme only, the host is
 * not inspected. Parsing against a base covers both forms: a relative URL
 * inherits the document's scheme, an absolute one keeps its own.
 */
export const isSafeUrl = (url?: string | null): boolean => {
	if (!url) return false;

	try {
		const { protocol } = new URL(url, resolutionBase());

		return SAFE_URL_PROTOCOLS.has(protocol);
	} catch {
		return false;
	}
};
