import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import {
	CreateSourceBody,
	getSources,
	ListSourcesQueryParams,
	UpdateSourceBody,
} from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitizeToWire,
	snakeToCamel,
} from '../../transformers';
import type {
	AddItemParams,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	UpdateItemParams,
} from '../_shared/types';

const getSourcesList = async (params: ApiParams) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		ListSourcesQueryParams,
	);

	const { page, size, fields, sort, id, q, type } = applyTransform(params, [
		merge(getDefaultGetParams()),
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getSources().listSources({
			page,
			size,
			fields,
			sort,
			id,
			q: q || params.search,
			type,
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

const getSource = async ({ itemId: id }: GetItemParams) => {
	const itemResponseHandler = (item: ApiParams) => item.source; // TODO wtf??

	try {
		const response = await getSources().locateSource(String(id));
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

const addSource = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitizeToWire(getShallowFieldsToSendFromZodSchema(CreateSourceBody)),
		camelToSnake(),
	]);
	try {
		const response = await getSources().createSource(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateSource = async ({ itemInstance, itemId: id }: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitizeToWire(getShallowFieldsToSendFromZodSchema(UpdateSourceBody)),
		camelToSnake(),
	]);

	try {
		const response = await getSources().updateSource(String(id), item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteSource = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getSources().deleteSource(String(id));
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getLookup = (params: Parameters<typeof getSourcesList>[0]) =>
	getSourcesList({
		...params,
		fields: params.fields || [
			'id',
			'name',
			'type',
		],
	});

export const CaseSourcesAPI = {
	getList: getSourcesList,
	get: getSource,
	add: addSource,
	update: updateSource,
	delete: deleteSource,
	getLookup,
};
