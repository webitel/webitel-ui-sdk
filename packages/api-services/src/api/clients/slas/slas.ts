import { SLAsApiFactory } from 'webitel-sdk';
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
import type {
	AddItemParams,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	UpdateItemParams,
} from '../_shared/types';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const slaService = SLAsApiFactory(configuration, '', instance);

const fieldsToSend = [
	'name',
	'description',
	'valid_from',
	'valid_to',
	'calendar',
	'reaction_time',
	'resolution_time',
];

const getSlasList = async (params: ApiParams) => {
	const fieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
	];

	const { page, size, fields, sort, id, q } = applyTransform(params, [
		merge(getDefaultGetParams()),
		(params) => ({
			...params,
			q: params.search,
		}),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await slaService.listSLAs(page, size, fields, sort, id, q);
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
	const itemResponseHandler = (item: ApiParams) => {
		return item.sla;
	};

	try {
		const response = await slaService.locateSLA(String(id), fieldsToSend);
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
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);
	try {
		const response = await slaService.createSLA(item);
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
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);
	try {
		const response = await slaService.updateSLA(String(id), item);
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
		const response = await slaService.deleteSLA(String(id));
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
