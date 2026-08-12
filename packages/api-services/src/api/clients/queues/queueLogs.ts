import { getMemberService } from '@webitel/api-services/gen';
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
 * The filters panel holds a range as one `{ from, to }` value; the request
 * carries it as two keys. Bounds are int64 on the wire and timestamps in the
 * panel, hence the loose bound type.
 */
const range = (
	value?: ApiParams,
	// biome-ignore lint/suspicious/noExplicitAny: see above
	from?: any,
	// biome-ignore lint/suspicious/noExplicitAny: see above
	to?: any,
) => ({
	from: value?.from ?? from,
	to: value?.to ?? to,
});

/**
 * Range bounds are protobuf nested messages, so they bind as `joined_at.from`
 * rather than the flattened `joinedAtFrom` the generated params type declares.
 * Orval spreads whatever it is given straight into the request, so the dotted
 * keys reach the backend intact — they just have to be spelled out here, since
 * the generated type cannot describe them.
 */
const rangeParams = (
	name: string,
	bounds: {
		from?: unknown;
		to?: unknown;
	},
) => ({
	[`${name}.from`]: bounds.from,
	[`${name}.to`]: bounds.to,
});

const getQueueLogs = async (params: ApiParams) => {
	const {
		parentId,
		page,
		size,
		search,
		sort = '+joined_at',
		fields,
		joinedAt,
		joinedAtFrom,
		joinedAtTo,
		leavingAt,
		leavingAtFrom,
		leavingAtTo,
		offeringAt,
		offeringAtFrom,
		offeringAtTo,
		duration,
		durationFrom,
		durationTo,
		result,
		agent,
	} = applyTransform(params, [
		merge(getDefaultGetParams()),
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
			result,
			...rangeParams('joined_at', range(joinedAt, joinedAtFrom, joinedAtTo)),
			...rangeParams(
				'leaving_at',
				range(leavingAt, leavingAtFrom, leavingAtTo),
			),
			...rangeParams(
				'offering_at',
				range(offeringAt, offeringAtFrom, offeringAtTo),
			),
			...rangeParams('duration', range(duration, durationFrom, durationTo)),
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

export const QueueLogsAPI = {
	getList: getQueueLogs,
};
