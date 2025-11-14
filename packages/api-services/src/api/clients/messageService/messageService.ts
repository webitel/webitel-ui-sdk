import { getMessages } from '@webitel/api-services/gen';
import {
	applyTransform,
	camelToSnake,
	notify,
	snakeToCamel,
} from '../../transformers';

const patchMessagesService = async (changes) => {
	const body = applyTransform(changes, [camelToSnake()]);

	try {
		const response = await getMessages().broadcastMessage(body);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

export const MessagesServiceAPI = {
	patch: patchMessagesService,
};
