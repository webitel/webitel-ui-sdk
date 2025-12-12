import { type Ref } from "vue";
import { ChatMessageType } from "../types/ChatMessage.types";
export declare const useChatScroll: (
	element?: Ref<HTMLElement | null>,
	chatMessages?: ChatMessageType[],
) => {
	showScrollToBottomBtn: Ref<boolean, boolean>;
	newUnseenMessages: Ref<number, number>;
	scrollToBottom: (behavior?: ScrollBehavior) => void;
	handleChatScroll: () => void;
	handleChatResize: () => void;
};
