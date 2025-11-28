export const ChatAction = {
  SendMessage: 'sendMessage',
  AttachFiles: 'attachFiles',
  EmojiPicker: 'emojiPicker',
  QuickReplies: 'quickReplies',
} as const;

export type ChatAction = (typeof ChatAction)[keyof typeof ChatAction];

export type SharedActionSlots = {
  [key in `action:${ChatAction}`]?: () => any;
};
