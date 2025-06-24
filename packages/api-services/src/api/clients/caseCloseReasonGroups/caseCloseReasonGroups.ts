import { CloseReasonGroupsApiFactory } from 'webitel-sdk';

import {
	getDefaultGetListResponse,
	getDefaultGetParams,
	getDefaultInstance,
	getDefaultOpenAPIConfig,
} from '../../defaults';
import { applyTransform, 
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
} from '../../transformers';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const closeReasonGroupsService = CloseReasonGroupsApiFactory(
	configuration,
	'',
	instance,
);

const fieldsToSend = ['name', 'description'];

const getCloseReasonGroupsList = async (params) => {
	const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id'];

	const { page, size, fields, sort, id, q } = applyTransform(params, [
		merge(getDefaultGetParams()),
		(params) => ({ ...params, q: params.search }),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await closeReasonGroupsService.listCloseReasonGroups(
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
			items: applyTransform(items, []),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getCloseReasonGroups = async ({ itemId: id }) => {
	const itemResponseHandler = (item) => {
		return item.closeReasonGroup;
	};

	try {
		const response = await closeReasonGroupsService.locateCloseReasonGroup(
			id,
			fieldsToSend,
		);
		return applyTransform(response.data, [snakeToCamel(), itemResponseHandler]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const addCloseReasonGroups = async ({ itemInstance }) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);
	try {
		const response =
			await closeReasonGroupsService.createCloseReasonGroup(item);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const updateCloseReasonGroups = async ({ itemInstance, itemId: id }) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);
	try {
		const response = await closeReasonGroupsService.updateCloseReasonGroup(
			id,
			item,
		);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const deleteCloseReasonGroups = async ({ id }) => {
	try {
		const response = await closeReasonGroupsService.deleteCloseReasonGroup(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getCloseReasonGroupsLookup = async (params) =>
	getCloseReasonGroupsList({
		...params,
		fields: params.fields || ['id', 'name'],
	});

export const CaseCloseReasonGroupsAPI = {
	getList: getCloseReasonGroupsList,
	get: getCloseReasonGroups,
	add: addCloseReasonGroups,
	update: updateCloseReasonGroups,
	delete: deleteCloseReasonGroups,
	getLookup: getCloseReasonGroupsLookup,
};
