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
import type {
	ApiId,
	ApiParams,
	NestedAddItemParams,
	NestedDeleteItemParams,
	NestedGetItemParams,
	NestedUpdateItemParams,
} from '../_shared/types';

const fieldsToSend = [
	'groupId',
	'name',
	'description',
	'resource',
	'reserveResource',
	'priority',
];

const preRequestHandler = (parentId: ApiId) => (item: ApiParams) => ({
	...item,
	groupId: parentId,
});

const getResourcesInGroupList = async (params: ApiParams) => {
	const { page, size, search, sort, fields, id, parentId } = applyTransform(
		params,
		[
			merge(getDefaultGetParams()),
			starToSearch('search'),
		],
	);

	try {
		const response =
			await getOutboundResourceGroupService().searchOutboundResourceInGroup(
				String(parentId),
				{
					page,
					size,
					// the generated param is `q`; `search` is what the datalist store sends
					q: search,
					sort,
					fields,
					id,
				},
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

const getResourceInGroup = async ({
	parentId,
	itemId: id,
}: NestedGetItemParams) => {
	try {
		const response =
			await getOutboundResourceGroupService().readOutboundResourceInGroup(
				String(parentId),
				String(id),
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

const addResourceInGroup = async ({
	parentId,
	itemInstance,
}: NestedAddItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler(parentId),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response =
			await getOutboundResourceGroupService().createOutboundResourceInGroup(
				String(parentId),
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

const updateResourceInGroup = async ({
	parentId,
	itemInstance,
	itemId: id,
}: NestedUpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler(parentId),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response =
			await getOutboundResourceGroupService().updateOutboundResourceInGroup(
				String(parentId),
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

const deleteResourceInGroup = async ({
	parentId,
	id,
}: NestedDeleteItemParams) => {
	try {
		const response =
			await getOutboundResourceGroupService().deleteOutboundResourceInGroup(
				String(parentId),
				String(id),
			);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const ResourcesInGroupAPI = {
	getList: getResourcesInGroupList,
	get: getResourceInGroup,
	add: addResourceInGroup,
	update: updateResourceInGroup,
	delete: deleteResourceInGroup,
};
