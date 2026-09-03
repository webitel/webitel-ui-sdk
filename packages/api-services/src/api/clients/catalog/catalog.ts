import { getMessages } from '../../../gen-wire';
import { applyTransform, notify, snakeToCamel } from '../../transformers';
import type { ApiId, ApiParams } from '../_shared/types';

const getChatMessagesList = async ({ chatId }: { chatId: ApiId }) => {
	const mergeMessagesData = ({
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
				peer: peers[from.id - 1],
			};
		});
	};

	try {
		const response = await getMessages().catalogGetHistory(String(chatId));
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
					mergeMessagesData,
				],
			),
			peers,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const CatalogAPI = {
	getChatMessagesList,
};
