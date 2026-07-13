/**
 * Public data contract of `@webitel/ui-chats`.
 *
 * These are the plain, transport-agnostic shapes the UI components accept.
 * External data sources (e.g. `@webitel/chat-web-sdk`) must be mapped into
 * them — see `@webitel/ui-chats/adapters`.
 */
export type {
	ChatMember,
	ChatMessageChatInfo,
	ChatMessageFile,
	ChatMessageType,
	ChatVia,
	ContactInfo,
} from '../ui/messaging/types/ChatMessage.types';
