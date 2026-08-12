import {
	QueueStrategy,
	QueueType,
	TimeBaseScore,
	TypesResourceStrategy,
} from '../../../../enums';
import { amd } from './amd';
import { defaultQueue } from './defaultQueue';
import { processing } from './processing';

/**
 * @description
 * The default field set a queue of a given type is created with.
 *
 * These are NOT cosmetic. Regle builds its nested `$fields` from the *state*
 * keys, not from the Zod schema shape — a field that is declared in
 * `queueSchema` but missing from the draft has no validation entry at all, so
 * its required marker and error text silently disappear from the form.
 * Every key a queue type's UI can touch must therefore be seeded here, on
 * create (via the card store) and on read (see `QueuesAPI.get`).
 *
 * Ported 1:1 from the admin app's legacy `store/_internals/queueSchema/*.js`.
 * Keep the per-type key sets exactly as they are: `sanitize(fieldsToSend)` only
 * filters top-level keys, so `payload` is sent whole and a stray cross-type
 * field (e.g. `progressiveCount` on an inbound queue) would reach the backend.
 */
export interface QueueDefaults {
	[key: string]: unknown;
	type: QueueType;
	payload: Record<string, unknown>;
}

const offlineQueue = (): QueueDefaults => ({
	...defaultQueue(),
	type: QueueType.OFFLINE_QUEUE,
	team: {},
	strategy: QueueStrategy.FIFO,
	doSchema: {},
	afterSchema: {},
	grantee: {},
	taskProcessing: processing(),
	payload: {
		maxAttempts: 3,
		waitBetweenRetries: 30 * 60,
		originateTimeout: 60,
		recordings: false,
		recordAll: false,
		perNumbers: false,
		minOnlineAgents: 0,
		maxMemberLimit: 0,
	},
});

const inboundQueue = (): QueueDefaults => ({
	...defaultQueue(),
	type: QueueType.INBOUND_QUEUE,
	team: {},
	ringtone: {},
	grantee: {},
	stickyAgent: false,
	taskProcessing: processing(),
	payload: {
		discardAbandonedAfter: 0,
		timeBaseScore: TimeBaseScore.QUEUE,
		maxWaitTime: 60 * 60,
		allowGreetingAgent: false,
		stickyIgnoreStatus: false,
		ignoreCalendar: false,
		stickyAgentSec: 5,
		maxWaitingSize: 0,
		autoAnswerTone: null,
		minOnlineAgents: 0,
		manualDistribution: false,
		maxMemberLimit: 0,
	},
});

/** NB: no `taskProcessing` — matches the legacy schema exactly. */
const outboundIVRQueue = (): QueueDefaults => ({
	...defaultQueue(),
	type: QueueType.OUTBOUND_IVR_QUEUE,
	strategy: QueueStrategy.FIFO,
	schema: {},
	doSchema: {},
	afterSchema: {},
	grantee: {},
	payload: {
		minDuration: 3,
		maxAttempts: 3,
		originateTimeout: 60,
		waitBetweenRetries: 30 * 60,
		waitBetweenRetriesDesc: false,
		maxCalls: 10,
		recordings: false,
		recordAll: false,
		amd: amd(),
		strictCircuit: false,
		perNumbers: false,
		resourceStrategy: TypesResourceStrategy.EVEN_DISTRIBUTION,
		maxMemberLimit: 0,
	},
});

const previewDialer = (): QueueDefaults => ({
	...defaultQueue(),
	type: QueueType.PREVIEW_DIALER,
	team: {},
	strategy: QueueStrategy.FIFO,
	doSchema: {},
	afterSchema: {},
	grantee: {},
	stickyAgent: false,
	taskProcessing: processing(),
	payload: {
		maxAttempts: 3,
		originateTimeout: 60,
		waitBetweenRetries: 30 * 60,
		waitBetweenRetriesDesc: false,
		maxCalls: 10,
		recordings: false,
		recordAll: false,
		allowGreetingAgent: false,
		strictCircuit: false,
		endless: false,
		perNumbers: false,
		minOnlineAgents: 0,
		resourceStrategy: TypesResourceStrategy.EVEN_DISTRIBUTION,
		maxMemberLimit: 0,
	},
});

const progressiveDialer = (): QueueDefaults => ({
	...defaultQueue(),
	type: QueueType.PROGRESSIVE_DIALER,
	team: {},
	strategy: QueueStrategy.FIFO,
	doSchema: {},
	afterSchema: {},
	ringtone: {},
	grantee: {},
	stickyAgent: false,
	taskProcessing: processing(),
	payload: {
		maxAttempts: 3,
		originateTimeout: 60,
		waitBetweenRetries: 30 * 60,
		progressiveCount: 1,
		waitBetweenRetriesDesc: false,
		recordings: false,
		recordAll: false,
		allowGreetingAgent: false,
		maxCalls: 10,
		amd: amd(),
		strictCircuit: false,
		endless: false,
		perNumbers: false,
		autoAnswerTone: null,
		minOnlineAgents: 0,
		resourceStrategy: TypesResourceStrategy.EVEN_DISTRIBUTION,
		maxMemberLimit: 0,
	},
});

