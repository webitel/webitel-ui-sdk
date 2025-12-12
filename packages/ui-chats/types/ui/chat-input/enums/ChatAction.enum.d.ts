export declare const ChatAction: {
    readonly SendMessage: "sendMessage";
    readonly AttachFiles: "attachFiles";
    readonly EmojiPicker: "emojiPicker";
};
export type ChatAction = (typeof ChatAction)[keyof typeof ChatAction];
