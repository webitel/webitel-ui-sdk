import type { UseScrollReturn } from '@vueuse/core';
import { type Ref, ref } from 'vue';

export const useScrollToBottomBtn = (
	chatContainer: Ref<HTMLElement | null>,
	arrivedState: UseScrollReturn['arrivedState'],
) => {
	const showScrollToBottomBtn = ref(false);
	/* @author ye.pohranichna
	why 136px? because: https://webitel.atlassian.net/browse/WTEL-7136 */
	const defaultThreshold = 136;
	/* @author ye.pohranichna
	the distance where the scrollToBottomBtn must be shown/hide. */
	const threshold = ref(defaultThreshold);

	const handleChatScroll = () => {
		const wrapper = chatContainer.value;
		if (!wrapper) return;

		updateScrollToBottomBtnVisibility(wrapper);
	};

	const resetScrollToBottomBtn = () => {
		showScrollToBottomBtn.value = false;
	};

	const updateScrollToBottomBtnVisibility = (el: HTMLElement) => {
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
		showScrollToBottomBtn,
		handleChatScroll,
		resetScrollToBottomBtn,
		updateScrollToBottomBtnVisibility,
		updateThreshold,
	};
};
