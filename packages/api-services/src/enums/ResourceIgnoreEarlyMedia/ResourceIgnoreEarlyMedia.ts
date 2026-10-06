export const ResourceIgnoreEarlyMedia = {
	True: 'true',
	False: 'false',
	Consume: 'consume',
	RingReady: 'ring_ready',
} as const;

export type ResourceIgnoreEarlyMedia =
	(typeof ResourceIgnoreEarlyMedia)[keyof typeof ResourceIgnoreEarlyMedia];
