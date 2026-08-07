import {
	getCasesChatCatalog,
	getContactsChatCatalog,
} from '@webitel/api-services/gen';
import { applyTransform, notify, snakeToCamel } from '../../transformers';

const mergeChatMessagesData = ({ messages, peers }) => {
	if (!messages) return [];
	return messages.map(({ from, ...message }) => {
		return {
			...message,
			peer: peers[from.id - 1],
		};
	});
};

const buildGetChatHistory =
	(getChatHistory) =>
	async ({ parentId, taskId }) => {
		try {
			const response = await getChatHistory(parentId, taskId);
			const { messages, peers } = applyTransform(response.data, [
				snakeToCamel(),
			]);
			return {
				items: applyTransform(
					{
						messages,
						peers,
					},
					[
						mergeChatMessagesData,
					],
				),
			};
		} catch (err) {
			throw applyTransform(err, [
				notify,
			]);
		}
	};

export const ChatMessagesHistoryAPI = {
	getContactChatHistory: buildGetChatHistory((contactId, chatId) =>
		getContactsChatCatalog().contactsChatCatalogGetContactChatHistory(
			contactId,
			chatId,
		),
	),
	getCaseChatHistory: buildGetChatHistory((caseId, chatId) =>
		getCasesChatCatalog().casesChatCatalogGetCaseChatHistory(caseId, chatId),
	),
};
