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
	const { page, size, q, ids, sort, fields, options, format, ...filters } =
		applyTransform(
			{
				...params,
			},
			[
				merge(getDefaultGetParams()),
				(params) => ({
					...params,
					q: params.search,
				}),
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
			{
				...options,
				responseType: 'blob',
			},
		);

		const today = Date.now();

		downloadFile({
			response,
			filename: today,
			fileFormat: format,
		});

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
