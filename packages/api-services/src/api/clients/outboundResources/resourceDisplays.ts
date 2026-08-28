import { getOutboundResourceService } from '../../../gen-wire';
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
	'display',
	'resourceId',
];

const preRequestHandler = (parentId: ApiId) => (item: ApiParams) => ({
	...item,
	resourceId: parentId,
});

const getResourceDisplaysList = async (params: ApiParams) => {
	const { page, size, search, sort, fields, id, parentId } = applyTransform(
		params,
		[
			merge(getDefaultGetParams()),
			starToSearch('search'),
		],
	);

	try {
		const response =
			await getOutboundResourceService().searchOutboundResourceDisplay(
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

const getResourceDisplay = async ({
	parentId,
	itemId: id,
}: NestedGetItemParams) => {
	try {
		const response =
			await getOutboundResourceService().readOutboundResourceDisplay(
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

const addResourceDisplay = async ({
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
			await getOutboundResourceService().createOutboundResourceDisplay(
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

const updateResourceDisplay = async ({
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
			await getOutboundResourceService().updateOutboundResourceDisplay(
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

const deleteResourceDisplay = async ({
	parentId,
	id,
}: NestedDeleteItemParams) => {
	try {
		const response =
			await getOutboundResourceService().deleteOutboundResourceDisplay(
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

export const ResourceDisplaysAPI = {
	getList: getResourceDisplaysList,
	get: getResourceDisplay,
	add: addResourceDisplay,
	update: updateResourceDisplay,
	delete: deleteResourceDisplay,
};
