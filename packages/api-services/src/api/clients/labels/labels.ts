import { getLabels } from '../../../gen-wire';
import { getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type { ApiParams } from '../_shared/types';

const getList = async (params: ApiParams) => {
	const fieldsToSend = [
		'page',
		'size',
		'search',
		'sort',
		'fields',
		'id',
	];
	const { page, size, search } = applyTransform(params, [
		sanitize(fieldsToSend),
		merge(getDefaultGetParams()),
		starToSearch('search'),
		camelToSnake(),
	]);
	try {
		const response = await getLabels().getLabels({
			page,
			size,
			// the generated param is `q`; `search` is what the datalist store sends
			q: search,
		});
		const { labels, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge({
				labels: [],
				next: false,
			}),
		]);
		return {
			items: labels,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getLabelsLookup = (params: Parameters<typeof getList>[0]) =>
	getList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const LabelsAPI = {
	getList,
	getLookup: getLabelsLookup,
};
