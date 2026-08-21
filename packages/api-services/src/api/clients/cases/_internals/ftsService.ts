import { getFtsservice, SearchQueryParams } from '@webitel/api-services/gen';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import {
	getDefaultGetListResponse,
	getDefaultGetParams,
} from '../../../defaults';
import {
	applyTransform,
	merge,
	notify,
	sanitize,
	snakeToCamel,
} from '../../../transformers';
import type { ApiParams } from '../../_shared/types';

const getSearchList = async (params: ApiParams) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(SearchQueryParams);

	const { page, size, q, sort, fields, options, objectName } = applyTransform(
		params,
		[
			merge(getDefaultGetParams()),
			(params) => ({
				...params,
				q: params.fts,
			}),
			sanitize(fieldsToSend),
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
				objectName,
			},
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
