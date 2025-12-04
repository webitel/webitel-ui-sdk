import { useScroll } from '@vueuse/core';
import { computed, type ComputedRef, type Ref, ref, watch } from 'vue';

import { ChatMessageType } from '../types/ChatMessage.types';

export const useChatScroll = (
  element: Ref<HTMLElement | null> = null,
  chatMessages: ChatMessageType[] = [],
) => {
  const { arrivedState } = useScroll(element);

  const newUnseenMessages = ref<number>(0);
  const showScrollToBottomBtn = ref<boolean>(false);
  const threshold = ref<number>(136);
  const messages = ref<ChatMessageType[]>(chatMessages);

  const lastMessage: ComputedRef<ChatMessageType | undefined> = computed(
    () => messages.value[messages.value?.length - 1],
  );

  const isLastMessageIsMy: ComputedRef<boolean> = computed(() =>
    Boolean(lastMessage.value?.member?.self),
  );

  const scrollToBottom = (behavior: ScrollBehavior = 'instant') => {
    element.value?.scrollTo({
      top: element.value?.scrollHeight,
      behavior: behavior === 'instant' ? 'auto' : behavior,
    });

    newUnseenMessages.value = 0;
    showScrollToBottomBtn.value = false;
  };

  const scrollAfterNewMessage = () => {
    if (arrivedState.bottom || isLastMessageIsMy.value) {
      scrollToBottom('smooth');
    } else {
      newUnseenMessages.value += 1;
    }
  };

  const handleShowScrollToBottom = (el: HTMLElement) => {
    if (arrivedState.bottom && newUnseenMessages.value) {
      newUnseenMessages.value = 0;
      showScrollToBottomBtn.value = false;
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = el;
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
    const shouldShowBtn = distanceFromBottom > threshold.value;

    if (showScrollToBottomBtn.value !== shouldShowBtn) {
      showScrollToBottomBtn.value = shouldShowBtn;
    }
  };

  const updateThreshold = (el: HTMLElement) => {
    threshold.value = Math.max(136, el.clientHeight * 0.3);
  };
  const handleChatScroll = () => {
    const wrap = element.value;
    if (!wrap) return;

    handleShowScrollToBottom(wrap);
  };

  const handleChatResize = () => {
    const wrap = element.value;
    if (!wrap) return;

    updateThreshold(wrap);
    handleShowScrollToBottom(wrap);
  };

  watch(
    () => messages.value?.length,
    (newValue, oldValue) => {
      const newMessageReceived = newValue - oldValue === 1;
      if (newMessageReceived) scrollAfterNewMessage();
    },
    { flush: 'post' },
  );

  return {
    showScrollToBottomBtn,
    newUnseenMessages,
    scrollToBottom,
    handleChatScroll,
    handleChatResize,
  };
};
