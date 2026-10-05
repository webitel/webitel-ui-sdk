export const AgentStatus = {
	Online: 'online',
	Offline: 'offline',
	Pause: 'pause',
	BreakOut: 'break_out',
} as const;

export type AgentStatus = (typeof AgentStatus)[keyof typeof AgentStatus];
