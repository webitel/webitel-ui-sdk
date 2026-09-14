import { z } from 'zod';

import { clearableNumberSchema } from '../_shared/clearableNumber.validations';

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
	maxAttempts: clearableNumberSchema,
	minAttempts: clearableNumberSchema,
	originateTimeout: clearableNumberSchema,
	waitBetweenRetries: clearableNumberSchema,
	waitBetweenRetriesDesc: z.boolean().optional(),
	minDuration: clearableNumberSchema,
	maxCalls: clearableNumberSchema,
	progressiveCount: clearableNumberSchema,
	dialingRate: clearableNumberSchema,
	resourceStrategy: z.string().optional(),
	strictCircuit: z.boolean().optional(),
	perNumbers: z.boolean().optional(),
	endless: z.boolean().optional(),
	retryAbandoned: z.boolean().optional(),

	// predictive dialer only
	maxAgentLine: clearableNumberSchema,
	maxAgentLose: clearableNumberSchema,
	maxAbandonedRate: clearableNumberSchema,
	targetAbandonedRate: clearableNumberSchema,
	abandonRateAdjustment: clearableNumberSchema,
	loadFactor: clearableNumberSchema,
	playbackSilence: clearableNumberSchema,
	statisticTime: clearableNumberSchema,

	// waiting and distribution
	timeBaseScore: z.string().optional(),
	maxWaitTime: clearableNumberSchema,
	maxWaitingSize: clearableNumberSchema,
	discardAbandonedAfter: clearableNumberSchema,
	manualDistribution: z.boolean().optional(),
	minOnlineAgents: clearableNumberSchema,
	maxMemberLimit: clearableNumberSchema,
	ignoreCalendar: z.boolean().optional(),

	// sticky agent
	stickyAgentSec: clearableNumberSchema,
	stickyIgnoreStatus: z.boolean().optional(),

	// chat queues only
	maxIdleAgent: clearableNumberSchema,
	maxIdleClient: clearableNumberSchema,
	maxIdleDialog: clearableNumberSchema,
	lastMessageTimeout: z.boolean().optional(),

	// media
	recordings: z.boolean().optional(),
	recordAll: z.boolean().optional(),
	allowGreetingAgent: z.boolean().optional(),
	autoAnswerTone: z.string().nullable().optional(),

	amd: queueAmdSchema.optional(),
});
