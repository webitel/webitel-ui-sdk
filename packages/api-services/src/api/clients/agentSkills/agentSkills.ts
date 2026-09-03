import { getAgentSkillService } from '../../../gen-wire';
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
import type {
	ApiId,
	ApiParams,
	NestedAddItemParams,
	NestedDeleteItemParams,
	NestedGetItemParams,
	NestedPatchItemParams,
	NestedUpdateItemParams,
} from '../_shared/types';

const defaultObject = {
	skill: {},
	capacity: 0,
	enabled: false,
};

const fieldsToSend = [
	'capacity',
	'agentId',
	'skill',
	'enabled',
];

const preRequestHandler = (parentId: ApiId) => (item: ApiParams) => ({
	...item,
	agentId: parentId,
});

const getAgentSkillsList = async (params: ApiParams) => {
	const { parentId, page, size, search, sort, fields, id } = applyTransform(
		params,
		[
			merge(getDefaultGetParams()),
			starToSearch('search'),
		],
	);

	try {
		const response = await getAgentSkillService().searchAgentSkill(
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

const getAgentSkill = async ({ parentId, itemId: id }: NestedGetItemParams) => {
	try {
		const response = await getAgentSkillService().readAgentSkill(
			String(parentId),
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

const addAgentSkill = async ({
	parentId,
	itemInstance,
}: NestedAddItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler(parentId),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getAgentSkillService().createAgentSkill(
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

const patchAgentSkill = async ({
	parentId,
	changes,
	id,
}: NestedPatchItemParams) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getAgentSkillService().patchAgentSkill(
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

const updateAgentSkill = async ({
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
		const response = await getAgentSkillService().updateAgentSkill(
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

const deleteAgentSkill = async ({ parentId, id }: NestedDeleteItemParams) => {
	try {
		const response = await getAgentSkillService().deleteAgentSkill(
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

export const AgentSkillsAPI = {
	getList: getAgentSkillsList,
	get: getAgentSkill,
	add: addAgentSkill,
	patch: patchAgentSkill,
	update: updateAgentSkill,
	delete: deleteAgentSkill,
};
