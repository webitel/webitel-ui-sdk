import { getAgentTeamService } from '../../../gen-wire';
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
import { generatePermissionsApi } from '../_shared/generatePermissionsApi';
import type {
	AddItemParams,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	UpdateItemParams,
} from '../_shared/types';

const baseUrl = '/call_center/teams';

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
	'screenControl',
];

const getTeamsList = async (params: ApiParams) => {
	const listFieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
		'strategy',
		'admin_id',
	];
	const requestParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		camelToSnake(),
		(params) => ({
			...params,
			q: params.search,
		}),
		sanitize(listFieldsToSend),
	]);

	try {
		const response = await getAgentTeamService().searchAgentTeam(requestParams);
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
		const response = await getAgentTeamService().readAgentTeam(String(id));
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
		const response = await getAgentTeamService().createAgentTeam(item);
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
		const response = await getAgentTeamService().updateAgentTeam(
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

const deleteTeam = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getAgentTeamService().deleteAgentTeam(String(id));
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

	...generatePermissionsApi(baseUrl),
};
