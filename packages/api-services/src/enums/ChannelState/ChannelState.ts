export const ChannelState = {
	WAITING: 'waiting',
	DISTRIBUTE: 'distribute',
	OFFERING: 'offering',
	ANSWERED: 'answered',
	ACTIVE: 'active',
	BRIDGED: 'bridged',
	HOLD: 'hold',
	MISSED: 'missed',
	WRAP_TIME: 'wrap_time',
	PROCESSING: 'processing',
	TRANSFER: 'transfer',
	FORM: 'form',
} as const;

export type ChannelState = (typeof ChannelState)[keyof typeof ChannelState];
