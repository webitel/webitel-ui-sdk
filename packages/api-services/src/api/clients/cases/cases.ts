import { getCases } from '@webitel/api-services/gen';

import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	merge,
	notify,
	snakeToCamel,
} from '../../transformers';

import { stringifyCaseFilters } from '../../../scripts';
import { snakeToKebab } from '../../../utils';
import downloadFile from '../../../scripts/downloadFile/downloadFile';

const casesService = getCases();

const fieldsToSend = [
	'subject',
	'description',
	'contact_info',
	'status_lookup',
	'close_reason_lookup',
	'author',
	'assignee',
	'reporter',
	'impacted',
	'group',
	'priority',
	'source',
	'status',
	'close_reason',
	'close_result',
	'sla_condition',
	'sla',
	'service',
	'status_condition',
	'close_reason_group',
	'custom',
];

function transformSourceType(data) {
	if (Array.isArray(data)) {
		return data.map((item) => {
			if (item.source?.type) {
				item.source.type = snakeToKebab(item.source.type.toLowerCase());
			}
			return item;
		});
	}

	if (data.source?.type) {
		data.source.type = snakeToKebab(data.source.type.toLowerCase());
	}
	return data;
}

const exportCase = async (params) => {
	const fieldsToSend = [
		'page',
		'size',
		'q',
		'ids',
		'sort',
		'fields',
		'filters',
	];

	console.log('params', params);

	const { page, size, q, ids, sort, fields, options, format, ...filters } =
		applyTransform(
			{
				...params,
			},
			[
				merge(getDefaultGetParams()),
				// starToSearch('search'),
				(params) => ({
					...params,
					q: params.search,
				}),
				// camelToSnake(),
			],
		);

	try {
		const response = await casesService.exportCases(
			{
				page,
				size,
				q,
				ids,
				sort,
				fields,
				format,
				filters: stringifyCaseFilters(filters),
			},
			options,
		);
		downloadFile(response, 'fileName.csv');

		console.log('response', response);

		const { items, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				snakeToCamel(),
				transformSourceType,
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const CasesAPI = {
	exportData: exportCase,
};
