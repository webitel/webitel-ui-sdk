import { getAgentService } from '@webitel/api-services/gen';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	merge,
	notify,
	sanitize,
	snakeToCamel,
} from '../../transformers';
import type { ApiParams } from '../_shared/types';

const service = getAgentService();

/**
 * Read-only: the queue card's Agents tab lists the agents serving a queue, and
 * membership is edited from the agent side, not here. There is deliberately no
 * `get`/`add`/`update`/`delete` — `createTableStore` only requires `getList`.
 */
const fields = [
	'id',
	'name',
	'status',
	'supervisor',
	'skills',
];

const getQueueAgentsList = async (params: ApiParams) => {
	const paramsToSend = [
		'page',
		'size',
		'search',
		'sort',
		'fields',
		'id',
		'parentId',
	];

	const { parentId, page, size, search, sort } = applyTransform(params, [
		merge(getDefaultGetParams()),
		sanitize(paramsToSend),
	]);

	try {
		const response = await service.searchAgent({
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
