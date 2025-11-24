export const ChatAction = {
  SendMessage: 'sendMessage',
  AttachFiles: 'attachFiles',
  EmojiPicker: 'emojiPicker',
  QuickReplies: 'quickReplies',
} as const;

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
