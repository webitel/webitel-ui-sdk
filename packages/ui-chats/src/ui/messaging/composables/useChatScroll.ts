import { useScroll } from '@vueuse/core';
import {
	type ComputedRef,
	computed,
	nextTick,
	onUnmounted,
	type Ref,
	watch,
} from 'vue';

import type { ChatMessageType } from '../types/ChatMessage.types';

import { useScrollButton } from './useScrollButton';

export interface UseChatScrollOptions {
	element: Ref<HTMLElement | null>;
	contentElement: Ref<HTMLElement | null>;
	messages: Ref<ChatMessageType[]> | ComputedRef<ChatMessageType[]>;
	chatId: ComputedRef<string>;
	isChatClosed: ComputedRef<boolean>;
	isLoading?: Ref<boolean> | ComputedRef<boolean>;
	onBeforeStart?: (options: {
		scrollToBottom: (behavior?: ScrollBehavior) => void;
	}) => void;
}

export const useChatScroll = ({
	element,
	contentElement,
	messages,
	chatId,
	isChatClosed,
	isLoading,
	onBeforeStart = (options) => {
		options.scrollToBottom();
	},
}: UseChatScrollOptions) => {
	const { arrivedState } = useScroll(element);

	const {
		newUnseenMessagesCount,
		showScrollToBottomBtn,
		threshold,
		resetScrollToBottomBtn,
		handleShowScrollToBottomBtn,
		handleChatScroll,
	} = useScrollButton(element, arrivedState);

	/* @author ye.pohranichna
		why 136px? because: https://webitel.atlassian.net/browse/WTEL-7136 */
	const defaultThreshold = 136;
	let isLoadingNextMessages = false;
	let lastVisibleMessageEl: HTMLElement | null = null;
	let prevScrollHeight = 0;
	let resizeObserver: ResizeObserver | null = null;

	const isLastMessageIsMy = computed<boolean>(
		() => lastMessage.value?.member?.self,
	);
	const lastMessage = computed<ChatMessageType>(() => messages.value?.at(-1));

	const handleBtnAfterNewMessage = () => {
		if (isLastMessageIsMy.value) {
			scrollToBottom('instant');
		} else if (!arrivedState.bottom) {
			newUnseenMessagesCount.value += 1;
		}
	};

	const scrollToBottom = (behavior: ScrollBehavior = 'instant') => {
		element.value?.scrollTo({
			top: element.value?.scrollHeight,
			behavior,
		});

		resetScrollToBottomBtn();
	};
	const getTopMessageEl = () => {
		// help to fix chat viewing position when new messages was loaded
		if (!element.value?.children) return;
		lastVisibleMessageEl =
			(element.value?.getElementsByClassName(
				'chat-message',
			)[0] as HTMLElement) ?? null;
	};

	const loadNextMessages = (
		canLoadMore: boolean,
		onLoadNextMessages: () => void,
	) => {
		if (isLoadingNextMessages || isLoading?.value || !canLoadMore) return;

		isLoadingNextMessages = true;
		getTopMessageEl();

		onLoadNextMessages();
	};

	/**
	 * @author PolinaSukhorukova-webitel
	 *
	 * Keeps the chat pinned to the bottom when content height grows
	 * asynchronously (media load).
	 */
	const startObserving = () => {
		if (!contentElement.value) return;

		prevScrollHeight = element.value?.scrollHeight ?? 0;

		resizeObserver = new ResizeObserver(() => {
			const el = element.value;
			if (!el) return;

			const newScrollHeight = el.scrollHeight;

			threshold.value = Math.max(defaultThreshold, el.clientHeight * 0.3);

			/*
			 * @author PolinaSukhorukova-webitel
			 *
			 * `arrivedState.bottom` lags after programmatic scrollTo and may
			 * read `false` while the user is actually at the bottom, so the
			 * distance is calculated manually as a fallback.
			 * 48px is the height of a message + gap
			 */
			const wasNearBottom =
				prevScrollHeight - (el.scrollTop + el.clientHeight) <= 48;

			if (
				newScrollHeight > prevScrollHeight &&
				(arrivedState.bottom || wasNearBottom)
			) {
				scrollToBottom('instant');
			}

			prevScrollHeight = newScrollHeight;
			handleShowScrollToBottomBtn(el);
		});

		resizeObserver.observe(contentElement.value);
	};

	const stopObserving = () => {
		resizeObserver?.disconnect();
		resizeObserver = null;
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

	watch(
		() => isLoading?.value,
		async (loading) => {
			// restore scroll position after older messages are prepended:
			// scroll to the previously top message so the view doesn't jump
			if (loading || !isLoadingNextMessages) return;

			await nextTick();

			element.value?.scrollTo({
				top: lastVisibleMessageEl?.offsetTop,
				behavior: 'auto',
			});

			isLoadingNextMessages = false;
		},
	);

	watch(
		() => chatId.value,
		async () => {
			stopObserving();

			prevScrollHeight = 0;
			resetScrollToBottomBtn();

			if (isChatClosed.value) return;

			await nextTick();

			onBeforeStart?.({
				scrollToBottom,
			});

			startObserving();
		},
		{
			immediate: true,
		},
	);

	onUnmounted(() => {
		stopObserving();
	});

	return {
		showScrollToBottomBtn,
		newUnseenMessagesCount,
		scrollToBottom,
		loadNextMessages,
		handleChatScroll,
	};
};
