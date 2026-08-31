import { getTeamHookService } from '../../../gen-wire';
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
	'event',
	'properties',
	'schema',
	'enabled',
];

const preRequestHandler = (parentId: ApiId) => (item: ApiParams) => ({
	...item,
	teamId: parentId,
});

const getTeamHooksList = async (params: ApiParams) => {
	const defaultObject = {
		enabled: false,
	};

	const { page, size, search, sort, fields, id, parentId } = applyTransform(
		params,
		[
			merge(getDefaultGetParams()),
			starToSearch('search'),
		],
	);

	try {
		const response = await getTeamHookService().searchTeamHook(
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

const getTeamHook = async ({ parentId, itemId: id }: NestedGetItemParams) => {
	const defaultObject = {
		event: '',
		properties: [],
		schema: {},
		enabled: false,
	};

	try {
		const response = await getTeamHookService().readTeamHook(
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

const addTeamHook = async ({ parentId, itemInstance }: NestedAddItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler(parentId),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getTeamHookService().createTeamHook(
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

const patchTeamHook = async ({
	parentId,
	changes,
	id,
}: NestedPatchItemParams) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getTeamHookService().patchTeamHook(
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

const updateTeamHook = async ({
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
		const response = await getTeamHookService().updateTeamHook(
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

const deleteTeamHook = async ({ parentId, id }: NestedDeleteItemParams) => {
	try {
		const response = await getTeamHookService().deleteTeamHook(
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

export const TeamHooksAPI = {
	getList: getTeamHooksList,
	get: getTeamHook,
	add: addTeamHook,
	patch: patchTeamHook,
	update: updateTeamHook,
	delete: deleteTeamHook,
};
