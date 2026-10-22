import { getRegionService } from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type {
	AddItemParams,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	UpdateItemParams,
} from '../_shared/types';

const getRegionsList = async (params: ApiParams) => {
	const { page, size, search, sort, fields, id } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response = await getRegionService().searchRegion({
			page,
			size,
			// [Claude] the generated param is `q`; `search` is what the datalist store sends
			q: search,
			sort,
			fields,
			id,
		});
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getRegion = async ({ itemId: id }: GetItemParams) => {
	try {
		const response = await getRegionService().readRegion(String(id));
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const fieldsToSend = [
	'name',
	'timezone',
	'description',
];

const addRegion = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getRegionService().createRegion(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateRegion = async ({ itemInstance, itemId: id }: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getRegionService().updateRegion(String(id), item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteRegion = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getRegionService().deleteRegion(String(id));
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getRegionsLookup = (params: Parameters<typeof getRegionsList>[0]) =>
	getRegionsList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const RegionsAPI = {
	getList: getRegionsList,
	get: getRegion,
	add: addRegion,
	update: updateRegion,
	delete: deleteRegion,
	getLookup: getRegionsLookup,
};
