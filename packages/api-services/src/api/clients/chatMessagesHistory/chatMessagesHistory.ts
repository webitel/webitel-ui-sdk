import { getCasesChatCatalog, getContactsChatCatalog } from '../../../gen-wire';
import { applyTransform, notify, snakeToCamel } from '../../transformers';
import type { ApiId, ApiParams } from '../_shared/types';

const mergeChatMessagesData = ({
	messages,
	peers,
}: {
	messages: ApiParams[];
	peers: ApiParams[];
}) => {
	if (!messages) return [];
	return messages.map(({ from, ...message }) => {
		return {
			...message,
			peer: from && peers ? peers[from.id - 1] : undefined,
		};
	});
};

const buildGetChatHistory =
	(
		getChatHistory: (
			parentId: string,
			taskId: string,
		) => Promise<{
			data: ApiParams;
		}>,
	) =>
	async ({ parentId, taskId }: { parentId: ApiId; taskId: ApiId }) => {
		try {
			const response = await getChatHistory(String(parentId), String(taskId));
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
