import { StatusesApiFactory } from 'webitel-sdk';

import {
	getDefaultGetListResponse,
	getDefaultGetParams,
	getDefaultInstance,
	getDefaultOpenAPIConfig,
} from '../../defaults/index';
import applyTransform, {
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
} from '../../transformers/index';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const statusesService = StatusesApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'description'];

const getStatusesList = async (params) => {
	const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id'];

	const { page, size, fields, sort, id, q } = applyTransform(params, [
		merge(getDefaultGetParams()),
		(params) => ({ ...params, q: params.search }),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await statusesService.listStatuses(
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

const getStatus = async ({ itemId: id }) => {
	const itemResponseHandler = (item) => {
		return item.status;
	};

	try {
		const response = await statusesService.locateStatus(id, fieldsToSend);
		return applyTransform(response.data, [snakeToCamel(), itemResponseHandler]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const addStatus = async ({ itemInstance }) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await statusesService.createStatus(item);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const updateStatus = async ({ itemInstance, itemId: id }) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await statusesService.updateStatus(id, item);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const deleteStatus = async ({ id }) => {
	try {
		const response = await statusesService.deleteStatus(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getStatusesLookup = async (params) =>
	getStatusesList({
		...params,
		fields: params.fields || ['id', 'name'],
	});

export const CaseStatusesAPI = {
	getList: getStatusesList,
	get: getStatus,
	update: updateStatus,
	getLookup: getStatusesLookup,
	delete: deleteStatus,
	add: addStatus,
};
