import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { getFtsservice, SearchQueryParams } from '../../../../gen-wire';
import {
	getDefaultGetListResponse,
	getDefaultGetParams,
} from '../../../defaults';
import {
	applyTransform,
	merge,
	notify,
	sanitizeToWire,
	snakeToCamel,
} from '../../../transformers';
import type { ApiParams } from '../../_shared/types';

const getSearchList = async (params: ApiParams) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(SearchQueryParams);

	const {
		page,
		size,
		q,
		sort,
		fields,
		options,
		object_name: objectName,
	} = applyTransform(params, [
		merge(getDefaultGetParams()),
		(params) => ({
			...params,
			q: params.fts,
		}),
		sanitizeToWire(fieldsToSend),
	]);

	try {
		const response = await getFtsservice().search(
			{
				page,
				size,
				q,
				sort,
				fields,
				object_name: objectName,
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
