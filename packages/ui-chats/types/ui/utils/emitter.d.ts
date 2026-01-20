import { ChatMessageType } from "../../../types/ui";
export type UiChatsEmitterEvents = {
    insertAtCursor: {
        text: string;
    };
    focusOnTextField: undefined;
    clickChatMessageImage: ChatMessageType;
};
export declare const createUiChatsEmitter: () => import("mitt").Emitter<UiChatsEmitterEvents>;
