import mitt from "mitt";

export type UiChatsEmitterEvents = {
    insertAtCursor: { text: string };
    focusOnTextField: undefined;
};

export const createUiChatsEmitter = () => {
    const uiChatsEmitter = mitt<UiChatsEmitterEvents>();

    return uiChatsEmitter;
};