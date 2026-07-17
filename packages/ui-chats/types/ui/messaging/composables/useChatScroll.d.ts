import { type ComputedRef, type Ref } from 'vue';
import type { ChatMessageType } from '../types/ChatMessage.types';
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
export declare const useChatScroll: ({
	chatContainer,
	chatContent,
	messages,
	chatId,
	isChatClosed,
	isLoading,
	onBeforeStart,
}: UseChatScrollOptions) => {
	showScrollToBottomBtn: Ref<boolean, boolean>;
	newUnseenMessagesCount: Ref<number, number>;
	scrollToBottom: (behavior?: ScrollBehavior) => void;
	loadNextMessages: (
		canLoadMore: boolean,
		onLoadNextMessages: () => void,
	) => void;
	handleChatScroll: () => void;
};
