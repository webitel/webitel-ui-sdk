import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { queueHookSchema } from '@webitel/api-services/validations';
import { getQueueHookService } from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitizeToWire,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type {
	ApiId,
	ApiParams,
	NestedAddItemParams,
	NestedDeleteItemParams,
	NestedGetItemParams,
	NestedPatchItemParams,
	NestedUpdateItemParams,
} from '../_shared/types';

const fieldsToSend = [
	...getShallowFieldsToSendFromZodSchema(queueHookSchema),
	// injected by preRequestHandler; not part of the form, so not in the schema
	'queueId',
];

const preRequestHandler = (parentId: ApiId) => (item: ApiParams) => ({
	...item,
	queueId: parentId,
});

const getQueueHooksList = async (params: ApiParams) => {
	const { page, size, search, sort, fields, id, parentId } = applyTransform(
		params,
		[
			merge(getDefaultGetParams()),
			starToSearch('search'),
		],
	);

	try {
		const response = await getQueueHookService().searchQueueHook(
			Number(parentId),
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

const getQueueHook = async ({ parentId, itemId: id }: NestedGetItemParams) => {
	try {
		const response = await getQueueHookService().readQueueHook(
			Number(parentId),
			Number(id),
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

const addQueueHook = async ({
	parentId,
	itemInstance,
}: NestedAddItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler(parentId),
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getQueueHookService().createQueueHook(
			Number(parentId),
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

const updateQueueHook = async ({
	itemInstance,
	itemId: id,
	parentId,
}: NestedUpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler(parentId),
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getQueueHookService().updateQueueHook(
			Number(parentId),
			Number(id),
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

const patchQueueHook = async ({
	changes,
	id,
	parentId,
}: NestedPatchItemParams) => {
	const body = applyTransform(changes, [
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getQueueHookService().patchQueueHook(
			Number(parentId),
			Number(id),
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

const deleteQueueHook = async ({ parentId, id }: NestedDeleteItemParams) => {
	try {
		const response = await getQueueHookService().deleteQueueHook(
			Number(parentId),
			Number(id),
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const QueueHooksAPI = {
	getList: getQueueHooksList,
	get: getQueueHook,
	add: addQueueHook,
	patch: patchQueueHook,
	update: updateQueueHook,
	delete: deleteQueueHook,
};
