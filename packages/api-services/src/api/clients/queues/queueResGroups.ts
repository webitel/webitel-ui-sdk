import { getQueueResourcesService } from '@webitel/api-services/gen';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { queueResGroupSchema } from '@webitel/api-services/validations';
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

const service = getQueueResourcesService();

/** No `patch` — the service exposes none, and the tab never offered one. */
const fieldsToSend = [
	...getShallowFieldsToSendFromZodSchema(queueResGroupSchema),
	// injected by preRequestHandler; not part of the form, so not in the schema
	'queueId',
];

const preRequestHandler = (parentId: ApiId) => (item: ApiParams) => ({
	...item,
	queueId: parentId,
});

const getQueueResGroupsList = async (params: ApiParams) => {
	const { parentId, page, size, search, sort, fields, id } = applyTransform(
		params,
		[
			merge(getDefaultGetParams()),
			starToSearch('search'),
		],
	);

	try {
		const response = await service.searchQueueResourceGroup(String(parentId), {
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

const getQueueResGroup = async ({
	parentId,
	itemId: id,
	domainId,
}: NestedGetItemParams & {
	domainId?: string;
}) => {
	try {
		const response = await service.readQueueResourceGroup(
			String(parentId),
			String(id),
			{
				domainId,
			},
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

const addQueueResGroup = async ({
	parentId,
	itemInstance,
}: NestedAddItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler(parentId),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await service.createQueueResourceGroup(
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

const updateQueueResGroup = async ({
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
		const response = await service.updateQueueResourceGroup(
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

const deleteQueueResGroup = async ({
	parentId,
	id,
	domainId,
}: NestedDeleteItemParams & {
	domainId?: string;
}) => {
	try {
		const response = await service.deleteQueueResourceGroup(
			String(parentId),
			String(id),
			{
				domainId,
			},
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const QueueResGroupsAPI = {
	getList: getQueueResGroupsList,
	get: getQueueResGroup,
	add: addQueueResGroup,
	update: updateQueueResGroup,
	delete: deleteQueueResGroup,
};
