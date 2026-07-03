import { onUnmounted } from 'vue';
import { useChatScroll, type UseChatScrollOptions } from './useChatScroll';

/**
 * @author PolinaSukhorukova-webitel
 *
 * Extends useChatScroll for layouts where a sibling block
 * (e.g. chat header) renders asynchronously and changes the
 * container height after mount. Without this, the initial
 * scrollToBottom fires before the layout settles, so the chat
 * ends up scrolled not quite to the bottom.
 */

export const useChatScrollWithHeader = ({
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
 * Observes the container until its clientHeight stops changing
 * (async sibling is rendered), re-scrolling to the bottom on
 * every resize so the chat stays pinned while the layout settles.
 */
	const observeContainerUntilStable = (scrollToBottom: (behavior?: ScrollBehavior) => void) => {
		if (!element.value) return;

		let lastClientHeight = element.value.clientHeight;
		let stableCount = 0;

		containerResizeObserver = new ResizeObserver(() => {
			const currentClientHeight = element.value?.clientHeight;
			scrollToBottom('instant');

			if (currentClientHeight === lastClientHeight) {
				stableCount++;
				if (stableCount >= 2) {
					/// height is stable twice in a row — the layout has settled
					stopContainerObserving();
				}
			} else {
				stableCount = 0;
				lastClientHeight = currentClientHeight;
			}
		});

		containerResizeObserver.observe(element.value);
	};

	const scroll = useChatScroll({
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

	return scroll;
};