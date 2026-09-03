import { getTriggerService } from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	merge,
	notify,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type { ApiParams } from '../_shared/types';

const getTriggerJobsList = async (params: ApiParams) => {
	const {
		parentId,
		page,
		size,
		q,
		sort,
		fields,
		startedAtFrom,
		startedAtTo,
		durationFrom,
		durationTo,
		result,
	} = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response = await getTriggerService().searchTriggerJob(
			Number(parentId),
			{
				page,
				size,
				q,
				sort,
				fields,
				'started_at.from': startedAtFrom,
				'started_at.to': startedAtTo,
				'duration.from': durationFrom,
				'duration.to': durationTo,
				state: result,
			},
		);
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

export const TriggerJobsAPI = {
	getList: getTriggerJobsList,
};
