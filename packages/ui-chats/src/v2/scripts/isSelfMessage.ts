import type { MessageModel, ThreadModel } from '../types';

/**
 * Whether the operator using the UI sent this message.
 *
 * Member ids are per membership: an operator who is removed and added again
 * gets a new one, while `thread.members` (and so `selfMemberId`) may still
 * hold the old. So an id match is not enough; the stable identity is the
 * contact — same subject from the same issuer as the operator's own member.
 */
export const isSelfMessage = (
	message: MessageModel,
	thread: ThreadModel,
	selfMemberId: string,
): boolean => {
	const sender = message.sender;
	if (!sender?.id || !selfMemberId) return false;
	if (sender.id === selfMemberId) return true;

	const self = thread.members?.find((member) => member.id === selfMemberId);
	const selfContact = self?.contact;
	const senderContact = sender.contact;

	return (
		!!selfContact?.sub &&
		selfContact.sub === senderContact?.sub &&
		selfContact.iss === senderContact?.iss
	);
};
