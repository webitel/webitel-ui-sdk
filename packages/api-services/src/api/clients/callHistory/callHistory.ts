import { getCallService } from '@webitel/api-services/gen';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	snakeToCamel,
	starToSearch,
} from '../../transformers';

const getCallHistoryList = async ({ options, ...params }) => {
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
		return { items, next };
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getCallHistoryListPost = async ({ data, options }) => {
	const body = applyTransform(data, [camelToSnake()]);
	try {
		const response = await getCallService().searchHistoryCallPost(
			body,
			options,
		);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return { items, next };
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getCallHistoryLookup = (params) =>
	getCallHistoryList({
		...params,
		fields: params?.fields || ['id', 'destination', 'state', 'created_at'],
	});

export const CallHistoryAPI = {
	getList: getCallHistoryList,
	getListPost: getCallHistoryListPost,
	getLookup: getCallHistoryLookup,
};
