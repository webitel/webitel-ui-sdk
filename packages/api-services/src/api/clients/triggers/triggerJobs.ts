import { getTriggerService } from '../../../gen-wire';
import { normalizeDatetimeRange } from '../../../scripts';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	merge,
	notify,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type { ApiParams } from '../_shared/types';

/**
 * [Claude] The params are the trigger logs datalist's filters: `startedAt` is
 * a date range filter (a relative value or `{ from, to }`), `duration` a
 * from-to range and `triggerJobState` the picked run states. The ranges are
 * protobuf nested messages, so they only bind as dotted keys.
 */
const getTriggerJobsList = async (params: ApiParams) => {
	const {
		parentId,
		page,
		size,
		search,
		sort,
		fields,
		startedAt,
		duration,
		triggerJobState,
	} = applyTransform(params, [
		merge(getDefaultGetParams()),
		({ startedAt, ...rest }) => ({
			...rest,
			startedAt: normalizeDatetimeRange(startedAt),
		}),
		starToSearch('search'),
	]);

	try {
		const response = await getTriggerService().searchTriggerJob(
			Number(parentId),
			{
				page,
				size,
				// [Claude] the generated param is `q`; `search` is what the datalist store sends
				q: search,
				sort,
				fields,
				'started_at.from': startedAt?.from,
				'started_at.to': startedAt?.to,
				'duration.from': duration?.from,
				'duration.to': duration?.to,
				state: triggerJobState,
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
