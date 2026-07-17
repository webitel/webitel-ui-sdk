/**
 * Adapters mapping external data sources into the `@webitel/ui-chats`
 * presentation contract (`ChatMessageType`, …).
 *
 * Consuming this entry pulls `@webitel/chat-web-sdk` (declared as an optional
 * peerDependency). The core `@webitel/ui-chats/ui` entry stays free of it.
 */
export { mapMessagesToChatMessages, mapMessageToChatMessage, type ToChatMessageOptions, } from './chat-web-sdk/toChatMessage';
