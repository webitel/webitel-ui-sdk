import { z } from 'zod';

import { queueAmdSchema } from './queueAmd.validations';

/**
 * @description
 * The union of every queue type's `payload`. Which of these a given queue
 * actually uses is decided by its type, both for display (the admin app's
 * `QueueTypeProperties` lookup) and for validation (`queueTypeRules`).
 *
 * Deliberately no `.default()` on any leaf. Defaults come from
 * `getQueueDefaults(type)`, which holds exactly the per-type key set; a default
 * here would seed every queue with every field, and since
 * `sanitize(fieldsToSend)` only filters top-level keys, `payload` is sent
 * whole — an inbound queue would ship `progressiveCount` to the backend.
 */
export const queuePayloadSchema = z.object({
	// dialing and retries
	maxAttempts: z.number().optional(),
	minAttempts: z.number().optional(),
	originateTimeout: z.number().optional(),
	waitBetweenRetries: z.number().optional(),
	waitBetweenRetriesDesc: z.boolean().optional(),
	minDuration: z.number().optional(),
	maxCalls: z.number().optional(),
	progressiveCount: z.number().optional(),
	dialingRate: z.number().optional(),
	resourceStrategy: z.string().optional(),
	strictCircuit: z.boolean().optional(),
	perNumbers: z.boolean().optional(),
	endless: z.boolean().optional(),
	retryAbandoned: z.boolean().optional(),

	// predictive dialer only
	maxAgentLine: z.number().optional(),
	maxAgentLose: z.number().optional(),
	maxAbandonedRate: z.number().optional(),
	targetAbandonedRate: z.number().optional(),
	abandonRateAdjustment: z.number().optional(),
	loadFactor: z.number().optional(),
	playbackSilence: z.number().optional(),
	statisticTime: z.number().optional(),

	// waiting and distribution
	timeBaseScore: z.string().optional(),
	maxWaitTime: z.number().optional(),
	maxWaitingSize: z.number().optional(),
	discardAbandonedAfter: z.number().optional(),
	manualDistribution: z.boolean().optional(),
	minOnlineAgents: z.number().optional(),
	maxMemberLimit: z.number().optional(),
	ignoreCalendar: z.boolean().optional(),

	// sticky agent
	stickyAgentSec: z.number().optional(),
	stickyIgnoreStatus: z.boolean().optional(),

	// chat queues only
	maxIdleAgent: z.number().optional(),
	maxIdleClient: z.number().optional(),
	maxIdleDialog: z.number().optional(),
	lastMessageTimeout: z.boolean().optional(),

	// media
	recordings: z.boolean().optional(),
	recordAll: z.boolean().optional(),
	allowGreetingAgent: z.boolean().optional(),
	autoAnswerTone: z.string().nullable().optional(),

	amd: queueAmdSchema.optional(),
});
