// URLs and query strings: secret parameters, user info; fails closed on values it cannot decode
import {
	AUTHORITY_END_RE,
	isSecretName,
	MAX_DECODE_PASSES,
	PAIR_NAME_RE,
	PARAM_RE,
	REDACTED,
} from './patterns';

export function decodeOnce(value: string): string {
	return value.replace(/%[0-9A-Fa-f]{2}/g, (sequence) => {
		try {
			return decodeURIComponent(sequence);
		} catch {
			return sequence;
		}
	});
}

/** every decoded form of `value`, raw first; null if it still changes after the pass limit */
export function decodedForms(value: string): string[] | null {
	const forms = [
		value,
	];
	let current = value;
	for (let pass = 0; pass < MAX_DECODE_PASSES; pass += 1) {
		const next = decodeOnce(current);
		if (next === current) return forms;
		forms.push(next);
		current = next;
	}
	return decodeOnce(current) === current ? forms : null;
}

/** true if `value`, or any percent-decoded form of it, contains `<secret-name>=` */
export function containsSecretPair(value: string): boolean {
	if (!value.includes('=') && !value.includes('%')) return false;
	const forms = decodedForms(value);
	if (!forms) return true;
	return forms.some((form) =>
		Array.from(form.matchAll(PAIR_NAME_RE)).some(([, name]) =>
			isSecretName(name),
		),
	);
}

export function isSecretParam(rawName: string): boolean {
	const forms = decodedForms(rawName);
	return !forms || forms.some(isSecretName);
}

export function redactParams(text: string): string {
	return text.replace(
		PARAM_RE,
		(match, delimiter: string, name: string, value: string) =>
			isSecretParam(name) || containsSecretPair(value)
				? `${delimiter}${name}=${REDACTED}`
				: match,
	);
}

// `scheme://user:pass@host`: everything up to the last `@` of the authority goes, at any length; one linear pass
export function redactUserinfo(text: string): string {
	let out = '';
	let from = 0;
	let marker = text.indexOf('://');
	while (marker !== -1) {
		const start = marker + 3;
		let end = start;
		let lastAt = -1;
		while (end < text.length && !AUTHORITY_END_RE.test(text[end])) {
			if (text[end] === '@') lastAt = end;
			end += 1;
		}
		if (lastAt !== -1) {
			out += `${text.slice(from, start)}${REDACTED}`;
			from = lastAt;
		}
		// the scan stops at the `/` of an adjacent `://`, so look again from just before it
		marker = text.indexOf('://', Math.max(start, end - 2));
	}
	return from === 0 ? text : out + text.slice(from);
}

export function redactUrl(url: string): string {
	const out = redactParams(redactUserinfo(url));
	return containsSecretPair(out) ? REDACTED : out;
}
