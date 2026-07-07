import { type UseChatScrollOptions, useChatScroll } from './useChatScroll';
import { useOnResizeUntilStable } from './useOnResizeUntilStable';

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
	const { start: startStabilizing, stop: stopStabilizing } =
		useOnResizeUntilStable(element, () => {
			scrollToBottom('instant');
		});

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
		onBeforeStart: () => {
			stopStabilizing();
			startStabilizing();
		},
	});

	return {
		showScrollToBottomBtn,
		newUnseenMessagesCount,
		scrollToBottom,
		loadNextMessages,
		handleChatScroll,
	};
};
