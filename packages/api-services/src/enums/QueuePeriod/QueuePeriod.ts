export const QueuePeriod = {
	TODAY: 'today',
	SIX_HOURS: '6hour',
	THREE_HOURS: '3hour',
	ONE_HOUR: '1hour',
	THIRTY_MINUTES: '30min',
	FIFTEEN_MINUTES: '15min',
} as const;

export type QueuePeriod = (typeof QueuePeriod)[keyof typeof QueuePeriod];
