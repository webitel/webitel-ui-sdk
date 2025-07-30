import { PrioritiesApiFactory } from 'webitel-sdk';

import {
	getDefaultGetListResponse,
	getDefaultGetParams,
	getDefaultInstance,
	getDefaultOpenAPIConfig,
} from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
} from '../../transformers';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const priorityService = PrioritiesApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'description', 'color'];

import { listPrioritiesQueryParams, locatePriorityResponse } from '@webitel/api-services/gen';
import { getFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { convertCamelToSnakeFrom, convertSnakeToCamel } from '../../transformers/camelToSnakeFromSchema';

const getPrioritiesList = async (params) => {
  const fieldsToSend = getFieldsToSendFromZodSchema(listPrioritiesQueryParams);

  const { page, size, fields, sort, id, q, not_in_sla, in_sla_cond } = applyTransform(params, [
		merge(getDefaultGetParams()),
		(params) => ({ ...params, q: params.search }),
		sanitize(fieldsToSend),
    (params) => convertCamelToSnakeFrom(params, fieldsToSend),
	]);

	try {
		const response = await priorityService.listPriorities(
			page,
			size,
			fields,
			sort,
			id,
			q,
      not_in_sla,
      in_sla_cond,
		);
		const { items, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, []),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getPriority = async ({ itemId: id }) => {
	const itemResponseHandler = (item) => {
		return item.priority;
	};

  const fieldsToSend2 = getFieldsToSendFromZodSchema(locatePriorityResponse);

	try {
		const response = await priorityService.locatePriority(id, fieldsToSend);
		return applyTransform(response.data, [(params) => convertSnakeToCamel(params, fieldsToSend2), itemResponseHandler]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const addPriority = async ({ itemInstance }) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await priorityService.createPriority(item);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const updatePriority = async ({ itemInstance, itemId: id }) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await priorityService.updatePriority(id, item);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const deletePriority = async ({ id }) => {
	try {
		const response = await priorityService.deletePriority(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getConditionsLookup = (params) =>
	getPrioritiesList({
		...params,
		fields: params.fields || ['id', 'name'],
	});

export const CasePrioritiesAPI = {
	getList: getPrioritiesList,
	get: getPriority,
	update: updatePriority,
	getLookup: getConditionsLookup,
	delete: deletePriority,
	add: addPriority,
};
