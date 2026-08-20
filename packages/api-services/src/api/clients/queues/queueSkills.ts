import { getQueueSkillService } from '@webitel/api-services/gen';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { queueSkillSchema } from '@webitel/api-services/validations';
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
	NestedPatchItemParams,
	NestedUpdateItemParams,
} from '../_shared/types';

const fieldsToSend = [
	...getShallowFieldsToSendFromZodSchema(queueSkillSchema),
	// injected by preRequestHandler; not part of the form, so not in the schema
	'queueId',
];

const preRequestHandler = (parentId: ApiId) => (item: ApiParams) => ({
	...item,
	queueId: parentId,
});

const getQueueSkillsList = async (params: ApiParams) => {
	const { page, size, search, sort, fields, id, parentId, skillId } =
		applyTransform(params, [
			merge(getDefaultGetParams()),
			starToSearch('search'),
		]);

	try {
		const response = await getQueueSkillService().searchQueueSkill(
			Number(parentId),
			{
				page,
				size,
				// the generated param is `q`; `search` is what the datalist store sends
				q: search,
				sort,
				fields,
				id,
				skillId,
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

const getQueueSkill = async ({ parentId, itemId: id }: NestedGetItemParams) => {
	try {
		const response = await getQueueSkillService().readQueueSkill(
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

const addQueueSkill = async ({
	parentId,
	itemInstance,
}: NestedAddItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler(parentId),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getQueueSkillService().createQueueSkill(
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

const updateQueueSkill = async ({
	itemInstance,
	itemId: id,
	parentId,
}: NestedUpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler(parentId),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getQueueSkillService().updateQueueSkill(
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

const patchQueueSkill = async ({
	changes,
	id,
	parentId,
}: NestedPatchItemParams) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getQueueSkillService().patchQueueSkill(
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

const deleteQueueSkill = async ({ parentId, id }: NestedDeleteItemParams) => {
	try {
		const response = await getQueueSkillService().deleteQueueSkill(
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

export const QueueSkillsAPI = {
	getList: getQueueSkillsList,
	get: getQueueSkill,
	add: addQueueSkill,
	patch: patchQueueSkill,
	update: updateQueueSkill,
	delete: deleteQueueSkill,
};
