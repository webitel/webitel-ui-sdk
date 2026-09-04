import { getListService } from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	mergeEach,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import { generatePermissionsApi } from '../_shared/generatePermissionsApi';
import type {
	AddItemParams,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	UpdateItemParams,
} from '../_shared/types';

const baseUrl = '/call_center/list';

const getBlacklistList = async (params: ApiParams) => {
	const defaultObject = {
		name: '',
		count: 0,
	};

	const requestParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		camelToSnake(),
		(params) => ({
			...params,
			q: params.search,
		}),
		sanitize([
			'page',
			'size',
			'q',
			'sort',
			'fields',
			'id',
		]),
	]);

	try {
		const response = await getListService().searchList(requestParams);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				mergeEach(defaultObject),
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getBlacklist = async ({ itemId: id }: GetItemParams) => {
	try {
		const response = await getListService().readList(String(id));
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
	'description',
];

const addBlacklist = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getListService().createList(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateBlacklist = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getListService().updateList(String(id), item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteBlacklist = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getListService().deleteList(String(id));
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};
const getBlacklistsLookup = (params: Parameters<typeof getBlacklistList>[0]) =>
	getBlacklistList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const BlacklistsAPI = {
	getList: getBlacklistList,
	get: getBlacklist,
	add: addBlacklist,
	update: updateBlacklist,
	delete: deleteBlacklist,
	getLookup: getBlacklistsLookup,

	...generatePermissionsApi(baseUrl),
};
