import type { IMessage } from '@webitel/chat-web-sdk';
import type { ChatMessageType } from '../../types';
export interface ToChatMessageOptions {
	/**
	 * Decide whether a message is authored by the current agent / "self" side.
	 * Result is written to `ChatMember.self`, which drives outgoing-bubble
	 * alignment in the UI. The message alone cannot know who "self" is — that
	 * is presentation context the caller owns (e.g. compare `sender.contact`
	 * against the logged-in account).
	 */
	isSelf?: (message: IMessage) => boolean;
}
/**
 * Map a single `@webitel/chat-web-sdk` message (`IMessage`) into the
 * `@webitel/ui-chats` presentation contract (`ChatMessageType`).
 *
 * Anti-corruption layer: keeps `ui-chats` free of any backend/SDK coupling.
 */
export declare const mapMessageToChatMessage: (
	message: IMessage,
	options?: ToChatMessageOptions,
) => ChatMessageType;
/**
 * Batch variant of {@link mapMessageToChatMessage} for message history pages.
 */
export declare const mapMessagesToChatMessages: (
	messages: readonly IMessage[],
	options?: ToChatMessageOptions,
) => ChatMessageType[];
