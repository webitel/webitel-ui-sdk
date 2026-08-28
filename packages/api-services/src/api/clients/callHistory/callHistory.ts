import { getCallService } from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type { ApiParams } from '../_shared/types';

const getCallHistoryList = async ({
	options,
	...params
}: {
	options: ApiParams;
} & ApiParams) => {
	const listParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);
	try {
		const response = await getCallService().searchHistoryCall(
			listParams,
			options,
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

const getCallHistoryListPost = async ({
	data,
	options,
	doNotConvertKeys = [],
	responseTransformers,
}: {
	data: ApiParams;
	options?: ApiParams;
	/**
	 * Keys whose contents are user data rather than API fields — `variables`,
	 * for instance — and must survive both case transformers untouched.
	 */
	doNotConvertKeys?: string[];
	/**
	 * Replaces the default response pipeline. A CSV export, for one, wants the
	 * rows left in snake_case.
	 */
	responseTransformers?: Parameters<typeof applyTransform>[1];
}) => {
	const body = applyTransform(data, [
		camelToSnake(doNotConvertKeys),
	]);
	try {
		const response = await getCallService().searchHistoryCallPost(
			body,
			options,
		);
		const { items, next } = applyTransform(
			response.data,
			responseTransformers ?? [
				snakeToCamel(doNotConvertKeys),
				merge(getDefaultGetListResponse()),
			],
		);
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

/**
 * Aggregation buckets for the history dashboards. The response is returned as
 * camelCase rows; shaping them into chart series is the caller's job.
 */
const aggregateCallHistory = async ({
	data,
	doNotConvertKeys = [],
}: {
	data: ApiParams;
	doNotConvertKeys?: string[];
}) => {
	try {
		const response = await getCallService().aggregateHistoryCall(data);
		return applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getCallHistoryLookup = (
	params: Parameters<typeof getCallHistoryList>[0],
) =>
	getCallHistoryList({
		...params,
		fields: params?.fields || [
			'id',
			'destination',
			'state',
			'created_at',
		],
	});

export const CallHistoryAPI = {
	getList: getCallHistoryList,
	getListPost: getCallHistoryListPost,
	aggregate: aggregateCallHistory,
	getLookup: getCallHistoryLookup,
};
