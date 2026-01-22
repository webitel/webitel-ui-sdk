export const RingtoneType = {
	Call: 'call',
	Chat: 'chat',
	Task: 'task',
} as const;

export type RingtoneType = (typeof RingtoneType)[keyof typeof RingtoneType];
