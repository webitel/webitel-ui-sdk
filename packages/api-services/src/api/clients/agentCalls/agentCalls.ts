import { FormatDateMode } from '../../../enums';
import { getCallService } from '../../../gen-wire';
import { convertDuration } from '../../../scripts';
import { formatDate } from '../../../utils';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type { ApiParams } from '../_shared/types';

const calcTime = (time?: number | string | null) =>
	time ? formatDate(+time, FormatDateMode.TIME) : null;
const calcDuration = (duration?: number | string | null) =>
	duration ? convertDuration(Number(duration)) : null;

// EngineSearchHistoryCallRequest's id-ish fields (agent_id, queue_id, etc.)
// are all string[] on the wire, even though the filters/store send a single id.
const toIdArray = (value: unknown): string[] | undefined => {
	if (value == null || value === '') return undefined;
	return Array.isArray(value)
		? value
		: [
				String(value),
			];
};

const groupFilesByType = (files?: ApiParams[]) => {
	if (!files) return {};
	return files.reduce((acc: Record<string, ApiParams[]>, file: ApiParams) => {
		acc[file.type] = acc[file.type] || [];
		acc[file.type].push(file);
		return acc;
	}, {});
};

const listHandler = (items: ApiParams[]) =>
	items.map((item) => ({
		...item,
		createdAt: item.createdAt
			? formatDate(+item.createdAt, FormatDateMode.DATETIME)
			: null,
		answeredAt: calcTime(item.answeredAt),
		bridgedAt: calcTime(item.bridgedAt),
		queueBridgedAt: calcTime(item.queueBridgedAt),
		joinedAt: calcTime(item.joinedAt),
		leavingAt: calcTime(item.leavingAt),
		hangupAt: calcTime(item.hangupAt),
		reportingAt: calcTime(item.reportingAt),
		duration: calcDuration(item.duration),
		holdSec: calcDuration(item.holdSec),
		waitSec: calcDuration(item.waitSec),
		billSec: calcDuration(item.billSec),
		talkSec: calcDuration(item.talkSec),
		reportingSec: calcDuration(item.reportingSec),
		queueWaitSec: calcDuration(item.queueWaitSec),
		queueDurationSec: calcDuration(item.queueDurationSec),
		scoreRequired: item.scoreRequired ? (+item.scoreRequired).toFixed(2) : null,
		files: groupFilesByType(item.files),
	}));

/** An agent's own call history, shown on their card's "Calls" tab. */
const getAgentCallsList = async ({ options, ...params }: ApiParams) => {
	const defaultParams = {
		search: '',
		sort: '-created_at',
		fields: [],
		skipParent: true,
	};

	const normalized = applyTransform(params, [
		merge(getDefaultGetParams()),
		merge(defaultParams),
		starToSearch('search'),
	]);

	const {
		page,
		size,
		search,
		sort,
		fields,
		createdAtFrom,
		createdAtTo,
		agentId,
		userId,
		rated,
		ratedBy,
		direction,
		directions,
		hasFile,
		hasTranscript,
		queueId,
		teamId,
		contactId,
		domainId,
		ownerId,
		gatewayId,
		number,
		missed,
		skipParent,
	} = normalized;

	const createdAt =
		createdAtFrom || createdAtTo
			? {
					from: createdAtFrom,
					to: createdAtTo,
				}
			: undefined;

	const postBody: Record<string, unknown> = {
		page,
		size,
		sort,
		q: search || undefined,
		createdAt,
		fields: (fields || []).concat([
			'id',
			'files',
		]),
		agentId: toIdArray(agentId),
		userId: toIdArray(userId),
		queueId: toIdArray(queueId),
		teamId: toIdArray(teamId),
		contactId: toIdArray(contactId),
		ownerId: toIdArray(ownerId),
		gatewayId: toIdArray(gatewayId),
		ratedBy: toIdArray(ratedBy),
		direction,
		directions,
		hasFile,
		hasTranscript,
		number,
		missed,
		domainId,
		skipParent,
	};
	if (rated != null) postBody.rated = rated;

	try {
		const response = await getCallService().searchHistoryCallPost(
			applyTransform(postBody, [
				camelToSnake(),
			]),
			options,
		);

		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);

		return {
			items: applyTransform(items, [
				listHandler,
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getAgentCallsLookup = (params: ApiParams) =>
	getAgentCallsList({
		...params,
		fields: params?.fields || [
			'id',
			'destination',
			'state',
			'created_at',
			'files',
		],
		size: params?.size ?? 20,
	});

export const AgentCallsAPI = {
	getList: getAgentCallsList,
	getLookup: getAgentCallsLookup,
};
