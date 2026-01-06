import { getMessages } from '@webitel/api-services/gen';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	snakeToCamel,
} from '../../transformers';

const patchMessagesService = async (changes) => {
	const body = applyTransform(changes, [camelToSnake()]);

	try {
		const response = await getMessages().messagesServiceBroadcastMessage(body);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getChatHistory = async ({ chatId, ...params }) => {
	const listParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		camelToSnake(),
	]);

	try {
		const response = await getMessages().catalogGetHistory(
			chatId,
			listParams,
		);
		const { messages, peers, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return { messages, peers, next };
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

export const MessagesServiceAPI = {
	patch: patchMessagesService,
	getChatHistory,
};
