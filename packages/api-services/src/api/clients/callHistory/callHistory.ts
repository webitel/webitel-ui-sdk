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
}: {
	data: ApiParams;
	options?: ApiParams;
	/**
	 * Keys whose contents are user data rather than API fields — `variables`,
	 * for instance — and must survive both case transformers untouched.
	 */
	doNotConvertKeys?: string[];
}) => {
	const body = applyTransform(data, [
		camelToSnake(doNotConvertKeys),
	]);
	try {
		const response = await getCallService().searchHistoryCallPost(
			body,
			options,
		);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
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
	getLookup: getCallHistoryLookup,
};
