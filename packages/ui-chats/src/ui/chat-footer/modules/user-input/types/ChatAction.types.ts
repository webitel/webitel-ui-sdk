export const ChatAction = {
  SendMessage: 'sendMessage',
  AttachFiles: 'attachFiles',
  EmojiPicker: 'emojiPicker',
  QuickReplies: 'quickReplies',
} as const;

export type ChatAction = (typeof ChatAction)[keyof typeof ChatAction];

export const ChatActionSlotsPrefix = 'action';

export type SharedActionSlots = {
  [key in `${typeof ChatActionSlotsPrefix}:${ChatAction}`]?: () => any;
};
