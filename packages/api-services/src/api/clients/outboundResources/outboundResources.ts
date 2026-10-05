import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import {
	CreateOutboundResourceBody,
	getOutboundResourceService,
	PatchOutboundResourceBody,
	SearchOutboundResourceQueryParams,
	UpdateOutboundResourceBody,
} from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	mergeEach,
	notify,
	sanitizeToWire,
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

const getOutboundResourcesList = async (params: ApiParams) => {
	const defaultObject = {
		gateway: null,
		enabled: false,
	};

	const requestParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params: ApiParams) => ({
			...params,
			q: params.q ?? params.search,
		}),
		sanitizeToWire(
			getShallowFieldsToSendFromZodSchema(SearchOutboundResourceQueryParams),
		),
		camelToSnake(),
	]);

	try {
		const response =
			await getOutboundResourceService().searchOutboundResource(requestParams);
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

const getOutboundResource = async ({ itemId: id }: GetItemParams) => {
	const defaultObject = {
		parameters: {
			cidType: '',
			ignoreEarlyMedia: '',
		},
	};

	try {
		const response = await getOutboundResourceService().readOutboundResource(
			String(id),
		);
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

const addOutboundResource = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitizeToWire(
			getShallowFieldsToSendFromZodSchema(CreateOutboundResourceBody),
		),
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

const updateOutboundResource = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitizeToWire(
			getShallowFieldsToSendFromZodSchema(UpdateOutboundResourceBody),
		),
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

const patchOutboundResource = async ({ changes, id }: PatchItemParams) => {
	const body = applyTransform(changes, [
		sanitizeToWire(
			getShallowFieldsToSendFromZodSchema(PatchOutboundResourceBody),
		),
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

const deleteOutboundResource = async ({ id }: DeleteItemParams) => {
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

const getOutboundResourcesLookup = (params: ApiParams) =>
	getOutboundResourcesList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const OutboundResourcesAPI = {
	getList: getOutboundResourcesList,
	get: getOutboundResource,
	add: addOutboundResource,
	update: updateOutboundResource,
	patch: patchOutboundResource,
	delete: deleteOutboundResource,
	getLookup: getOutboundResourcesLookup,

	...generatePermissionsApi(baseUrl),
};
