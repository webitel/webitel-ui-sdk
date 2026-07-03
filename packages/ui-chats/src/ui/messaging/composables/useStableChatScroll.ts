import { onUnmounted } from 'vue';
import { type UseChatScrollOptions, useChatScroll } from './useChatScroll';

/**
 * @author PolinaSukhorukova-webitel
 *
 * For layouts where a sibling block (e.g. chat header) renders
 * asynchronously and changes the container height after mount.
 */

export const useStableChatScroll = ({
	element,
	contentElement,
	messages,
	chatId,
	isChatClosed,
	isLoading,
}: UseChatScrollOptions) => {
	let containerResizeObserver: ResizeObserver | null = null;

	const stopContainerObserving = () => {
		containerResizeObserver?.disconnect();
		containerResizeObserver = null;
	};

	/**
	 * @author PolinaSukhorukova-webitel
	 *
	 * Observes the container until its clientHeight stops changing.
	 */
	const observeContainerUntilStable = (
		scrollToBottom: (behavior?: ScrollBehavior) => void,
	) => {
		if (!element.value) return;

		let lastClientHeight = element.value.clientHeight;
		let stableCount = 0;

		containerResizeObserver = new ResizeObserver(() => {
			const currentClientHeight = element.value?.clientHeight;
			scrollToBottom('instant');

			if (currentClientHeight === lastClientHeight) {
				stableCount++;
				if (stableCount >= 2) {
					// height is stable twice in a row — the layout has settled
					stopContainerObserving();
				}
			} else {
				stableCount = 0;
				lastClientHeight = currentClientHeight;
			}
		});

		containerResizeObserver.observe(element.value);
	};

	const {
		showScrollToBottomBtn,
		newUnseenMessagesCount,
		scrollToBottom,
		loadNextMessages,
		handleChatScroll,
	} = useChatScroll({
		element,
		contentElement,
		messages,
		chatId,
		isChatClosed,
		isLoading,
		onBeforeStart: ({ scrollToBottom }) => {
			stopContainerObserving();
			observeContainerUntilStable(scrollToBottom);
		},
	});

	onUnmounted(() => {
		stopContainerObserving();
	});

	return {
		showScrollToBottomBtn,
		newUnseenMessagesCount,
		scrollToBottom,
		loadNextMessages,
		handleChatScroll,
	};
};
