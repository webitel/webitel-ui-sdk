import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { queueBucketSchema } from '@webitel/api-services/validations';
import { getQueueBucketService } from '../../../gen-wire';
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
	...getShallowFieldsToSendFromZodSchema(queueBucketSchema),
	// injected by preRequestHandler; not part of the form, so not in the schema
	'queueId',
];

const preRequestHandler = (parentId: ApiId) => (item: ApiParams) => ({
	...item,
	queueId: parentId,
});

const getQueueBucketsList = async (params: ApiParams) => {
	const { page, size, search, sort, fields, id, parentId } = applyTransform(
		params,
		[
			merge(getDefaultGetParams()),
			starToSearch('search'),
		],
	);

	try {
		const response = await getQueueBucketService().searchQueueBucket(
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

const getQueueBucket = async ({
	parentId,
	itemId: id,
}: NestedGetItemParams) => {
	try {
		const response = await getQueueBucketService().readQueueBucket(
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

const addQueueBucket = async ({
	parentId,
	itemInstance,
}: NestedAddItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler(parentId),
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getQueueBucketService().createQueueBucket(
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

const updateQueueBucket = async ({
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
		const response = await getQueueBucketService().updateQueueBucket(
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

const patchQueueBucket = async ({
	changes,
	id,
	parentId,
}: NestedPatchItemParams) => {
	const body = applyTransform(changes, [
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getQueueBucketService().patchQueueBucket(
			String(parentId),
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

const deleteQueueBucket = async ({ parentId, id }: NestedDeleteItemParams) => {
	try {
		const response = await getQueueBucketService().deleteQueueBucket(
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

export const QueueBucketsAPI = {
	getList: getQueueBucketsList,
	get: getQueueBucket,
	add: addQueueBucket,
	update: updateQueueBucket,
	delete: deleteQueueBucket,
	patch: patchQueueBucket,
};
