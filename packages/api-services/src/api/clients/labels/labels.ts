import { GetLabelsQueryParams, getLabels } from '@webitel/api-services/gen';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
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

const getLabelsList = async (params: ApiParams) => {
	const listFieldsToSend =
		getShallowFieldsToSendFromZodSchema(GetLabelsQueryParams);

	const { page, size, q, fields } = applyTransform(params, [
		merge(getDefaultGetParams()),
		merge({
			q: params.search,
		}),
		sanitize(listFieldsToSend),
		starToSearch('q'),
		camelToSnake(),
	]);

	try {
		const response = await getLabels().getLabels({
			page,
			size,
			q,
			fields,
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

const getLabelsLookup = (params: Parameters<typeof getLabelsList>[0]) =>
	getLabelsList({
		...params,
		fields: params.fields || [
			'label',
		],
	});

export const LabelsAPI = {
	getList: getLabelsList,
	getLookup: getLabelsLookup,
};
