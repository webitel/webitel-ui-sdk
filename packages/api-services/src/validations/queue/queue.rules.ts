import { QueueType } from '../../enums';

export interface QueueTypeRule {
	/** dot-paths, relative to the queue object */
	required?: string[];
	/** dot-path → inclusive minimum */
	minValue?: Record<string, number>;
}

/**
 * @description
 * Per-queue-type validation, transcribed from the admin app's
 * `opened-queue.vue` `validations()` switch.
 *
 * Two things in here look like mistakes and are not:
 *
 * - `team` is commented "required" in every legacy queue schema but was never
 *   actually validated. That is preserved — adding it would start rejecting
 *   queues that save fine today.
 * - `priority` and `payload.minOnlineAgents` carry `minValue(0)` for *all* ten
 *   types, including the ones whose form never shows `minOnlineAgents`.
 */
export const sharedQueueRules: QueueTypeRule = {
	required: [
		'name',
	],
	minValue: {
		priority: 0,
		'payload.minOnlineAgents': 0,
	},
};

export const queueTypeRules: Record<number, QueueTypeRule> = {
	[QueueType.OFFLINE_QUEUE]: {
		required: [
			'strategy',
			'calendar',
			'payload.originateTimeout',
		],
		minValue: {
			'payload.originateTimeout': 0,
		},
	},
	[QueueType.INBOUND_QUEUE]: {
		required: [
			'payload.timeBaseScore',
			'payload.maxWaitTime',
		],
		minValue: {
			'payload.maxWaitTime': 0,
			'payload.discardAbandonedAfter': 0,
		},
	},
	[QueueType.OUTBOUND_IVR_QUEUE]: {
		required: [
			'strategy',
			'calendar',
			'schema',
			'payload.maxAttempts',
			'payload.originateTimeout',
			'payload.waitBetweenRetries',
			'payload.resourceStrategy',
		],
		minValue: {
			'payload.originateTimeout': 0,
			'payload.waitBetweenRetries': 0,
			'payload.minDuration': 0,
		},
	},
	[QueueType.PREVIEW_DIALER]: {
		required: [
			'strategy',
			'calendar',
			'payload.maxAttempts',
			'payload.originateTimeout',
			'payload.waitBetweenRetries',
			'payload.resourceStrategy',
		],
		minValue: {
			'payload.originateTimeout': 0,
			'payload.waitBetweenRetries': 0,
		},
	},
	[QueueType.PROGRESSIVE_DIALER]: {
		required: [
			'strategy',
			'calendar',
			'payload.maxAttempts',
			'payload.originateTimeout',
			'payload.waitBetweenRetries',
			'payload.resourceStrategy',
			'payload.progressiveCount',
		],
		minValue: {
			'payload.originateTimeout': 0,
			'payload.waitBetweenRetries': 0,
			'payload.progressiveCount': 1,
		},
	},
	[QueueType.PREDICTIVE_DIALER]: {
		required: [
			'strategy',
			'calendar',
			'payload.maxAttempts',
			'payload.originateTimeout',
			'payload.waitBetweenRetries',
			'payload.resourceStrategy',
			'payload.progressiveCount',
		],
		minValue: {
			'payload.originateTimeout': 0,
			'payload.waitBetweenRetries': 0,
			'payload.maxWaitTime': 0,
			'payload.progressiveCount': 1,
		},
	},
	[QueueType.CHAT_INBOUND_QUEUE]: {
		required: [
			'strategy',
			'payload.timeBaseScore',
			'payload.maxWaitTime',
		],
		minValue: {
			'payload.maxWaitTime': 0,
			'payload.discardAbandonedAfter': 0,
		},
	},
	/** shares a `case` label with CHAT_INBOUND_QUEUE in the legacy switch */
	[QueueType.IM_CHAT_QUEUE]: {
		required: [
			'strategy',
			'payload.timeBaseScore',
			'payload.maxWaitTime',
		],
		minValue: {
			'payload.maxWaitTime': 0,
			'payload.discardAbandonedAfter': 0,
		},
	},
	[QueueType.INBOUND_JOB_QUEUE]: {
		required: [
			'strategy',
			'calendar',
			'payload.maxAttempts',
			'payload.waitBetweenRetries',
		],
		minValue: {
			'payload.waitBetweenRetries': 0,
		},
	},
	[QueueType.OUTBOUND_JOB_QUEUE]: {
		required: [
			'strategy',
			'calendar',
			'schema',
			'payload.maxAttempts',
			'payload.originateTimeout',
			'payload.waitBetweenRetries',
		],
		minValue: {
			'payload.originateTimeout': 0,
			'payload.waitBetweenRetries': 0,
			'payload.minDuration': 0,
		},
	},
};
