import { getCases } from '@webitel/api-services/gen';
import { FormatDateMode } from '../../../../../../src/enums';
import { formatDate } from '../../../../../../src/utils/formatDate';

import { stringifyCaseFilters } from '../../../scripts';
import downloadFile from '../../../scripts/downloadFile/downloadFile';
import { snakeToKebab } from '../../../utils';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	merge,
	notify,
	snakeToCamel,
} from '../../transformers';

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

		const filename = `Cases-${formatDate(Date.now(), FormatDateMode.DATE)}-${formatDate(Date.now(), FormatDateMode.TIME_SEC)}`;

		downloadFile({
			response,
			filename,
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
