import { type ComputedRef, type Ref } from "vue";
import type { ChatMessageType } from "../../../types/ChatMessage.types";
interface GetMessageResult {
    prevMessage?: ChatMessageType;
    message?: ChatMessageType;
    nextMessage?: ChatMessageType;
}
export declare const useChatMessages: (messages: Ref<ChatMessageType[]> | ComputedRef<ChatMessageType[]>) => {
    showAvatar: (index: number) => boolean;
    getMessage: (index: number) => GetMessageResult;
    showChatDate: (index: number) => boolean;
};
export {};
