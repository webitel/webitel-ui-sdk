import {
	CreateSLABody,
	getSlas,
	ListSLAsQueryParams,
	UpdateSLABody,
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

const getSlasList = async (params) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(ListSLAsQueryParams);

	const { page, size, fields, sort, id, q } = applyTransform(params, [
		merge(getDefaultGetParams()),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getSlas().listSLAs({
			page,
			size,
			fields,
			sort,
			id,
			q: q || params.search,
		});
		const { items, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, []),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getSla = async ({ itemId: id }) => {
	const itemResponseHandler = (item) => item.sla;

	try {
		const response = await getSlas().locateSLA(id);
		return applyTransform(response.data, [
			snakeToCamel(),
			itemResponseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addSla = async ({ itemInstance }) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(CreateSLABody);

	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getSlas().createSLA(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateSla = async ({ itemInstance, itemId: id }) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(UpdateSLABody);

	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getSlas().updateSLA(id, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteSla = async ({ id }) => {
	try {
		const response = await getSlas().deleteSLA(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getSlasLookup = (params) =>
	getSlasList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const SlasAPI = {
	getList: getSlasList,
	getLookup: getSlasLookup,
	get: getSla,
	add: addSla,
	update: updateSla,
	delete: deleteSla,
};
