import type {
	ChatNoticeTone,
	ChatParticipant,
	MessageModel,
	ThreadModel,
} from '../types';

export interface SystemNoticeDefinition {
	/** relative to the v2 locale namespace */
	textKey: string;
	tone: ChatNoticeTone;
}

/**
 * ⚠ WS-22 (backend, "Need info"): only `member_added`, `member_removed` and
 * `transferred` are documented. The started / accepted / closed type strings
 * are assumed — confirm them there and change only this table.
 */
export const SYSTEM_NOTICES: Record<string, SystemNoticeDefinition> = {
	thread_started: {
		textKey: 'systemNotice.started',
		tone: 'positive',
	},
	member_added: {
		textKey: 'systemNotice.joined',
		tone: 'neutral',
	},
	thread_accepted: {
		textKey: 'systemNotice.accepted',
		tone: 'neutral',
	},
	transferred: {
		textKey: 'systemNotice.transferred',
		tone: 'neutral',
	},
	member_removed: {
		textKey: 'systemNotice.left',
		tone: 'neutral',
	},
	thread_closed: {
		textKey: 'systemNotice.ended',
		tone: 'negative',
	},
};

/** ⚠ WS-22: the metadata key carrying the acting member's id is unconfirmed. */
const ACTOR_METADATA_KEYS = [
	// chat-web-sdk's memberAdded / memberLeft socket payloads use these
	'newMemberId',
	'new_member_id',
	'removedMemberId',
	'removed_member_id',
	'memberId',
	'member_id',
	'actorId',
	'actor_id',
] as const;

export interface ResolvedSystemNotice {
	/** null when `fallbackText` should be shown instead */
	textKey: string | null;
	/** the backend's own text, for types the table does not know */
	fallbackText: string | null;
	tone: ChatNoticeTone;
	actor: ChatParticipant | undefined;
}

const findActor = (
	message: MessageModel,
	thread: ThreadModel,
): ChatParticipant | undefined => {
	const metadata = (message.system?.metadata ?? {}) as Record<string, unknown>;
	const members = thread.members ?? [];

	const actorId = ACTOR_METADATA_KEYS.map((key) => metadata[key]).find(
		(value): value is string => typeof value === 'string' && value !== '',
	);
	const byActorId = actorId
		? members.find((member) => member.id === actorId)
		: undefined;
	if (byActorId) return byActorId;

	const senderId = message.sender?.id;
	const bySender = senderId
		? members.find((member) => member.id === senderId)
		: undefined;
	// a member who has left is no longer in thread.members — the sender's own
	// enriched contact still carries the name
	return bySender ?? message.sender;
};

export const resolveSystemNotice = (
	message: MessageModel,
	thread: ThreadModel,
): ResolvedSystemNotice => {
	const type = message.system?.type;
	const definition = type ? SYSTEM_NOTICES[type] : undefined;
	const actor = findActor(message, thread);

	if (definition) {
		return {
			textKey: definition.textKey,
			fallbackText: null,
			tone: definition.tone,
			actor,
		};
	}

	return {
		textKey: message.body ? null : 'systemNotice.unknown',
		fallbackText: message.body || null,
		tone: 'neutral',
		actor,
	};
};

/** Display name, or '' when the participant carries none. */
export const participantName = (member: ChatParticipant | undefined): string =>
	member?.contact?.name || member?.contact?.username || '';
