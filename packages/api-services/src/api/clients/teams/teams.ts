import { AgentTeamServiceApiFactory } from 'webitel-sdk';
import {
	getDefaultGetListResponse,
	getDefaultGetParams,
	getDefaultInstance,
	getDefaultOpenAPIConfig,
} from '../../defaults';
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
	AddItemParams,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	UpdateItemParams,
} from '../_shared/types';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const teamService = AgentTeamServiceApiFactory(configuration, '', instance);

const fieldsToSend = [
	'name',
	'description',
	'strategy',
	'admin',
	'maxNoAnswer',
	'wrapUpTime',
	'noAnswerDelayTime',
	'taskAcceptTimeout',
	'callTimeout',
	'inviteChatTimeout',
];

const getTeamsList = async (params: ApiParams) => {
	const { page, size, search, sort, fields, id, strategy, adminId } =
		applyTransform(params, [
			merge(getDefaultGetParams()),
			starToSearch('search'),
		]);

	try {
		const response = await teamService.searchAgentTeam(
			page,
			size,
			search,
			sort,
			fields,
			id,
			strategy,
			adminId,
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

const getTeam = async ({ itemId: id }: GetItemParams) => {
	const defaultObject = {
		name: '',
		strategy: {},
		admin: [],
		description: '',
		busyDelayTime: 0,
		callTimeout: 0,
		maxNoAnswer: 0,
		noAnswerDelayTime: 0,
		taskAcceptTimeout: 0,
		inviteChatTimeout: 0,
		rejectDelayTime: 0,
		wrapUpTime: 0,
	};

	try {
		const response = await teamService.readAgentTeam(id);
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

const addTeam = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await teamService.createAgentTeam(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateTeam = async ({ itemInstance, itemId: id }: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await teamService.updateAgentTeam(id, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteTeam = async ({ id }: DeleteItemParams) => {
	try {
		const response = await teamService.deleteAgentTeam(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getTeamsLookup = (params: Parameters<typeof getTeamsList>[0]) =>
	getTeamsList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const TeamsAPI = {
	getList: getTeamsList,
	get: getTeam,
	add: addTeam,
	update: updateTeam,
	delete: deleteTeam,
	getLookup: getTeamsLookup,
};
