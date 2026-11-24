// SIP messages: display names and SDP credentials
import {
	REDACTED,
	SDP_SECRET_RE,
	SIP_CONTENT_TYPE_RE,
	SIP_IDENTITY_HEADER_RE,
} from './patterns';

export function maskDisplayNames(value: string): string {
	return value
		.replace(/"[^"\r\n]*"/g, '"***"')
		.replace(/(^|,)([ \t]*)([^,<"\r\n]*[^\s,<"])[ \t]*</g, '$1$2*** <');
}

/** SIP message: hides caller/callee display names and credentials in the SDP; any other body is replaced by its type and size */
export function redactSip(text: string): string {
	const split = text.indexOf('\r\n\r\n');
	const head = split === -1 ? text : text.slice(0, split);
	const body = split === -1 ? '' : text.slice(split + 4);
	const maskedHead = head.replace(
		SIP_IDENTITY_HEADER_RE,
		(_m, name: string, sep: string, value: string) =>
			`${name}${sep}${maskDisplayNames(value)}`,
	);
	if (!body) return split === -1 ? maskedHead : `${maskedHead}\r\n\r\n`;
	const type = SIP_CONTENT_TYPE_RE.exec(head)?.[1]?.trim().toLowerCase() ?? '';
	const maskedBody =
		type === 'application/sdp'
			? body.replace(SDP_SECRET_RE, `$1${REDACTED}`)
			: `[body: ${type || 'unknown type'}, ${body.length} chars]`;
	return `${maskedHead}\r\n\r\n${maskedBody}`;
}
