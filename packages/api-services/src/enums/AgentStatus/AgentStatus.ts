export const AgentStatus = {
	ONLINE: 'online',
	OFFLINE: 'offline',
	PAUSE: 'pause',
	BREAK_OUT: 'break_out',
} as const;

export type AgentStatus = (typeof AgentStatus)[keyof typeof AgentStatus];
