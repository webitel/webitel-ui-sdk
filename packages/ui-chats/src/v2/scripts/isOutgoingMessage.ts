import type { MessageModel, ThreadModel } from '../types';
import { isContactCentreSide } from './isContactCentreSide';
import { isSelfMessage } from './isSelfMessage';

/**
 * A thread with no client in it: every member is an operator or a bot, as in
 * a chat between colleagues. A thread whose members are not known is not
 * taken for one.
 */
export const isInternalThread = (thread: ThreadModel): boolean => {
	const members = thread.members ?? [];

	return members.length > 0 && members.every(isContactCentreSide);
};

/**
 * Which side of the history a message sits on. With a client in the thread,
 * everyone who speaks for the contact centre (operators, bots) shares the
 * operator's side against the client. Between colleagues there is no such
 * opposition, so only the operator using the UI sits on it.
 */
export const isOutgoingMessage = (
	message: MessageModel,
	thread: ThreadModel,
	selfMemberId: string,
): boolean =>
	isInternalThread(thread)
		? isSelfMessage(message, thread, selfMemberId)
		: isContactCentreSide(message.sender);
