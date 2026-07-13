import type { IMessage } from '@webitel/chat-web-sdk';

import type { ChatMember, ChatMessageFile, ChatMessageType } from '../../types';

/**
 * Sub-shapes of a chat-web-sdk message, derived via indexed access so this
 * adapter depends on a single package (`@webitel/chat-web-sdk`) and stays in
 * sync automatically when the SDK reshapes them.
 */
type SdkMember = NonNullable<IMessage['sender']>;
type SdkImage = NonNullable<IMessage['images']>[number];
type SdkDocument = NonNullable<IMessage['documents']>[number];

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
 * Parse a chat-web-sdk Unix-ms timestamp (`string`) into the numeric ms the
 * UI contract expects. Returns `0` for missing / non-numeric input.
 */
const toTimestamp = (value: string | undefined): number => {
	if (value == null) return 0;
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : 0;
};

const mapImage = (image: SdkImage): ChatMessageFile => ({
	id: image.id,
	mime: image.mime,
	url: image.url,
});

const mapDocument = (document: SdkDocument): ChatMessageFile => ({
	id: document.id,
	name: document.name,
	size: document.size,
	mime: document.mime,
	url: document.url,
});

/**
 * A UI message carries at most one `file`, while the SDK exposes separate
 * `images[]` / `documents[]` arrays. Pick the first available attachment,
 * preferring images.
 */
const mapAttachment = (message: IMessage): ChatMessageFile | undefined => {
	const image = message.images?.[0];
	if (image) return mapImage(image);

	const document = message.documents?.[0];
	if (document) return mapDocument(document);

	return undefined;
};

const mapMember = (
	sender: SdkMember | undefined,
	self: boolean | undefined,
): ChatMember => {
	const contact = sender?.contact;

	return {
		id: sender?.id ?? '',
		name: contact?.name ?? '',
		// UI derives bot rendering from `type === 'bot'`; otherwise keep the
		// SDK channel type ('telegram', 'webchat', …).
		type: contact?.isBot ? 'bot' : (contact?.type ?? ''),
		externalId: contact?.sub ?? contact?.iss,
		self,
	};
};

/**
 * Map a single `@webitel/chat-web-sdk` message (`IMessage`) into the
 * `@webitel/ui-chats` presentation contract (`ChatMessageType`).
 *
 * Anti-corruption layer: keeps `ui-chats` free of any backend/SDK coupling.
 */
export const mapMessageToChatMessage = (
	message: IMessage,
	options: ToChatMessageOptions = {},
): ChatMessageType => {
	const createdAt = toTimestamp(message.createdAt);

	return {
		id: message.id,
		text: message.body,
		createdAt,
		date: createdAt,
		updatedAt: message.editedAt ? toTimestamp(message.editedAt) : undefined,
		file: mapAttachment(message),
		member: mapMember(message.sender, options.isSelf?.(message)),
	};
};

/**
 * Batch variant of {@link mapMessageToChatMessage} for message history pages.
 */
export const mapMessagesToChatMessages = (
	messages: readonly IMessage[],
	options?: ToChatMessageOptions,
): ChatMessageType[] =>
	messages.map((message) => mapMessageToChatMessage(message, options));
