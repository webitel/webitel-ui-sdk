import { Ref, ref } from 'vue';

import { ChatMessageType } from '../../../types/ChatMessage.types';
import prettifyDate from '../script/prettifyDate';

interface GetMessageResult {
  prevMessage?: ChatMessageType | undefined;
  message?: ChatMessageType | undefined;
  nextMessage?: ChatMessageType | undefined;
}

export interface UseChatMessagesReturn {
  showAvatar: (index: number) => boolean;
  getMessage: (index: number) => GetMessageResult;
  showChatDate: (index: number) => boolean;
}

export const useChatMessages = (
  chatMessages: ChatMessageType[],
): UseChatMessagesReturn => {
  const messages: Ref<ChatMessageType[]> = ref(chatMessages);

  function showChatDate(index: number): boolean {
    const { prevMessage, message } = getMessage(index);
    return (
      !!prevMessage &&
      prettifyDate(prevMessage?.createdAt) !== prettifyDate(message?.createdAt)
    );
  }

  const showAvatar = (index: number): boolean => {
    const { prevMessage, message } = getMessage(index);
    return index === 0 || message?.member?.type !== prevMessage?.member?.type;
  };

  function getMessage(index: number): GetMessageResult {
    return {
      prevMessage: messages.value[index - 1],
      message: messages.value[index],
      nextMessage: messages.value[index + 1],
    };
  }

  return {
    showAvatar,
    getMessage,
    showChatDate,
  };
};
