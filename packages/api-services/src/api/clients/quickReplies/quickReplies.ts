import { getQuickRepliesService } from '@webitel/api-services/gen';

import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
} from '../../transformers';

const fieldsToSend = ['name', 'queues', 'article', 'teams', 'text'];

const getQuickRepliesList = async (params) => {
	const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id'];

	const { page, size, fields, sort, id, q } = applyTransform(params, [
		merge(getDefaultGetParams()),
		(params) => ({ ...params, q: params.search }),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getQuickRepliesService().searchQuickReplies({
			page,
			size,
			fields,
			sort,
			id,
			q,
		});
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

const getQuickReply = async ({ itemId: id }) => {
	try {
		const response = await getQuickRepliesService().readQuickReply(id);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const addQuickReply = async ({ itemInstance }) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getQuickRepliesService().createQuickReply(item);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const updateQuickReply = async ({ itemInstance, itemId: id }) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await getQuickRepliesService().updateQuickReply(id, item);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const deleteQuickReply = async ({ id }) => {
	try {
		const response = await getQuickRepliesService().deleteQuickReply(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getLookup = (params) =>
	getQuickRepliesList({
		...params,
		fields: params.fields || ['id', 'name'],
	});

export const QuickRepliesAPI = {
	getList: getQuickRepliesList,
	get: getQuickReply,
	add: addQuickReply,
	update: updateQuickReply,
	delete: deleteQuickReply,
	getLookup,
};
