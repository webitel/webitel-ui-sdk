import { type Ref } from "vue";
import type { ChatMessageFile } from "../../../types/ChatMessage.types";
export declare function useChatMessageFile(file: ChatMessageFile | Ref<ChatMessageFile>): {
    image: import("vue").ComputedRef<ChatMessageFile>;
    media: import("vue").ComputedRef<ChatMessageFile | {
        id?: string;
        name?: string;
        size?: string;
        mime?: string;
        url?: string;
        streamUrl?: string;
    }>;
    document: import("vue").ComputedRef<ChatMessageFile | {
        id?: string;
        name?: string;
        size?: string;
        mime?: string;
        url?: string;
        streamUrl?: string;
    }>;
};
