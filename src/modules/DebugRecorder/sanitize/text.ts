// free text: prose `name: value` pairs, tokens, e-mails, phone numbers
import { MAX_TEXT_CHARS } from '../config';
import {
	AUTH_HEADER_NAME_RE,
	AUTH_SCHEME_RE,
	DIGEST_RE,
	EMAIL_RE,
	isSecretKey,
	JSON_STRING_PAIR_RE,
	MAX_GAP_CHARS,
	MAX_NAME_CHARS,
	NAME_CHAR_RE,
	PHONE_RE,
	PROSE_SEPARATOR_RE,
	REDACTED,
	SIP_AUTH_HEADER_RE,
	TEXT_TOKEN_RE,
	VALUE_STOP_RE,
} from './patterns';
import {
	containsSecretPair,
	isSecretParam,
	redactParams,
	redactUserinfo,
} from './url';

// end of the value at `start`; an unterminated quote fails closed to the end of the (truncated) text
export function valueEnd(text: string, start: number): number {
	// a value quoted inside an already escaped string: `\"secret\"`
	if (text[start] === '\\' && /["']/.test(text[start + 1] ?? '')) {
		const quote = text[start + 1];
		for (let i = start + 2; i < text.length; i += 1) {
			if (text[i] === '\\' && text[i + 1] === quote) return i + 2;
			if (text[i] === '\\') i += 1;
		}
		return text.length;
	}
	const quote = text[start];
	if (quote === '"' || quote === "'") {
		for (let i = start + 1; i < text.length; i += 1) {
			if (text[i] === '\\') i += 1;
			else if (text[i] === quote) return i + 1;
		}
		return text.length;
	}
	let i = start;
	while (i < text.length && !VALUE_STOP_RE.test(text[i])) i += 1;
	return i;
}

export function nameBefore(text: string, end: number): string {
	let start = end;
	while (
		start > 0 &&
		end - start < MAX_NAME_CHARS &&
		NAME_CHAR_RE.test(text[start - 1])
	) {
		start -= 1;
	}
	return text.slice(start, end);
}

/** `password: x`, `token="x"`, `'apiKey':\n 'x'` in free text, for any secret-looking name */
export function redactProse(text: string): string {
	const separatorRe = new RegExp(PROSE_SEPARATOR_RE.source, 'g');
	let out = '';
	let last = 0;
	for (let m = separatorRe.exec(text); m; m = separatorRe.exec(text)) {
		// `name "  :` — step back over blanks and one closing quote, bounded
		let nameEnd = m.index;
		const gapLimit = Math.max(0, m.index - MAX_GAP_CHARS);
		while (nameEnd > gapLimit && /[ \t]/.test(text[nameEnd - 1])) nameEnd -= 1;
		if (nameEnd > 0 && /["']/.test(text[nameEnd - 1])) nameEnd -= 1;
		// the quote may itself be escaped: `\"password\":`
		if (nameEnd > 0 && text[nameEnd - 1] === '\\') nameEnd -= 1;
		const name = nameBefore(text, nameEnd);
		if (!name || !isSecretParam(name)) continue;

		// the value may follow on the next line
		let start = m.index + 1;
		while (start < text.length && /\s/.test(text[start])) start += 1;
		if (start >= text.length || text.startsWith(REDACTED, start)) continue;
		let end = valueEnd(text, start);
		// `Authorization: Basic …`, `Digest …`: an unquoted credential runs to the end of the line
		if (AUTH_HEADER_NAME_RE.test(name) && !/["'\\]/.test(text[start])) {
			const lineEnd = text.slice(start).search(/[\r\n]/);
			end = lineEnd === -1 ? text.length : start + lineEnd;
		}
		// value starts with a stop char (`password=,abc`, `token=<x>`): fail closed to the next blank
		if (end === start) {
			while (end < text.length && !/\s/.test(text[end])) end += 1;
		}
		out += `${text.slice(last, start)}${REDACTED}`;
		last = end;
		separatorRe.lastIndex = end;
	}
	return out + text.slice(last);
}

/** backstop: a whitespace/quote-delimited token that still decodes to a secret pair goes whole */
export function redactTokens(text: string): string {
	return text.replace(TEXT_TOKEN_RE, (token) =>
		containsSecretPair(token) ? REDACTED : token,
	);
}

export function maskPii(value: string): string {
	if (value.includes('@')) {
		return `***@${value.split('@').pop()}`;
	}
	return value.length > 4 ? `***${value.slice(-3)}` : '***';
}

export function truncate(text: string, max = MAX_TEXT_CHARS): string {
	return text.length > max
		? `${text.slice(0, max)}…[+${text.length - max} chars]`
		: text;
}

export interface RedactTextOptions {
	/** mask long digit runs: only for SIP, where numbers are dialled numbers */
	phones?: boolean;
}

export function redactText(text: string, opts: RedactTextOptions = {}): string {
	// cut first: every pass below then works on a bounded input
	let out = redactUserinfo(truncate(text))
		.replace(SIP_AUTH_HEADER_RE, `$1: ${REDACTED}`)
		.replace(AUTH_SCHEME_RE, `$1$2${REDACTED}`)
		.replace(DIGEST_RE, `$1 ${REDACTED}`)
		.replace(JSON_STRING_PAIR_RE, (match, prefix: string, key: string) =>
			isSecretKey(key) ? `${prefix}"${REDACTED}"` : match,
		);
	out = redactTokens(redactParams(redactProse(out))).replace(
		EMAIL_RE,
		'***@$1',
	);
	if (opts.phones) {
		out = out.replace(PHONE_RE, (m) => maskPii(m));
	}
	return out;
}
