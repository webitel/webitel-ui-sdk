export const ChannelType = {
	CALL: 'call',
	EMAIL: 'email',
	CHAT: 'chat',
	JOB: 'task',
	OUT_CALL: 'out_call',
	IM: 'im',
} as const;

export type ChannelType = (typeof ChannelType)[keyof typeof ChannelType];
