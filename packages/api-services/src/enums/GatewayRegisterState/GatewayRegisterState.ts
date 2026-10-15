/** [Claude] gateway `rState`: FreeSWITCH sofia registration states, in their numeric order */
export const GatewayRegisterState = {
	Unregistered: 0,
	Trying: 1,
	Register: 2,
	Registered: 3,
	Unregister: 4,
	Failed: 5,
	FailWait: 6,
	Expired: 7,
	NoReg: 8,
	Down: 9,
	Timeout: 10,
} as const;

export type GatewayRegisterState =
	(typeof GatewayRegisterState)[keyof typeof GatewayRegisterState];
