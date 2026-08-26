import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { CatalogGetDialogsQueryParams, getMessages } from '../../../gen-wire';

import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	merge,
	notify,
	sanitizeToWire,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type { ApiParams } from '../_shared/types';

const getDialogsList = async (params: ApiParams) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		CatalogGetDialogsQueryParams,
	);

	const requestParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		(params: ApiParams) => ({
			...params,
			q: params.search,
		}),
		starToSearch('q'),
		sanitizeToWire(fieldsToSend),
	]);

	try {
		const response = await getMessages().catalogGetDialogs(requestParams);
		const { data, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(data || [], [
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

const getLookup = (params: ApiParams) =>
	getDialogsList({
		...params,
		fields: params.fields || [
			'id',
			'title',
		],
	});

export const ChatDialogsAPI = {
	getList: getDialogsList,
	getLookup,
};
