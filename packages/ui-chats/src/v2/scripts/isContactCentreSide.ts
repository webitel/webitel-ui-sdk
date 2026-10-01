import type { ChatParticipant } from '../types';

/**
 * ⚠ Carried over from v1 (`chat-message.vue`, `member.type === 'webitel'`);
 * not confirmed for the new IM backend. This is the one place to change it.
 */
export const INTERNAL_CONTACT_TYPE = 'webitel';

/** Operators and bots speak for the contact centre; everyone else is the client. */
export const isContactCentreSide = (
	member: ChatParticipant | undefined,
): boolean =>
	member?.contact?.type === INTERNAL_CONTACT_TYPE ||
	member?.contact?.isBot === true;
