import deepCopy from 'deep-copy';
import { getOutboundResourceGroupService } from '../../../gen-wire';
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
import { generatePermissionsApi } from '../_shared/generatePermissionsApi';
import type {
	AddItemParams,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	UpdateItemParams,
} from '../_shared/types';

const baseUrl = '/call_center/resource_group';

const fieldsToSend = [
	'name',
	'description',
	'strategy',
	'communication',
	'time',
];

/*
 * The form models a time range as `{ start, end }`, the API as
 * `{ startTimeOfDay, endTimeOfDay }`. `getResourceGroup` maps them back.
 */
const preRequestHandler = (item: ApiParams) => {
	const copy = deepCopy(item);
	copy.time = copy.time.map((range: ApiParams) => ({
		startTimeOfDay: range.start,
		endTimeOfDay: range.end,
	}));
	return copy;
};

const getResourceGroupsList = async (params: ApiParams) => {
	const { page, size, search, sort, fields, id } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response =
			await getOutboundResourceGroupService().searchOutboundResourceGroup({
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
			items,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getResourceGroup = async ({ itemId: id }: GetItemParams) => {
	const defaultObject = {
		name: '',
		strategy: '',
		description: '',
		communication: {},
		time: [],
	};

	const responseHandler = (response: ApiParams) => {
		const time = response.time.map((range: ApiParams) => ({
			start: range.startTimeOfDay || 0,
			end: range.endTimeOfDay || 0,
		}));
		return {
			...response,
			time,
		};
	};

	try {
		const response =
			await getOutboundResourceGroupService().readOutboundResourceGroup(
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

const addResourceGroup = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response =
			await getOutboundResourceGroupService().createOutboundResourceGroup(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateResourceGroup = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response =
			await getOutboundResourceGroupService().updateOutboundResourceGroup(
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

const deleteResourceGroup = async ({ id }: DeleteItemParams) => {
	try {
		const response =
			await getOutboundResourceGroupService().deleteOutboundResourceGroup(
				String(id),
			);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getResourceGroupsLookup = (
	params: Parameters<typeof getResourceGroupsList>[0],
) =>
	getResourceGroupsList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const OutboundResourceGroupsAPI = {
	getList: getResourceGroupsList,
	get: getResourceGroup,
	add: addResourceGroup,
	update: updateResourceGroup,
	delete: deleteResourceGroup,
	getLookup: getResourceGroupsLookup,

	...generatePermissionsApi(baseUrl),
};
