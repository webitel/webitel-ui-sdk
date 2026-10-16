/** [Claude] IPv4 without anchors, so it can be embedded into bigger patterns (e.g. a SIP host) */
export const ipv4Pattern =
	'(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])';

const ipv4Regex = new RegExp(`^${ipv4Pattern}$`);

/** [Claude] format rule only: an empty value passes; loopback and 0.0.0.0 are rejected */
export const isIp = (value?: string) =>
	!value ||
	(value !== '127.0.0.1' && value !== '0.0.0.0' && ipv4Regex.test(value));
