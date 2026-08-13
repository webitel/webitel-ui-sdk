import { getAgentService } from '@webitel/api-services/gen';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	merge,
	notify,
	snakeToCamel,
} from '../../transformers';
import type { ApiParams } from '../_shared/types';

const getQueueAgentsList = async (params: ApiParams) => {
	const { parentId, page, size, search, fields, sort } = applyTransform(params, [
		merge(getDefaultGetParams()),
	]);

	try {
		const response = await getAgentService().searchAgent({
			page,
			size,
			// the generated param is `q`; `search` is what the datalist store sends
			q: search,
			sort,
			fields,
			queueId: [
				Number(parentId),
			],
		});
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const QueueAgentsAPI = {
	getList: getQueueAgentsList,
};
