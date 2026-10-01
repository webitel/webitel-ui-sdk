import type { ChatMessageStatus, MessageModel, ThreadModel } from '../types';
import { isContactCentreSide } from './isContactCentreSide';
import { toSeq } from './toTimestamp';

/**
 * Sent / delivered / read for the operator's own messages, against the
 * client's read horizon: the lowest horizon over every client member, so a
 * message counts as read only once all clients have read it.
 * `null` when no ticks should show.
 */
export const getMessageStatus = (
	message: MessageModel,
	thread: ThreadModel,
	selfMemberId: string,
): ChatMessageStatus | null => {
	if (message.deleted || message.system) return null;
	if (!message.sender?.id || message.sender.id !== selfMemberId) return null;

	const seq = toSeq(message.seq);
	if (seq === null) return 'sent';

	const membersById = new Map(
		(thread.members ?? []).flatMap((member) =>
			member.id
				? [
						[
							member.id,
							member,
						] as const,
					]
				: [],
		),
	);

	const clientStates = (thread.readStates ?? []).filter((state) => {
		const member =
			state.member ??
			(state.memberId ? membersById.get(state.memberId) : undefined);
		return member !== undefined && !isContactCentreSide(member);
	});

	if (!clientStates.length) return 'sent';

	const readUpTo = Math.min(
		...clientStates.map((state) => toSeq(state.readUpToSeq) ?? 0),
	);
	const deliveredUpTo = Math.min(
		...clientStates.map((state) => toSeq(state.deliveredUpToSeq) ?? 0),
	);

	if (seq <= readUpTo) return 'read';
	// a read horizon implies delivery even if the delivered one lags behind
	if (seq <= Math.max(deliveredUpTo, readUpTo)) return 'delivered';
	return 'sent';
};
