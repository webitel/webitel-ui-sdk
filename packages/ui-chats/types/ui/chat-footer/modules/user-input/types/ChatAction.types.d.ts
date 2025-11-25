export declare const ChatAction: {
    readonly SendMessage: "sendMessage";
    readonly AttachFiles: "attachFiles";
    readonly EmojiPicker: "emojiPicker";
    readonly QuickReplies: "quickReplies";
};
export type ChatAction = (typeof ChatAction)[keyof typeof ChatAction];
export type SendMessageChatActionEmits = {
    'click': [];
};
export type AttachFilesChatActionEmits = {
    'attachFiles': [files: File[]];
};
export type ChatActionsBarEmits = {
    'action:sendMessage': SendMessageChatActionEmits['click'];
    'action:attachFiles': AttachFilesChatActionEmits['attachFiles'];
};
export type SharedActionSlots = {
    [key in ChatAction]: () => any;
};
