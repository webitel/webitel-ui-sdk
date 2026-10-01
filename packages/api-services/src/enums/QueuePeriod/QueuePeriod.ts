export const QueuePeriod = {
	Today: 'today',
	SixHours: '6hour',
	ThreeHours: '3hour',
	OneHour: '1hour',
	ThirtyMinutes: '30min',
	FifteenMinutes: '15min',
} as const;

export type QueuePeriod = (typeof QueuePeriod)[keyof typeof QueuePeriod];
