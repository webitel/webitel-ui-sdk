export const GatewayIpAclProtocol = {
	Any: 'any',
	Udp: 'udp',
	Tcp: 'tcp',
} as const;

export type GatewayIpAclProtocol =
	(typeof GatewayIpAclProtocol)[keyof typeof GatewayIpAclProtocol];
