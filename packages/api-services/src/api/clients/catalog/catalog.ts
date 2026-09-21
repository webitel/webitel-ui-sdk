import { getMessages } from '../../../gen-wire';
import { applyTransform, notify, snakeToCamel } from '../../transformers';
import type { ApiId, ApiParams } from '../_shared/types';

const getChatMessagesList = async ({
	chatId,
	offsetDate,
	limit,
}: {
	chatId: ApiId;
	// messages sent strictly before this epoch(milli)
	offsetDate?: ApiId;
	limit?: number;
}) => {
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
		const response = await getMessages().catalogGetHistory(String(chatId), {
			'offset.date': offsetDate ? String(offsetDate) : undefined,
			limit,
		});
		const { messages, peers, next } = applyTransform(response.data, [
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
			next: !!next,
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
