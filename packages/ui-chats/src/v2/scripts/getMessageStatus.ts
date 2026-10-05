import type { ChatMessageStatus, MessageModel, ThreadModel } from '../types';
import { isContactCentreSide } from './isContactCentreSide';
import { isSelfMessage } from './isSelfMessage';
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
	if (!isSelfMessage(message, thread, selfMemberId)) return null;

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

	const horizons = clientStates.map((state) => {
		const read = toSeq(state.readUpToSeq) ?? 0;
		// reading a message implies it was delivered, even if the delivered
		// horizon lags behind
		const delivered = Math.max(toSeq(state.deliveredUpToSeq) ?? 0, read);
		return {
			read,
			delivered,
		};
	});

	if (horizons.every((horizon) => seq <= horizon.read)) return 'read';
	if (horizons.every((horizon) => seq <= horizon.delivered)) return 'delivered';
	return 'sent';
};
