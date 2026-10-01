export const ChannelState = {
	Waiting: 'waiting',
	Distribute: 'distribute',
	Offering: 'offering',
	Answered: 'answered',
	Active: 'active',
	Bridged: 'bridged',
	Hold: 'hold',
	Missed: 'missed',
	WrapTime: 'wrap_time',
	Processing: 'processing',
	Transfer: 'transfer',
	Form: 'form',
} as const;

export type ChannelState = (typeof ChannelState)[keyof typeof ChannelState];
