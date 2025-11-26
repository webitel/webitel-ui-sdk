export declare const ChatAction: {
    readonly SendMessage: "sendMessage";
    readonly AttachFiles: "attachFiles";
    readonly EmojiPicker: "emojiPicker";
    readonly QuickReplies: "quickReplies";
};
export type ChatAction = (typeof ChatAction)[keyof typeof ChatAction];
export declare const ChatActionSlotsPrefix = "action";
export type SharedActionSlots = {
    [key in `${typeof ChatActionSlotsPrefix}:${ChatAction}`]?: () => any;
};
