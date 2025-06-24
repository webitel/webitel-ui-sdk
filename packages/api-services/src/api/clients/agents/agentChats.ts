import { AgentChatServiceApiFactory } from 'webitel-sdk';

import {
	getDefaultGetParams,
	getDefaultInstance,
	getDefaultOpenAPIConfig,
} from '../../defaults';
import { applyTransform, 
	merge,
	notify,
	snakeToCamel,
} from '../../transformers';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const agentChatsService = AgentChatServiceApiFactory(
	configuration,
	'',
	instance,
);

const getChatsList = async (params) => {
	const { size, page, onlyClosed, onlyUnprocessed } = applyTransform(params, [
		merge(getDefaultGetParams()),
	]);

	try {
		const response = await agentChatsService.getAgentChats(
			size,
			page,
			undefined,
			undefined,
			undefined,
			onlyClosed,
			onlyUnprocessed,
		);
		const { items, next } = applyTransform(response.data, [snakeToCamel()]);
		return {
			items,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const markChatProcessed = async (chatId) => {
	// add to chat unprocessedClose: true
	try {
		const response = await agentChatsService.markChatProcessed(chatId);
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
};
