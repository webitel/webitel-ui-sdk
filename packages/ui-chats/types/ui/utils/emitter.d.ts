export type UiChatsEmitterEvents = {
	insertAtCursor: {
		text: string;
	};
	focusOnTextField: undefined;
};
export declare const createUiChatsEmitter: () => import("mitt").Emitter<UiChatsEmitterEvents>;
