import { getAgentService } from '@webitel/api-services/gen'

//  @author @Lera
// fixme: change on library
//  https://webitel.atlassian.net/browse/WTEL-7842?focusedCommentId=702198
//
import { convertDuration } from '../../../scripts';
import {
	getDefaultGetListResponse,
	getDefaultGetParams,
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

const convertStatusDuration = (value) => {
	if (value > 60 * 60 * 24) return '>24:00:00';
	return convertDuration(value);
};

const getAgentsList = async (params) => {
	const listResponseHandler = (items) => {
		return items.map((item) => ({
			...item,
			statusDuration: convertStatusDuration(item.statusDuration),
		}));
	};

	const {
		page,
		size,
		search,
		sort,
		fields,
		id,
    allowChannels,
		team,
    regionId,
    auditorId,
		skill,
    queueId,
		isSupervisor,
		isNotSupervisor,
		userId,
		notTeamId,
		supervisorId,
		notSkillId,
    notUserId
	} = applyTransform(params, [merge(getDefaultGetParams())]);

	try {
		const response = await getAgentService().searchAgent({
      page,
      size,
      search,
      sort,
      fields,
      id,
      allowChannels,
      supervisorId,
      team,
      regionId,
      auditorId,
      isSupervisor,
      skill,
      queueId,
      isNotSupervisor,
      userId,
      notTeamId,
      notSkillId,
      notUserId
    });
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [listResponseHandler]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getAgent = async ({ itemId: id }) => {
	const defaultObject = {
		user: {},
		team: {},
		supervisor: [],
		auditor: [],
		region: {},
		progressiveCount: 0,
		chatCount: 0,
		taskCount: 0,
		isSupervisor: false,
		description: '',
		greetingMedia: {},
	};

	try {
		const response = await getAgentService().readAgent(id);
		return applyTransform(response.data, [
			snakeToCamel(),
			merge(defaultObject),
		]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const fieldsToSend = [
	'user',
	'team',
	'supervisor',
	'auditor',
	'region',
	'greetingMedia',
	'progressiveCount',
	'chatCount',
	'taskCount',
	'isSupervisor',
];

const addAgent = async ({ itemInstance }) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getAgentService().createAgent(item);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const patchAgent = async ({ changes, id }) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getAgentService().patchAgent(id, body);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const updateAgent = async ({ itemInstance, itemId: id }) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getAgentService().updateAgent(id, item);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const deleteAgent = async ({ id }) => {
	try {
		const response = await getAgentService().deleteAgent(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getAgentsLookup = (params) =>
	getAgentsList({
		...params,
		fields: params.fields || ['id', 'name'],
	});

const getAgentHistory = async (params) => {
	const {
		parentId,
		from,
		to,
		page,
		size,
		sort = '-joined_at',
	} = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response = await getAgentService().searchAgentStateHistory({
      page,
      size,
      from,
      to,
      parentId,
      sort,
    });
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getAgentUsersOptions = async (params) => {
	const { page, size, search, sort, fields, id } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response = await getAgentService().searchLookupUsersAgentNotExists({
      page,
      size,
      search,
    });
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};
const getSupervisorOptions = async (params) => {
	const isSupervisor = true;
	return getAgentsList({ ...params, isSupervisor });
};

const getRegularAgentsOptions = async (params) => {
	const isNotSupervisor = true;
	return getAgentsList({ ...params, isNotSupervisor });
};

export const AgentsAPI = {
	getList: getAgentsList,
	get: getAgent,
	add: addAgent,
	patch: patchAgent,
	update: updateAgent,
	delete: deleteAgent,
	getLookup: getAgentsLookup,

	getAgentHistory,
	getRegularAgentsOptions,
	getAgentUsersOptions,
	getSupervisorOptions,
};
