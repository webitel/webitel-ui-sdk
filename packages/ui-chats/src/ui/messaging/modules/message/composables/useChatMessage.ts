import { FormatDateMode } from "@webitel/ui-sdk/enums";
import { formatDate } from "@webitel/ui-sdk/utils";
import { type ComputedRef, type Ref } from "vue";

import type { ChatMessageType } from "../../../types/ChatMessage.types";

interface GetMessageResult {
	prevMessage?: ChatMessageType;
	message?: ChatMessageType;
	nextMessage?: ChatMessageType;
}

export const useChatMessages = (
	messages: Ref<ChatMessageType[]> | ComputedRef<ChatMessageType[]>,
) => {
	function showChatDate(index: number): boolean {
		const { prevMessage, message } = getMessage(index);
		const prevDate = +prevMessage?.createdAt || 0;
		const currentDate = +message?.createdAt || 0;
		return (
			!!prevMessage &&
			formatDate(prevDate, FormatDateMode.DATE) !==
				formatDate(currentDate, FormatDateMode.DATE)
		);
	}

	const showAvatar = (index: number): boolean => {
		const { prevMessage, message } = getMessage(index);
		return index === 0 || message?.member?.type !== prevMessage?.member?.type;
	};

	function getMessage(index: number): GetMessageResult {
		return {
			prevMessage: messages.value[index - 1],
			message: messages.value[index],
			nextMessage: messages.value[index + 1],
		};
	}

	return {
		showAvatar,
		getMessage,
		showChatDate,
	};
};
