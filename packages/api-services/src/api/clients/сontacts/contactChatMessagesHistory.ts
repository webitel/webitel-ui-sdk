import { ContactsChatCatalogApiFactory } from 'webitel-sdk';

import {
	getDefaultGetListResponse,
	getDefaultInstance,
	getDefaultOpenAPIConfig,
} from '../../defaults';
import {
	applyTransform,
	merge,
	notify,
	snakeToCamel,
} from '../../transformers';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const contactChatService = ContactsChatCatalogApiFactory(
	configuration,
	'',
	instance,
);

const getChat = async ({ contactId, chatId }) => {
	const mergeChatMessagesData = ({ messages, peers }) => {
		if (!messages) return [];
		return messages.map(({ from, ...message }) => {
			return {
				...message,
				peer: peers[from.id - 1],
			};
		});
	};

	try {
		const response = await contactChatService.getContactChatHistory(
			contactId,
			chatId,
		);
		const { messages, peers } = applyTransform(response.data, [snakeToCamel()]);
		return {
			items: applyTransform({ messages, peers }, [mergeChatMessagesData]),
			peers,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

// all messages from all contacts chats
const getAllMessages = async (params) => {
	const mergeMessagesData = ({ messages, peers, chats }) => {
		if (!messages) return [];
		return messages.map(({ from, chat, ...message }) => {
			return {
				...message,
				peer: peers[from.id - 1],
				chat: chats[chat.id - 1],
			};
		});
	};

	const { contactId, page, size } = params;

	try {
		const response = await contactChatService.getContactChatHistory2(
			contactId,
			undefined,
			undefined,
			size,
			`${page || 1}`,
		);
		const { messages, peers, chats, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform({ messages, peers, chats }, [mergeMessagesData]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify(({ callback }) =>
				callback({
					type: 'error',
					text: 'errorNotifications.chatHistoryApi',
				}),
			),
		]);
	}
};

export const ContactChatMessagesAPI = {
	getChat,
	getAllMessages,
};
