import mitt from 'mitt';

import type { ChatMessageType } from '../../../types/ui';

export type UiChatsEmitterEvents = {
	insertAtCursor: {
		text: string;
	};
	focusOnTextField: undefined;
	clickChatMessageImage: ChatMessageType;
};

export const createUiChatsEmitter = () => {
	const uiChatsEmitter = mitt<UiChatsEmitterEvents>();

	return uiChatsEmitter;
};
