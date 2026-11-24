// the session's own credential, cut out by value wherever it turns up: under any key, in a URL path, in message text
import { REDACTED } from './patterns';

/** where every webitel app keeps the access token (sent as X-Webitel-Access) */
const ACCESS_TOKEN_KEY = 'access-token';
// shorter values would match by accident
const MIN_SECRET_CHARS = 16;

export function knownSecrets(): string[] {
	try {
		const token = localStorage.getItem(ACCESS_TOKEN_KEY);
		return token && token.length >= MIN_SECRET_CHARS
			? [
					token,
				]
			: [];
	} catch {
		return [];
	}
}

/** replaces every occurrence of the current access token; the key rules miss it under innocent keys (`session.id` of the WebSocket hello) */
export function scrubKnownSecrets(
	text: string,
	secrets: string[] = knownSecrets(),
): string {
	let out = text;
	for (const secret of secrets) {
		if (out.includes(secret)) out = out.split(secret).join(REDACTED);
	}
	return out;
}
