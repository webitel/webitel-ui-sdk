import { getFtsservice } from '@webitel/api-services/gen';

import {
	getDefaultGetListResponse,
	getDefaultGetParams,
} from '../../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
} from '../../../transformers';

const getSearchList = async (params) => {
	const fieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'object_name',
	];

	const { page, size, q, sort, fields, options, object_name } = applyTransform(
		params,
		[
			merge(getDefaultGetParams()),
			(params) => ({
				...params,
				q: params.fts,
			}),
			sanitize(fieldsToSend),
			camelToSnake(),
		],
	);

	try {
		const response = await getFtsservice().search(
			{
				page,
				size,
				q,
				sort,
				fields,
				object_name,
			} as any,
			options,
		);

		const { items, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				snakeToCamel(),
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const FTSServiceAPI = {
	getList: getSearchList,
};
