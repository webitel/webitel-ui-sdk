export const QueueType = {
	OFFLINE_QUEUE: 0,
	INBOUND_QUEUE: 1,
	OUTBOUND_IVR_QUEUE: 2,
	PREVIEW_DIALER: 3,
	PROGRESSIVE_DIALER: 4,
	PREDICTIVE_DIALER: 5,
	CHAT_INBOUND_QUEUE: 6,
	INBOUND_JOB_QUEUE: 7,
	OUTBOUND_JOB_QUEUE: 8,
	IM_CHAT_QUEUE: 9,
} as const;

export type QueueType = (typeof QueueType)[keyof typeof QueueType];

export const QueueTypeName = {
	OFFLINE_QUEUE: 'offline',
	INBOUND_QUEUE: 'inbound',
	OUTBOUND_IVR_QUEUE: 'ivr',
	PREVIEW_DIALER: 'preview',
	PROGRESSIVE_DIALER: 'progressive',
	PREDICTIVE_DIALER: 'predictive',
	CHAT_INBOUND_QUEUE: 'inbound chat',
	INBOUND_JOB_QUEUE: 'task',
	OUTBOUND_JOB_QUEUE: 'outbound_task',
	OUTBOUND_CALL: 'outbound_call',
	IM_CHAT_QUEUE: 'im_chat',
	NOT_IMPLEMENT: 'NOT_IMPLEMENT',
} as const;

export type QueueTypeName = (typeof QueueTypeName)[keyof typeof QueueTypeName];
