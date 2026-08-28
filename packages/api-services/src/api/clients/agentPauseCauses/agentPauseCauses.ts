import { getAgentPauseCauseService } from '../../../gen-wire';
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
	AddItemParams,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	PatchItemParams,
	UpdateItemParams,
} from '../_shared/types';

const defaultObject = {
	name: '',
	limitMin: 0,
	allowAdmin: false,
	allowSupervisor: false,
	allowAgent: false,
};

const fieldsToSend = [
	'name',
	'limitMin',
	'allowAdmin',
	'allowSupervisor',
	'allowAgent',
	'description',
];

const getAgentPauseCausesList = async (params: ApiParams) => {
	const { page, size, search, sort, fields, id } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		camelToSnake(),
	]);

	try {
		const response = await getAgentPauseCauseService().searchAgentPauseCause({
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

const getAgentPauseCause = async ({ itemId: id }: GetItemParams) => {
	try {
		const response = await getAgentPauseCauseService().readAgentPauseCause(
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

const addAgentPauseCause = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response =
			await getAgentPauseCauseService().createAgentPauseCause(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchAgentPauseCause = async ({ changes, id }: PatchItemParams) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getAgentPauseCauseService().patchAgentPauseCause(
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

const updateAgentPauseCause = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getAgentPauseCauseService().updateAgentPauseCause(
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

const deleteAgentPauseCause = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getAgentPauseCauseService().deleteAgentPauseCause(
			Number(id),
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getAgentPauseCausesLookup = (
	params: Parameters<typeof getAgentPauseCausesList>[0],
) =>
	getAgentPauseCausesList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const AgentPauseCausesAPI = {
	getList: getAgentPauseCausesList,
	get: getAgentPauseCause,
	add: addAgentPauseCause,
	patch: patchAgentPauseCause,
	update: updateAgentPauseCause,
	delete: deleteAgentPauseCause,
	getLookup: getAgentPauseCausesLookup,
};
