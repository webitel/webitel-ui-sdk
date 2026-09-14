import deepCopy from 'deep-copy';
import { getOutboundResourceService } from '../../../gen-wire';
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
	PatchItemParams,
	UpdateItemParams,
} from '../_shared/types';

const baseUrl = '/call_center/resources';

const fieldsToSend = [
	'limit',
	'enabled',
	'rps',
	'maxSuccessivelyErrors',
	'name',
	'errorIds',
	'display',
	'description',
	'resourceId',
	'gateway',
	'patterns',
	'failureDialDelay',
	'parameters',
];

/*
 * The form binds `maxErrors` / `cps`, the API expects
 * `maxSuccessivelyErrors` / `rps`. `getResource` maps them back.
 */
const preRequestHandler = (item: ApiParams) => {
	const copy = deepCopy(item);
	copy.maxSuccessivelyErrors = copy.maxErrors;
	copy.rps = copy.cps;
	return copy;
};

const getResourcesList = async (params: ApiParams) => {
	const defaultObject = {
		gateway: null,
		enabled: false,
	};

	const { page, size, search, sort, fields, id } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response = await getOutboundResourceService().searchOutboundResource({
			page,
			size,
			// the generated param is `q`; `search` is what the datalist store sends
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

const getResource = async ({ itemId: id }: GetItemParams) => {
	const defaultObject = {
		name: '',
		gateway: {},
		rps: 0,
		limit: 0,
		description: '',
		maxSuccessivelyErrors: 0,
		errorIds: [],
		patterns: [],
		failureDialDelay: 0,
		parameters: {
			cidType: '',
			ignoreEarlyMedia: '',
		},
	};

	const responseHandler = (response: ApiParams) => {
		const copy = deepCopy(response);
		copy.maxErrors = copy.maxSuccessivelyErrors;
		copy.cps = copy.rps;
		copy.parameters = {
			...defaultObject.parameters,
			...copy.parameters,
		};
		return copy;
	};

	try {
		const response = await getOutboundResourceService().readOutboundResource(
			String(id),
		);
		return applyTransform(response.data, [
			snakeToCamel(),
			merge(defaultObject),
			responseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addResource = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response =
			await getOutboundResourceService().createOutboundResource(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateResource = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getOutboundResourceService().updateOutboundResource(
			String(id),
			item,
		);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchResource = async ({ changes, id }: PatchItemParams) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getOutboundResourceService().patchOutboundResource(
			String(id),
			body,
		);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteResource = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getOutboundResourceService().deleteOutboundResource(
			String(id),
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getResourcesLookup = (params: Parameters<typeof getResourcesList>[0]) =>
	getResourcesList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const OutboundResourcesAPI = {
	getList: getResourcesList,
	get: getResource,
	add: addResource,
	patch: patchResource,
	update: updateResource,
	delete: deleteResource,
	getLookup: getResourcesLookup,

	...generatePermissionsApi(baseUrl),
};
