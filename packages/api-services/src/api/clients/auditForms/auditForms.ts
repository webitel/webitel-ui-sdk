import {
	getAuditFormService,
	searchAuditFormQueryParams,
} from '@webitel/api-services/gen';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';

import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
} from '../../transformers';

const getAuditFormsList = async (params) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		searchAuditFormQueryParams,
	);

	const transformedParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		(params) => ({ ...params, q: params.search }),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response =
			await getAuditFormService().searchAuditForm(transformedParams);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getAuditForm = async ({ itemId: id }) => {
	try {
		const response = await getAuditFormService().readAuditForm(id);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getLookup = (params) =>
	getAuditFormsList({
		...params,
		fields: params.fields || ['id', 'name'],
	});

export const AuditFormsAPI = {
	getList: getAuditFormsList,
	get: getAuditForm,
	getLookup,
};
