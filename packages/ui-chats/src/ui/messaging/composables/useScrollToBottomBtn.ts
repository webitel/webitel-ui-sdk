import type { UseScrollReturn } from '@vueuse/core';
import { type Ref, ref } from 'vue';

export const useScrollToBottomBtn = (
	chatContainer: Ref<HTMLElement | null>,
	arrivedState: UseScrollReturn['arrivedState'],
) => {
	const newUnseenMessagesCount = ref(0);
	const showScrollToBottomBtn = ref(false);
	/* @author ye.pohranichna
	why 136px? because: https://webitel.atlassian.net/browse/WTEL-7136 */
	const defaultThreshold = 136;
	/* @author ye.pohranichna
	the distance where the scrollToBottomBtn must be shown/hide. */
	const threshold = ref(136);

	const handleChatScroll = () => {
		const wrapper = chatContainer.value;
		if (!wrapper) return;

		handleShowScrollToBottomBtn(wrapper);
	};

	const resetScrollToBottomBtn = () => {
		newUnseenMessagesCount.value = 0;
		showScrollToBottomBtn.value = false;
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

	const updateThreshold = (clientHeight: number) => {
		threshold.value = Math.max(defaultThreshold, clientHeight * 0.3);
	};

	return {
		newUnseenMessagesCount,
		showScrollToBottomBtn,
		handleChatScroll,
		resetScrollToBottomBtn,
		handleShowScrollToBottomBtn,
		updateThreshold,
	};
};
