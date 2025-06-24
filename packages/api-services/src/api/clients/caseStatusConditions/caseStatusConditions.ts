import { StatusConditionsApiFactory } from 'webitel-sdk';

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

const statusConditionsService = StatusConditionsApiFactory(
	configuration,
	'',
	instance,
);

const fieldsToSend = ['name', 'description'];

const getStatusConditionsList = async ({ statusId, parentId, ...rest }) => {
	const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id'];

	const { page, size, fields, sort, id, q } = applyTransform(rest, [
		merge(getDefaultGetParams()),
		(params) => ({ ...params, q: params.search }),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await statusConditionsService.listStatusConditions(
			statusId || parentId,
			page,
			size,
			fields,
			sort,
			id,
			q,
		);
		const { items, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [snakeToCamel()]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getStatusCondition = async ({ parentId, itemId: id }) => {
	const itemResponseHandler = (item) => {
		return item.status;
	};

	try {
		const response = await statusConditionsService.locateStatusCondition(
			parentId,
			id,
			fieldsToSend,
		);
		return applyTransform(response.data, [snakeToCamel(), itemResponseHandler]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const updateStatusCondition = async ({
	itemInstance,
	itemId: id,
	parentId,
}) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await statusConditionsService.updateStatusCondition(
			parentId,
			id,
			item,
		);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const addStatusCondition = async ({ itemInstance, parentId }) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await statusConditionsService.createStatusCondition(
			parentId,
			item,
		);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const patchStatusCondition = async ({ id, parentId, changes }) => {
	const fieldsToSend = ['name', 'description', 'initial', 'final'];
	const input = applyTransform(changes, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await statusConditionsService.updateStatusCondition2(
			parentId,
			id,
			input,
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const deleteStatusCondition = async ({ id, parentId }) => {
	try {
		const response = await statusConditionsService.deleteStatusCondition(
			parentId,
			id,
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getStatusesLookup = (params) =>
	getStatusConditionsList({
		...params,
		parentId: params.parentId,
		id: params.id,
		fields: params.fields || ['id', 'name'],
	});

export const CaseStatusConditionsAPI = {
	getList: getStatusConditionsList,
	getLookup: getStatusesLookup,
	get: getStatusCondition,
	update: updateStatusCondition,
	patch: patchStatusCondition,
	delete: deleteStatusCondition,
	add: addStatusCondition,
};
