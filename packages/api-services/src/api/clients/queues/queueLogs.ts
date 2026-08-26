import type { SearchAttemptsHistoryParams } from '@webitel/api-services/gen/models';
import { getMemberService } from '../../../gen-wire';
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

const getQueueLogs = async (params: ApiParams) => {
	const {
		parentId,
		page,
		size,
		search,
		sort = '+joined_at',
		fields,
		joinedAt,
		leavingAt,
		offeringAt,
		duration,
		result,
		agent,
		bucket,
	} = applyTransform(params, [
		merge(getDefaultGetParams()),
		({ joinedAt, leavingAt, offeringAt, ...rest }) => ({
			...rest,
			joinedAt: normalizeDatetimeRange(joinedAt),
			leavingAt: normalizeDatetimeRange(leavingAt),
			offeringAt: normalizeDatetimeRange(offeringAt),
		}),
		starToSearch('search'),
	]);

	try {
		const response = await getMemberService().searchAttemptsHistory({
			page,
			size,
			// the generated param is `q`; `search` is what the datalist store sends
			q: search,
			sort,
			fields,
			// repeated params, even for the single queue this tab shows
			queueId: [
				String(parentId),
			],
			agentId: agent,
			bucketId: bucket,
			result,
			'joined_at.from': joinedAt?.from,
			'joined_at.to': joinedAt?.to,
			'leaving_at.from': leavingAt?.from,
			'leaving_at.to': leavingAt?.to,
			'offering_at.from': offeringAt?.from,
			'offering_at.to': offeringAt?.to,
			'duration.from': duration?.from,
			'duration.to': duration?.to,
		} as SearchAttemptsHistoryParams);
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

export const QueueLogsAPI = {
	getList: getQueueLogs,
};
