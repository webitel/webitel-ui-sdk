import type { MessageModel, ThreadModel } from '@webitel/chat-web-sdk';

export type { MessageModel, ThreadModel };

export const ChatThreadMode = {
	/** offered to the operator, not accepted yet: no composer, waiting line */
	Awaiting: 'awaiting',
	Active: 'active',
	/** closed or otherwise not writable: no composer */
	Readonly: 'readonly',
} as const;

export type ChatThreadMode =
	(typeof ChatThreadMode)[keyof typeof ChatThreadMode];

export const ChatComposerAction = {
	Attach: 'attach',
	Emoji: 'emoji',
	Send: 'send',
} as const;

export type ChatComposerAction =
	(typeof ChatComposerAction)[keyof typeof ChatComposerAction];

export type ChatMessageStatus = 'sent' | 'delivered' | 'read';

export type ChatNoticeTone = 'positive' | 'neutral' | 'negative';

/** A thread member as it arrives on `message.sender` and `thread.members[]`. */
export type ChatParticipant = NonNullable<MessageModel['sender']>;

export type ChatImage = NonNullable<MessageModel['images']>[number];

export type ChatDocument = NonNullable<MessageModel['documents']>[number];

export type ResolveAvatarUrl = (member: ChatParticipant) => string | undefined;

export type ChatSendHandler = (text: string) => Promise<unknown>;

export type ChatAttachHandler = (files: File[]) => Promise<unknown>;

export type ChatLoadMoreHandler = () => Promise<unknown>;

export interface ChatComposerSlotProps {
	/** inserts at the cursor (or appends) and updates the draft */
	insertText: (text: string) => void;
	focus: () => void;
	disabled: boolean;
}

export interface ChatHistoryProps {
	thread: ThreadModel;
	/** oldest → newest; current and earlier sessions */
	messages: MessageModel[];
	/** thread-member id of the operator using the UI */
	selfMemberId: string;
	mode?: ChatThreadMode;
	hasMore?: boolean;
	onLoadMore?: ChatLoadMoreHandler;
	resolveAvatarUrl?: ResolveAvatarUrl;
}

export interface ChatComposerProps {
	onSend?: ChatSendHandler;
	onAttach?: ChatAttachHandler;
	actions?: ChatComposerAction[];
	submitOnEnter?: boolean;
	disabled?: boolean;
}

export interface ChatThreadProps extends ChatHistoryProps, ChatComposerProps {
	/** controlled draft (v-model:draft); omit to let the composer own it */
	draft?: string;
}
