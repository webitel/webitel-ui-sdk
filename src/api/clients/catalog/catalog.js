import { CatalogApiFactory } from 'webitel-sdk';

import {
	getDefaultInstance,
	getDefaultOpenAPIConfig,
} from '../../defaults/index.js';
import applyTransform, {
	notify,
	snakeToCamel,
} from '../../transformers/index.js';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const catalogService = new CatalogApiFactory(configuration, '', instance);

const getChatMessagesList = async ({ chatId, offsetDate, limit }) => {
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
		const response = await catalogService.getHistory(
			chatId,
			undefined,
			offsetDate,
			limit,
		);
		const { messages, peers, next } = applyTransform(response.data, [
			snakeToCamel(),
		]);
		return {
			items: applyTransform(
				{
					messages,
					peers,
					next,
				},
				[
					mergeMessagesData,
				],
			),
			peers,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const CatalogAPI = {
	getChatMessagesList,
};

export default CatalogAPI;
