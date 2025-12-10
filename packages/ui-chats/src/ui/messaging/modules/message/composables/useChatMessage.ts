import { FormatDateMode } from '@webitel/ui-sdk/enums';
import { formatDate } from '@webitel/ui-sdk/utils';
import { Ref, ref } from 'vue';

import { ChatMessageType } from '../../../types/ChatMessage.types';

interface GetMessageResult {
  prevMessage?: ChatMessageType;
  message?: ChatMessageType;
  nextMessage?: ChatMessageType;
}

export const useChatMessages = (chatMessages: ChatMessageType[]) => {
  const messages: Ref<ChatMessageType[]> = ref(chatMessages);

  function showChatDate(index: number): boolean {
    const { prevMessage, message } = getMessage(index);
    return (
      !!prevMessage &&
      formatDate(+prevMessage?.createdAt, FormatDateMode.DATE) !==
        formatDate(+message?.createdAt, FormatDateMode.DATE)
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
