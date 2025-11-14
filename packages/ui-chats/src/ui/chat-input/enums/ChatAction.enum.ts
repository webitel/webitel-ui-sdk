export const ChatAction = {
  SendMessage: 'sendMessage',
  AttachFiles: 'attachFiles',
  EmojiPicker: 'emojiPicker',
} as const;

export type ChatAction = (typeof ChatAction)[keyof typeof ChatAction];
