import { useResizeObserver, useScroll } from '@vueuse/core';
import {
	type ComputedRef,
	computed,
	nextTick,
	onUnmounted,
	type Ref,
	ref,
	watch,
} from 'vue';

import type { ChatMessageType } from '../types/ChatMessage.types';

import { useScrollToBottomBtn } from './useScrollToBottomBtn';

export interface UseChatScrollOptions {
	chatContainer: Ref<HTMLElement | null>;
	chatContent: Ref<HTMLElement | null>;
	messages: Ref<ChatMessageType[]> | ComputedRef<ChatMessageType[]>;
	chatId: ComputedRef<string>;
	isChatClosed: ComputedRef<boolean>;
	isLoading?: Ref<boolean> | ComputedRef<boolean>;
	onBeforeStart?: (options: {
		scrollToBottom: (behavior?: ScrollBehavior) => void;
	}) => void;
}

export const useChatScroll = ({
	chatContainer,
	chatContent,
	messages,
	chatId,
	isChatClosed,
	isLoading,
	onBeforeStart = (options) => {
		options.scrollToBottom();
	},
}: UseChatScrollOptions) => {
	const { arrivedState } = useScroll(chatContainer);

	const {
		showScrollToBottomBtn,
		handleChatScroll,
		resetScrollToBottomBtn,
		updateScrollToBottomBtnVisibility,
		updateThreshold,
	} = useScrollToBottomBtn(chatContainer, arrivedState);

	/* height of a message + gap */
	const nearBottomOffset = 48;
	let isLoadingNextMessages = false;
	let lastVisibleMessageEl: HTMLElement | null = null;
	let prevScrollHeight = 0;
	let resizeObserver: ResizeObserver | null = null;

	const newUnseenMessagesCount = ref(0);

	const lastMessage = computed(() => messages.value?.at(-1));
	const isLastMessageMy = computed(() => !!lastMessage.value?.member?.self);

	const handleBtnAfterNewMessage = () => {
		if (isLastMessageMy.value) {
			scrollToBottom('instant');
		} else if (!arrivedState.bottom) {
			newUnseenMessagesCount.value += 1;
		}
	};

	const scrollToBottom = (behavior: ScrollBehavior = 'instant') => {
		chatContainer.value?.scrollTo({
			top: chatContainer.value?.scrollHeight,
			behavior,
		});

		newUnseenMessagesCount.value = 0;

		resetScrollToBottomBtn();
	};
	const getTopMessageEl = () => {
		// help to fix chat viewing position when new messages was loaded
		if (!chatContainer.value?.children) return;
		lastVisibleMessageEl =
			(chatContainer.value?.getElementsByClassName(
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

	const startStickToBottomObserving = () => {
		if (!chatContent.value) return;

		prevScrollHeight = chatContainer.value?.scrollHeight ?? 0;

		resizeObserver = new ResizeObserver(() => {
			const el = chatContainer.value;
			if (!el) return;

			const newScrollHeight = el.scrollHeight;

			const distanceFromBottom =
				prevScrollHeight - (el.scrollTop + el.clientHeight);
			const wasNearBottom = distanceFromBottom <= nearBottomOffset;
			const contentGrown = newScrollHeight > prevScrollHeight;

			/**
			 * @author PolinaSukhorukova-webitel
			 *
			 * arrivedState.bottom lags after programmatic scrollTo,
			 * so the distance is also checked manually.
			 */
			const shouldScrollToBottom =
				contentGrown && (arrivedState.bottom || wasNearBottom);

			if (shouldScrollToBottom) {
				scrollToBottom('instant');
			}

			prevScrollHeight = newScrollHeight;
			updateScrollToBottomBtnVisibility(el);
		});

		resizeObserver.observe(chatContent.value);
	};

	const stopStickToBottomObserving = () => {
		resizeObserver?.disconnect();
		resizeObserver = null;
	};

	useResizeObserver(chatContainer, () => {
		const el = chatContainer.value;
		if (!el) return;

		updateThreshold(el.clientHeight);
		updateScrollToBottomBtnVisibility(el);
	});

	const resetScrollState = () => {
		stopStickToBottomObserving();
		prevScrollHeight = 0;
		newUnseenMessagesCount.value = 0;
		resetScrollToBottomBtn();
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

			chatContainer.value?.scrollTo({
				top: lastVisibleMessageEl?.offsetTop,
				behavior: 'auto',
			});

			isLoadingNextMessages = false;
		},
	);

	watch(
		() => chatId.value,
		async () => {
			resetScrollState();

			if (isChatClosed.value) return;

			await nextTick();

			onBeforeStart?.({
				scrollToBottom,
			});

			startStickToBottomObserving();
		},
		{
			immediate: true,
		},
	);

	onUnmounted(() => {
		stopStickToBottomObserving();
	});

	return {
		showScrollToBottomBtn,
		newUnseenMessagesCount,
		scrollToBottom,
		loadNextMessages,
		handleChatScroll,
	};
};
