import { getSkillService } from '../../../gen-wire';
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
	ApiParams,
	NestedAddItemParams,
	NestedDeleteItemParams,
	NestedGetItemParams,
	NestedPatchItemParams,
	UpdateItemParams,
} from '../_shared/types';

/** Agents holding a given skill. `parentId` is the skill. */
const defaultObject = {
	agent: {},
	skill: {},
	team: {},
	capacity: 10,
	enabled: false,
};

const fieldsToSend = [
	'capacity',
	'skill',
	'team',
	'enabled',
	'agent',
	'user',
	'q',
];

const getSkillAgentsList = async (params: ApiParams) => {
	const { parentId, page, size, search, sort, fields, id, agentId } =
		applyTransform(params, [
			merge(getDefaultGetParams()),
			starToSearch('search'),
		]);

	try {
		const response = await getSkillService().searchSkillAgent(
			String(parentId),
			{
				page,
				size,
				// the generated param is `q`; `search` is what the datalist store sends
				q: search,
				sort,
				fields,
				id,
				agent_id: agentId,
			},
		);
		const { items, next, aggs } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				mergeEach(defaultObject),
			]),
			next,
			aggs,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getSkillAgent = async ({ itemId: id }: NestedGetItemParams) => {
	try {
		const response = await getSkillService().readSkill(String(id));
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addSkillAgent = async ({
	parentId,
	itemInstance,
}: NestedAddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getSkillService().createSkillAgent(
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

/**
 * Bulk edit: the body carries the ids to change, so `id` rides along with the
 * sanitized changes rather than going in the path.
 */
const patchSkillAgent = async ({
	parentId,
	changes,
	id,
}: NestedPatchItemParams) => {
	const sanitizedChanges = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
		starToSearch('q'),
	]);
	try {
		const response = await getSkillService().patchSkillAgent(String(parentId), {
			...sanitizedChanges,
			id,
		});
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateSkillAgent = async ({
	itemId: id,
	itemInstance,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getSkillService().updateSkill(String(id), item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteSkillAgent = async ({ parentId, id }: NestedDeleteItemParams) => {
	try {
		const response = await getSkillService().deleteSkillAgent(
			String(parentId),
			{
				id: [
					String(id),
				],
			},
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const SkillAgentsAPI = {
	getList: getSkillAgentsList,
	get: getSkillAgent,
	add: addSkillAgent,
	patch: patchSkillAgent,
	update: updateSkillAgent,
	delete: deleteSkillAgent,
};
