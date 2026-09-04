import deepCopy from 'deep-copy';

import { getDevices } from '../../../gen-wire';
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

const baseUrl = '/devices';

const fieldsToSend = [
	'name',
	'account',
	'password',
	'user',
	'mac',
	'ip',
	'brand',
	'model',
	'phone',
	'hotdesks',
	'hotdesk',
];

const getDevicesList = async (params: ApiParams) => {
	const listFieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
	];

	const defaultObject = {
		state: 0,
	};

	const requestParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params) => ({
			...params,
			q: params.search,
		}),
		sanitize(listFieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getDevices().searchDevice(requestParams);
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

const getDevice = async ({ itemId: id }: GetItemParams) => {
	const defaultObject = {
		state: 0,
		hotdesks: [],
		hotdesk: false,
	};

	try {
		const response = await getDevices().readDevice(String(id));
		return applyTransform(response.data, [
			snakeToCamel(),
			merge(defaultObject),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

/** An empty password means "keep the current one", so it must not be sent. */
const preRequestHandler = (item: ApiParams) => {
	const copy = deepCopy(item);
	if (!copy.password) copy.password = undefined;
	return copy;
};

const addDevice = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getDevices().createDevice(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateDevice = async ({ itemInstance, itemId: id }: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getDevices().updateDevice(String(id), item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteDevice = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getDevices().deleteDevice(String(id));
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getDevicesLookup = (params: Parameters<typeof getDevicesList>[0]) =>
	getDevicesList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

const getDeviceHistory = async ({ parentId, from, to, ...rest }: ApiParams) => {
	const historyFieldsToSend = [
		'page',
		'size',
		'search',
		'fields',
		'id',
		'timeFrom',
		'timeTo',
	];

	const requestParams = applyTransform(
		{
			...rest,
			timeFrom: from,
			timeTo: to,
		},
		[
			merge(getDefaultGetParams()),
			starToSearch('search'),
			(params) => ({
				...params,
				q: params.search,
			}),
			sanitize(historyFieldsToSend),
			camelToSnake(),
		],
	);

	try {
		const response = await getDevices().searchDeviceAudit(
			String(parentId),
			requestParams,
		);
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

export const DevicesAPI = {
	getList: getDevicesList,
	get: getDevice,
	add: addDevice,
	update: updateDevice,
	delete: deleteDevice,
	getLookup: getDevicesLookup,

	getDeviceHistory,

	...generatePermissionsApi(baseUrl),
};
