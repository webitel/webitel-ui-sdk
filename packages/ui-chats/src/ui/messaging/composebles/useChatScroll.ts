import { useScroll } from "@vueuse/core";
import { computed, type Ref, ref, watch } from "vue";

import type { ChatMessageType } from "../types/ChatMessage.types";

export const useChatScroll = (
	element: Ref<HTMLElement | null> = null,
	chatMessages: ChatMessageType[] = [],
) => {
	const defaultThreshold = 136;
	const { arrivedState } = useScroll(element.value);

	const newUnseenMessages = ref<number>(0);
	const showScrollToBottomBtn = ref<boolean>(false);
	/* @author ye.pohranichna
    the distance where the scrollToBottomBtn must be shown/hide.
    why defaultThreshold=136px? because: https://webitel.atlassian.net/browse/WTEL-7136 */
	const threshold = ref<number>(defaultThreshold);
	const messages = ref<ChatMessageType[]>(chatMessages);

	const lastMessage = computed<ChatMessageType>(
		() => messages.value[messages.value?.length - 1],
	);

	const isLastMessageIsMy = computed<boolean>(() =>
		Boolean(lastMessage.value?.member?.self),
	);

	const scrollToBottom = (behavior: ScrollBehavior = "instant") => {
		element.value?.scrollTo({
			top: element.value?.scrollHeight,
			behavior: behavior === "instant" ? "auto" : behavior,
		});

		newUnseenMessages.value = 0;
		showScrollToBottomBtn.value = false;
	};

	const handleShowScrollToBottomBtn = (el: HTMLElement) => {
		if (arrivedState.bottom && newUnseenMessages.value) {
			/* @author ye.pohranichna
       hide the btn and reset new messages count, when we scroll to the bottom without btn */
			newUnseenMessages.value = 0;
			showScrollToBottomBtn.value = false;
			/* @author ye.pohranichna
        quit the function because we are already at the bottom */
			return;
		}

		const { scrollTop, scrollHeight, clientHeight } = el;
		const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
		showScrollToBottomBtn.value = distanceFromBottom > threshold.value;
	};

	const updateThreshold = (el: HTMLElement) => {
		/* @author ye.pohranichna
      need to update if clientHeight was changed
      https://webitel.atlassian.net/browse/WTEL-7136 */
		threshold.value = Math.max(defaultThreshold, el.clientHeight * 0.3);
	};

	const scrollToBottomAfterNewMessage = () => {
		if (arrivedState.bottom || isLastMessageIsMy.value) {
			scrollToBottom("smooth");
		} else {
			newUnseenMessages.value += 1;
		}
	};
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

	watch(
		() => messages.value?.length,
		(newValue, oldValue) => {
			const newMessageReceived = newValue - oldValue === 1; // when chat have just 1 new message @author ye.pohranichna
			if (newMessageReceived) scrollToBottomAfterNewMessage();
		},
		{
			flush: "post",
		},
	);

	return {
		showScrollToBottomBtn,
		newUnseenMessages,
		scrollToBottom,
		handleChatScroll,
		handleChatResize,
	};
};
