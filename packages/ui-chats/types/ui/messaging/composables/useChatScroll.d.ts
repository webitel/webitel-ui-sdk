import { type ComputedRef, type Ref } from "vue";
import type { ChatMessageType } from "../types/ChatMessage.types";
export declare const useChatScroll: (element: Ref<HTMLElement | null>, messages: Ref<ChatMessageType[]> | ComputedRef<ChatMessageType[]>) => {
    showScrollToBottomBtn: Ref<boolean, boolean>;
    newUnseenMessagesCount: Ref<number, number>;
    scrollToBottom: (behavior?: ScrollBehavior) => void;
    handleChatScroll: () => void;
    handleChatResize: () => void;
};
