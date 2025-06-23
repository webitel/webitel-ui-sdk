import { CatalogApiFactory } from 'webitel-sdk';

import {
	getDefaultInstance,
	getDefaultOpenAPIConfig,
} from '../../defaults/index';
import applyTransform, { notify, snakeToCamel } from '../../transformers/index';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const catalogService = CatalogApiFactory(configuration, '', instance);

const getChatMessagesList = async ({ chatId }) => {
	const mergeMessagesData = ({ messages, peers }) => {
		if (!messages) return [];
		return messages.map(({ from, ...message }) => {
			return {
				...message,
				peer: peers[from.id - 1],
			};
		});
	};

	try {
		const response = await catalogService.getHistory(chatId);
		const { messages, peers } = applyTransform(response.data, [snakeToCamel()]);
		return {
			items: applyTransform({ messages, peers }, [mergeMessagesData]),
			peers,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

export const CatalogAPI = {
	getChatMessagesList,
};
