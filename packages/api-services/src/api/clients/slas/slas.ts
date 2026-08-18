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
import type {
	AddItemParams,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	UpdateItemParams,
} from '../_shared/types';

const getSlasList = async (params: ApiParams) => {
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

const getSla = async ({ itemId: id }: GetItemParams) => {
	const itemResponseHandler = (item: ApiParams) => item.sla;

	try {
		const response = await getSlas().locateSLA(String(id));
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

const addSla = async ({ itemInstance }: AddItemParams) => {
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

const updateSla = async ({ itemInstance, itemId: id }: UpdateItemParams) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(UpdateSLABody);

	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getSlas().updateSLA(String(id), item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteSla = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getSlas().deleteSLA(String(id));
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getSlasLookup = (params: Parameters<typeof getSlasList>[0]) =>
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
