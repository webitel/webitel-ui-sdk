import { getFtsservice } from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
} from '../../transformers';
import type { ApiParams } from '../_shared/types';

/** Full-text search across objects. Callers pass the query as `fts`. */
const getFtsList = async (params: ApiParams) => {
	const fieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'object_name',
	];

	const { page, size, q, sort, fields, object_name } = applyTransform(params, [
		merge(getDefaultGetParams()),
		(params: ApiParams) => ({
			...params,
			q: params.fts,
		}),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getFtsservice().search({
			page,
			size,
			q,
			sort,
			fields,
			object_name,
		});
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

export const FtsAPI = {
	getList: getFtsList,
};
