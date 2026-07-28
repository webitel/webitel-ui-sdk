import { ListServiceApiFactory } from 'webitel-sdk';
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
	mergeEach,
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

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const listService = ListServiceApiFactory(configuration, '', instance);

const getBlacklistList = async (params: ApiParams) => {
	const defaultObject = {
		name: '',
		count: 0,
	};

	const { page, size, search, sort, fields, id } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		camelToSnake(),
	]);

	try {
		const response = await listService.searchList(
			page,
			size,
			search,
			sort,
			fields,
			id,
		);
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
		const response = await listService.readList(String(id));
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
		const response = await listService.createList(item);
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
		const response = await listService.updateList(String(id), item);
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
		const response = await listService.deleteList(String(id));
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
};
