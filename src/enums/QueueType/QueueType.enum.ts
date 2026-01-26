export const QueueType = Object.freeze({
	OFFLINE_QUEUE: 0,
	INBOUND_QUEUE: 1,
	OUTBOUND_IVR_QUEUE: 2,
	PREVIEW_DIALER: 3,
	PROGRESSIVE_DIALER: 4,
	PREDICTIVE_DIALER: 5,
	CHAT_INBOUND_QUEUE: 6,
	INBOUND_JOB_QUEUE: 7,
	OUTBOUND_JOB_QUEUE: 8,
});

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
	NOT_IMPLEMENT: 'NOT_IMPLEMENT',
};

export type QueueTypeName = (typeof QueueTypeName)[keyof typeof QueueTypeName];