const predictiveDialer = (): QueueDefaults => ({
	...defaultQueue(),
	type: QueueType.PREDICTIVE_DIALER,
	strategy: QueueStrategy.FIFO,
	team: {},
	doSchema: {},
	afterSchema: {},
	ringtone: {},
	grantee: {},
	stickyAgent: false,
	taskProcessing: processing(),
	payload: {
		maxWaitTime: 10,
		maxAttempts: 3,
		originateTimeout: 60,
		waitBetweenRetries: 30 * 60,
		progressiveCount: 1,
		waitBetweenRetriesDesc: false,
		retryAbandoned: false,
		recordings: false,
		recordAll: false,
		allowGreetingAgent: false,
		maxCalls: 10,
		dialingRate: 5,
		amd: amd(),
		maxAgentLine: 5,
		minAttempts: 3,
		maxAbandonedRate: 5.0,
		targetAbandonedRate: 3.0,
		loadFactor: 10,
		maxAgentLose: 1,
		abandonRateAdjustment: 0,
		playbackSilence: 0,
		strictCircuit: false,
		statisticTime: 60,
		endless: false,
		perNumbers: false,
		stickyAgentSec: 5,
		autoAnswerTone: null,
		minOnlineAgents: 0,
		resourceStrategy: TypesResourceStrategy.EVEN_DISTRIBUTION,
		maxMemberLimit: 0,
	},
});

const chatInboundQueue = (): QueueDefaults => ({
	...defaultQueue(),
	type: QueueType.CHAT_INBOUND_QUEUE,
	team: {},
	strategy: QueueStrategy.FIFO,
	formSchema: {},
	stickyAgent: false,
	taskProcessing: processing(),
	payload: {
		discardAbandonedAfter: 0,
		timeBaseScore: TimeBaseScore.QUEUE,
		maxWaitTime: 60 * 60,
		stickyAgentSec: 5,
		stickyIgnoreStatus: false,
		ignoreCalendar: false,
		maxIdleAgent: 60 * 60,
		maxIdleClient: 60 * 60,
		maxIdleDialog: 0,
		maxWaitingSize: 0,
		minOnlineAgents: 0,
		manualDistribution: false,
		lastMessageTimeout: false,
		maxMemberLimit: 0,
	},
});

/** Identical to CHAT_INBOUND_QUEUE apart from `type` — as in the legacy schema. */
const imChatQueue = (): QueueDefaults => ({
	...chatInboundQueue(),
	type: QueueType.IM_CHAT_QUEUE,
});

const inboundJobQueue = (): QueueDefaults => ({
	...defaultQueue(),
	type: QueueType.INBOUND_JOB_QUEUE,
	team: {},
	strategy: QueueStrategy.FIFO,
	doSchema: {},
	afterSchema: {},
	stickyAgent: false,
	taskProcessing: processing(),
	payload: {
		maxAttempts: 3,
		waitBetweenRetries: 30 * 60,
		maxCalls: 10,
		waitBetweenRetriesDesc: false,
		minOnlineAgents: 0,
		maxMemberLimit: 0,
	},
});

/** NB: no `taskProcessing` — matches the legacy schema exactly. */
const outboundJobQueue = (): QueueDefaults => ({
	...defaultQueue(),
	type: QueueType.OUTBOUND_JOB_QUEUE,
	strategy: QueueStrategy.FIFO,
	schema: {},
	doSchema: {},
	afterSchema: {},
	payload: {
		maxAttempts: 3,
		originateTimeout: 60,
		waitBetweenRetries: 30 * 60,
		waitBetweenRetriesDesc: false,
		maxCalls: 10,
		strictCircuit: false,
		perNumbers: false,
		maxMemberLimit: 0,
	},
});

export const QueueTypeDefaults: Record<number, () => QueueDefaults> = {
	[QueueType.OFFLINE_QUEUE]: offlineQueue,
	[QueueType.INBOUND_QUEUE]: inboundQueue,
	[QueueType.OUTBOUND_IVR_QUEUE]: outboundIVRQueue,
	[QueueType.PREVIEW_DIALER]: previewDialer,
	[QueueType.PROGRESSIVE_DIALER]: progressiveDialer,
	[QueueType.PREDICTIVE_DIALER]: predictiveDialer,
	[QueueType.CHAT_INBOUND_QUEUE]: chatInboundQueue,
	[QueueType.IM_CHAT_QUEUE]: imChatQueue,
	[QueueType.INBOUND_JOB_QUEUE]: inboundJobQueue,
	[QueueType.OUTBOUND_JOB_QUEUE]: outboundJobQueue,
};

export const hasQueueTypeDefaults = (type: number | string | undefined) =>
	Number(type) in QueueTypeDefaults;

/**
 * @description
 * A fresh defaults object for `type`. Always a new object — callers deepmerge
 * into it, and the legacy code relied on factories for exactly this reason.
 * Falls back to the type-agnostic base when `type` is unknown.
 */
export const getQueueDefaults = (
	type: number | string | undefined,
): Partial<QueueDefaults> =>
	QueueTypeDefaults[Number(type)]?.() ?? defaultQueue();
