import { type Ref, ref } from 'vue';

export const useScrollToBottomBtn = (
	chatContainer: Ref<HTMLElement | null>,
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

	// Decided from the element's real position, not arrivedState: vueuse updates
	// that after the template's @scroll handler runs, so right after a jump away
	// from the bottom it still says "bottom" and would hide the button. At the
	// bottom the distance is 0, below any threshold, so it hides there anyway.
	const updateScrollToBottomBtnVisibility = (el: HTMLElement) => {
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
