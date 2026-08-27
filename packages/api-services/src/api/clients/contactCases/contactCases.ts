import { getCases } from '@webitel/api-services/gen';
import { snakeToKebab } from '@webitel/api-services/utils';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	merge,
	notify,
	snakeToCamel,
} from '../../transformers';
import type { ApiId, ApiParams } from '../_shared/types';
import { FTSServiceAPI } from '../cases/_internals/ftsService';
import { stringifyCaseFilters } from '../cases/_internals/stringifyCaseFilters';

function transformSourceType(data: ApiParams) {
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

const getContactCasesList = async ({
	parentId,
	...params
}: {
	parentId: ApiId;
} & ApiParams) => {
	let ftsIds: Array<string | number> | undefined;
	const { fts } = params;
	if (fts) {
		try {
			const { items } = await FTSServiceAPI.getList({
				page: params.page,
				size: params.size,
				fts: params.fts,
				sort: params.sort,
				objectName: [
					'cases',
					'case_comments',
				],
			});
			ftsIds = items.map(({ id }: ApiParams) => id);
		} catch {
			// skip error, load cases without fts
		}
	}

	/* everything left over after pulling out the technical query params is a
	 * filter, keyed by the (camelCase) filter names stringifyCaseFilters expects */
	const { page, size, q, ids, sort, fields, ...filters } = applyTransform(
		{
			...params,
			ids: params.ids || ftsIds,
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
		const response = await getCases().searchCases2(String(parentId), {
			page,
			size,
			q,
			ids,
			sort,
			fields: [
				...(fields || []),
				'etag',
				'id',
				'custom',
			],
			filters: stringifyCaseFilters(filters),
		});

		const { items, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				snakeToCamel([
					'custom',
				]),
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

export const ContactCasesAPI = {
	getList: getContactCasesList,
};
