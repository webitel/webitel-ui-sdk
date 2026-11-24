// HTTP requests and WebSocket/SIP frames as one timeline line
import {
	bad,
	compact,
	type Data,
	duration,
	errorText,
	type Line,
	ok,
} from './format';

// digest auth challenges and a cancelled INVITE are routine
export const EXPECTED_SIP_CODES = new Set([
	401,
	407,
	487,
]);

export function http(type: string, d: Data): Line | null {
	if (type.endsWith(':start')) return null;
	const head = `${d.method} ${d.url}`;
	if (type.endsWith(':fail')) {
		return bad(
			`${head} ✗ ${errorText(d.error)} · ${duration(Number(d.durationMs))}`,
		);
	}
	const status = Number(d.status);
	const text = `${head} → ${status || 'network error'} · ${duration(Number(d.durationMs))}`;
	if (status > 0 && status < 400) return ok(text);
	return bad(d.body === undefined ? text : `${text} · ${compact(d.body, 200)}`);
}

export function socket(ch: string, type: string, d: Data): Line | null {
	const tag = `ws#${d.id}`;
	switch (type) {
		case 'ws:create': {
			const protocols = (d.protocols as string[] | undefined)?.join(',');
			return ok(
				`${tag} connecting ${d.url}${protocols ? ` [${protocols}]` : ''}`,
			);
		}
		case 'ws:open':
			return ok(`${tag} open`);
		case 'ws:error':
			return bad(`${tag} error`);
		case 'ws:close': {
			const text = `${tag} closed · code ${d.code}${d.reason ? ` "${d.reason}"` : ''}`;
			return d.wasClean ? ok(text) : bad(`${text} · not clean`);
		}
	}
	if (d.keepAlive) return null;
	const arrow = type === 'ws:out' ? '→' : '←';
	if (ch === 'sip' && d.line) {
		const ids = [
			d.callId && `Call-ID ${d.callId}`,
			d.cseq && `CSeq ${d.cseq}`,
		]
			.filter(Boolean)
			.join(', ');
		const line = String(d.line);
		const code = Number(/^SIP\/2\.0 (\d{3})/.exec(line)?.[1]);
		const text = `${tag} ${arrow} ${line}${ids ? ` (${ids})` : ''}`;
		return code >= 400 && !EXPECTED_SIP_CODES.has(code) ? bad(text) : ok(text);
	}
	const payload =
		d.msg ?? d.text ?? (d.binary !== undefined ? `[binary ${d.binary}]` : '');
	return ok(`${tag} ${arrow} ${compact(payload)}`);
}
