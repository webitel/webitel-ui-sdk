import { useScroll } from '@vueuse/core';
import { computed, type ComputedRef, type Ref, ref, watch } from 'vue';

import type { ChatMessageType } from '../types/ChatMessage.types';

export const useChatScroll = (
  element: Ref<HTMLElement | null> = null,
  messages: Ref<ChatMessageType[]> | ComputedRef<ChatMessageType[]>,
) => {
  /* @author ye.pohranichna
  why 136px? because: https://webitel.atlassian.net/browse/WTEL-7136 */
  const defaultThreshold = 136;
  const { arrivedState } = useScroll(element);

  const newUnseenMessagesCount = ref<number>(0);
  const showScrollToBottomBtn = ref<boolean>(false);
  /* @author ye.pohranichna
    the distance where the scrollToBottomBtn must be shown/hide. */
  const threshold = ref<number>(defaultThreshold);

  const isLastMessageIsMy = computed<boolean>(
    () => lastMessage.value?.member?.self,
  );
  const lastMessage = computed<ChatMessageType>(() => messages.value?.at(-1));
  const handleChatScroll = () => {
    const wrapper = element.value;
    if (!wrapper) return;

    handleShowScrollToBottomBtn(wrapper);
  };

  const handleChatResize = () => {
    const wrapper = element.value;
    if (!wrapper) return;

    updateThreshold(wrapper);
    handleShowScrollToBottomBtn(wrapper);
  };

  const handleShowScrollToBottomBtn = (el: HTMLElement) => {
    if (arrivedState.bottom) {
      resetScrollToBottomBtn();
      return;
      /* @author ye.pohranichna
          quit the function because we are already at the bottom */
    }

    const { scrollTop, scrollHeight, clientHeight } = el;
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
    showScrollToBottomBtn.value = distanceFromBottom > threshold.value;
  };

  const resetScrollToBottomBtn = (): void => {
    newUnseenMessagesCount.value = 0;
    showScrollToBottomBtn.value = false;
  };

  const updateThreshold = (el: HTMLElement) => {
    /* @author ye.pohranichna
         need to update if clientHeight was changed
         https://webitel.atlassian.net/browse/WTEL-7136 */
    threshold.value = Math.max(defaultThreshold, el.clientHeight * 0.3);
  };

  const handleBtnAfterNewMessage = () => {
    if (arrivedState.bottom || isLastMessageIsMy.value) {
      scrollToBottom('smooth');
    } else {
      newUnseenMessagesCount.value += 1;
    }
  };

  const scrollToBottom = (behavior: ScrollBehavior = 'instant') => {
    element?.value.scrollTo({
      top: element?.value.scrollHeight,
      behavior: behavior === 'instant' ? 'auto' : behavior,
    });

    newUnseenMessagesCount.value = 0;
    showScrollToBottomBtn.value = false;
  };

  watch(
    () => messages.value?.length,
    (newValue, oldValue) => {
      const newMessageReceived = newValue - oldValue === 1; // when chat have just 1 new message @author ye.pohranichna
      if (newMessageReceived) handleBtnAfterNewMessage();
    },
    {
      flush: 'post',
    },
  );

  return {
    showScrollToBottomBtn,
    newUnseenMessagesCount,
    scrollToBottom,
    handleChatScroll,
    handleChatResize,
  };
};
