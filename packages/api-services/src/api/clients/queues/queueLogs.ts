import { MemberServiceApiFactory } from 'webitel-sdk';
import {
	getDefaultGetListResponse,
	getDefaultGetParams,
	getDefaultInstance,
	getDefaultOpenAPIConfig,
} from '../../defaults';
import {
	applyTransform,
	merge,
	notify,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type { ApiParams } from '../_shared/types';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

/**
 * Stays on the `webitel-sdk` factory rather than the generated client: the
 * range filters here are protobuf nested messages on the wire
 * (`joined_at.from`, `duration.from`), and orval flattens them to
 * `joinedAtFrom`/`durationFrom`, which `camelToSnake()` would turn into
 * `joined_at_from` — silently dropping every range filter.
 */
const service = MemberServiceApiFactory(configuration, '', instance);

/**
 * The filters panel holds ranges as a single `{ from, to }` value, while the
 * service takes them as two positional arguments. Bounds cross the wire as
 * int64, which `webitel-sdk` types as string while the panel holds timestamps —
 * hence the loose bound type.
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

	const joined = range(joinedAt, joinedAtFrom, joinedAtTo);
	const leaving = range(leavingAt, leavingAtFrom, leavingAtTo);
	const offering = range(offeringAt, offeringAtFrom, offeringAtTo);
	const dur = range(duration, durationFrom, durationTo);

	try {
		const response = await service.searchAttemptsHistory(
			page,
			size,
			search,
			sort,
			fields,
			joined.from,
			joined.to,
			undefined,
			// the service takes queueId as a repeated param
			[
				String(parentId),
			],
			undefined,
			undefined,
			agent,
			result,
			leaving.from,
			leaving.to,
			offering.from,
			offering.to,
			dur.from,
			dur.to,
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

export const QueueLogsAPI = {
	getList: getQueueLogs,
};
