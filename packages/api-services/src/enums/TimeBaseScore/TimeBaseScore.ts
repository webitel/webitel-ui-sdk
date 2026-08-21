export const TimeBaseScore = {
	QUEUE: 'queue',
	SYSTEM: 'system',
} as const;

export type TimeBaseScore = (typeof TimeBaseScore)[keyof typeof TimeBaseScore];
