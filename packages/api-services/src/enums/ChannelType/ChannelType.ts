export const ChannelType = {
	Call: 'call',
	Email: 'email',
	Chat: 'chat',
	Job: 'task',
	OutCall: 'out_call',
	Im: 'im',
} as const;

export type ChannelType = (typeof ChannelType)[keyof typeof ChannelType];
