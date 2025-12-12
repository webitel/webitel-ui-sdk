export declare const ChatAction: {
	readonly SendMessage: "sendMessage";
	readonly AttachFiles: "attachFiles";
	readonly EmojiPicker: "emojiPicker";
	readonly QuickReplies: "quickReplies";
};
export type ChatAction = (typeof ChatAction)[keyof typeof ChatAction];
export type SharedActionSlots = {
	[key in `action:${ChatAction}`]?: () => any;
};
