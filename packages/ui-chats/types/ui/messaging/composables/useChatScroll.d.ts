import { type ComputedRef, type Ref } from 'vue';
import type { ChatMessageType } from '../types/ChatMessage.types';
export declare const useChatScroll: (
	element: Ref<HTMLElement | null>,
	messages: Ref<ChatMessageType[]> | ComputedRef<ChatMessageType[]>,
	isLoading?: Ref<boolean> | ComputedRef<boolean>,
) => {
	showScrollToBottomBtn: Ref<boolean, boolean>;
	newUnseenMessagesCount: Ref<number, number>;
	scrollToBottom: (behavior?: ScrollBehavior) => void;
	loadNextMessages: (
		canLoadMore: boolean | undefined,
		onLoadNextMessages: () => void,
	) => void;
	handleChatScroll: () => void;
	handleChatResize: () => void;
};
