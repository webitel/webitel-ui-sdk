import { getAgentService } from '../../../gen-wire';
//  @author @Lera
// fixme: change on library
//  https://webitel.atlassian.net/browse/WTEL-7842?focusedCommentId=702198
//
import { convertDuration } from '../../../scripts';
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
	ApiId,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	PatchItemParams,
	UpdateItemParams,
} from '../_shared/types';

const convertStatusDuration = (value: number) => {
	if (value > 60 * 60 * 24) return '>24:00:00';
	return convertDuration(value);
};

const getAgentsList = async (params: ApiParams) => {
	const listResponseHandler = (items: ApiParams[]) => {
		return items.map((item) => ({
			...item,
			statusDuration: convertStatusDuration(item.statusDuration),
		}));
	};
	const fieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
		'allow_channels',
		'team_id',
		'region_id',
		'auditor_id',
		'skill_id',
		'queue_id',
		'is_supervisor',
		'not_supervisor',
		'user_id',
		'not_team_id',
		'supervisor_id',
		'not_skill_id',
		'not_user_id',
	];
	const requestParams = applyTransform(params, [
		camelToSnake(),
		merge(getDefaultGetParams()),
		(params) => ({
			...params,
			q: params.search,
			/*
			 * Callers spell these filters after the entity rather than the
			 * generated query param. Left unmapped they were sanitized away and
			 * the filter silently did nothing.
			 */
			team_id: params.team_id ?? params.team,
			skill_id: params.skill_id ?? params.skill,
			not_supervisor: params.not_supervisor ?? params.is_not_supervisor,
		}),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await getAgentService().searchAgent(requestParams);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				listResponseHandler,
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const AGENT_DEFAULTS = {
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

/**
 * `defaultObject` overrides the defaults merged into the response. Cards that
 * bind a validated numeric field need `null` rather than `0` for "unset", so
 * they pass their own.
 */
const getAgent = async ({
	itemId: id,
	defaultObject = AGENT_DEFAULTS,
}: GetItemParams & {
	defaultObject?: ApiParams;
}) => {
	try {
		const response = await getAgentService().readAgent(String(id));
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
	'screenControl',
	'extraChatCount',
];

const addAgent = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getAgentService().createAgent(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchAgent = async ({ changes, id }: PatchItemParams) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getAgentService().patchAgent(String(id), body);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateAgent = async ({ itemInstance, itemId: id }: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getAgentService().updateAgent(String(id), item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteAgent = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getAgentService().deleteAgent(String(id));
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

/**
 * Per-agent status/occupancy statistics over a time window — the supervisor
 * agents table. Durations come back raw; formatting them is the caller's job.
 */
const getAgentStatusStatistics = async (params: ApiParams) => {
	const {
		page,
		size,
		search,
		sort,
		ids,
		fields,
		from,
		to,
		status,
		queue,
		team,
		skill,
		supervisor,
		auditor,
		region,
		utilizationFrom,
		utilizationTo,
		callNow,
	} = applyTransform(params, [
		merge(getDefaultGetParams()),
	]);

	try {
		const response = await getAgentService().searchAgentStatusStatistic({
			page,
			size,
			// the generated param is `q`; `search` is what the datalist store sends
			q: search,
			sort,
			fields,
			agent_id: ids,
			'time.from': from,
			'time.to': to,
			status,
			queue_id: queue,
			team_id: team,
			'utilization.from': utilizationFrom,
			'utilization.to': utilizationTo,
			has_call: callNow,
			skill_id: skill,
			region_id: region,
			supervisor_id: supervisor,
			auditor_id: auditor,
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
		throw applyTransform(err, [
			notify,
		]);
	}
};

/** The same statistics for a single agent. */
const getAgentStatusStatisticsItem = async ({
	agentId,
	from,
	to,
}: {
	agentId: ApiId;
	from?: string;
	to?: string;
}) => {
	try {
		const response = await getAgentService().searchAgentStatusStatisticItem(
			String(agentId),
			{
				'time.from': from,
				'time.to': to,
			},
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

/** Queues the given agent is assigned to. */
const getAgentQueues = async (params: ApiParams) => {
	const { parentId, page, size, search, sort, fields } = applyTransform(
		params,
		[
			merge(getDefaultGetParams()),
			starToSearch('search'),
		],
	);

	try {
		const response = await getAgentService().searchAgentInQueue(
			String(parentId),
			{
				page,
				size,
				// the generated param is `q`; `search` is what the datalist store sends
				q: search,
				sort,
				fields,
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

/** Pause causes the given agent is allowed to select. */
const getPauseCausesForAgent = async ({ agentId }: { agentId: ApiId }) => {
	const defaultObject = {
		name: '',
		durationMin: 0,
		limitMin: 0,
	};

	try {
		const response = await getAgentService().searchPauseCauseForAgent(
			String(agentId),
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

const getAgentsLookup = (params: Parameters<typeof getAgentsList>[0]) =>
	getAgentsList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

const getAgentHistory = async (params: ApiParams) => {
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
			agent_id: parentId
				? [
						parentId,
					]
				: undefined,
			sort,
			'joined_at.from': from,
			'joined_at.to': to,
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
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getAgentUsersOptions = async (params: ApiParams) => {
	const { page, size, search } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response = await getAgentService().searchLookupUsersAgentNotExists({
			page,
			size,
			q: search,
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
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getUsersStatus = async (params: ApiParams) => {
	const fieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'not_user_id',
	];
	const requestParams = applyTransform(params, [
		camelToSnake(),
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params) => ({
			...params,
			q: params.search,
		}),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await getAgentService().searchUserStatus(requestParams);
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
const getSupervisorOptions = async (params: ApiParams) => {
	const isSupervisor = true;
	return getAgentsList({
		...params,
		isSupervisor,
	});
};

const getRegularAgentsOptions = async (params: ApiParams) => {
	const isNotSupervisor = true;
	return getAgentsList({
		...params,
		isNotSupervisor,
	});
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
	getUsersStatus,
	getPauseCausesForAgent,
	getAgentQueues,
	getStatusStatistics: getAgentStatusStatistics,
	getStatusStatisticsItem: getAgentStatusStatisticsItem,
};
