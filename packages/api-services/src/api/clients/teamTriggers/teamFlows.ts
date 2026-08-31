import { getTeamTriggerService } from '../../../gen-wire';
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

const fieldsToSend = [
	'name',
	'schema',
	'enabled',
	'description',
];

const preRequestHandler = (parentId: ApiId) => (item: ApiParams) => ({
	...item,
	teamId: parentId,
});

const getTeamFlowsList = async (params: ApiParams) => {
	const defaultObject = {
		enabled: false,
	};

	const { page, size, search, sort, fields, id, enabled, parentId } =
		applyTransform(params, [
			merge(getDefaultGetParams()),
			starToSearch('search'),
		]);

	try {
		const response = await getTeamTriggerService().searchTeamTrigger(
			String(parentId),
			{
				page,
				size,
				// the generated param is `q`; `search` is what the datalist store sends
				q: search,
				sort,
				fields,
				enabled,
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

const getTeamFlow = async ({ parentId, itemId: id }: NestedGetItemParams) => {
	const defaultObject = {
		name: '',
		description: '',
		enabled: false,
		schema: {},
	};

	try {
		const response = await getTeamTriggerService().readTeamTrigger(
			String(parentId),
			Number(id),
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

const addTeamFlow = async ({ parentId, itemInstance }: NestedAddItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler(parentId),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getTeamTriggerService().createTeamTrigger(
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

const patchTeamFlow = async ({
	parentId,
	changes,
	id,
}: NestedPatchItemParams) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getTeamTriggerService().patchTeamTrigger(
			String(parentId),
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

const updateTeamFlow = async ({
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
		const response = await getTeamTriggerService().updateTeamTrigger(
			String(parentId),
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

const deleteTeamFlow = async ({ parentId, id }: NestedDeleteItemParams) => {
	try {
		const response = await getTeamTriggerService().deleteTeamTrigger(
			String(parentId),
			Number(id),
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const TeamFlowsAPI = {
	getList: getTeamFlowsList,
	get: getTeamFlow,
	add: addTeamFlow,
	patch: patchTeamFlow,
	update: updateTeamFlow,
	delete: deleteTeamFlow,
};
