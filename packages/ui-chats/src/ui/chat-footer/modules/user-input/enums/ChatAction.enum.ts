export const ChatAction = {
	SendMessage: 'sendMessage',
	AttachFiles: 'attachFiles',
	EmojiPicker: 'emojiPicker',
	QuickReplies: 'quickReplies',
	LoadNextMessages: 'loadNextMessages',
} as const;

export type ChatAction = (typeof ChatAction)[keyof typeof ChatAction];

export type SharedActionSlots = {
	[key in `action:${ChatAction}`]?: () => unknown;
};

/** slots `chat-input-actions-bar` itself exposes, keyed by the bare action name */
export type ChatActionSlots = {
	[key in ChatAction]?: (props: Record<string, unknown>) => unknown;
};
