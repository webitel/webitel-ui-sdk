import { getAgentChatService } from '@webitel/api-services/gen';
import { getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
} from '../../transformers';

const getChatsList = async (params) => {
	const { size, page, onlyClosed, onlyUnprocessed } = applyTransform(params, [
		merge(getDefaultGetParams()),
	]);

	try {
		const response = await getAgentChatService().agentChatServiceGetAgentChats({
			size,
			page,
			onlyClosed,
			onlyUnprocessed,
		});
		const { items, next } = applyTransform(response.data, [snakeToCamel()]);
		return {
			items,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getChatCount = async (params) => {
	const fieldsToSend = ['only_closed', 'only_unprocessed'];
	const requestParams = applyTransform(params, [
		camelToSnake(),
		merge(getDefaultGetParams()),
		sanitize(fieldsToSend),
	]);

	try {
		const response =
			await getAgentChatService().agentChatServiceGetAgentChatsCounter(
				requestParams,
			);
		const { count } = applyTransform(response.data, [snakeToCamel()]);
		return count;
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const markChatProcessed = async (chatId) => {
	// add to chat unprocessedClose: true
	try {
		const response =
			await getAgentChatService().agentChatServiceMarkChatProcessed(chatId);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [
			notify(({ callback }) =>
				callback({
					type: 'error',
					text: 'errorNotifications.markChatProcessed',
				}),
			),
		]);
	}
};

export const AgentChatsAPI = {
	getList: getChatsList,
	markChatProcessed,
	getChatCount,
};
