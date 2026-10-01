import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { queueSchema } from '@webitel/api-services/validations';
import deepCopy from 'deep-copy';
import deepmerge from 'deepmerge';
import { isEmpty } from 'lodash-es';
import { QueuePeriod, QueueType } from '../../../enums';
import { getQueueService } from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	mergeEach,
	notify,
	sanitizeToWire,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import { generatePermissionsApi } from '../_shared/generatePermissionsApi';
import type {
	AddItemParams,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	PatchItemParams,
	UpdateItemParams,
} from '../_shared/types';
import { processing } from './defaults/processing';
import { getQueueDefaults } from './defaults/queueTypeDefaults';

const baseUrl = '/call_center/queues';

const doNotConvertKeys = [
	'variables',
];

/**
 * Derived from the schema, so the form and the request cannot drift apart.
 *
 * Note this sends top-level `formSchema`, which the previous hand-written list
 * omitted even though chat queues seed it and the service accepts it.
 */
const fieldsToSend = getShallowFieldsToSendFromZodSchema(queueSchema);

/**
 * proto3 omits zero values on the wire, and `OFFLINE_QUEUE` is `0` — so an
 * offline queue comes back with no `type` key at all.
 *
 * This is not cosmetic: everything downstream keys on `type`. Without it
 * `getQueueDefaults` falls through to the type-agnostic base, the Params tab
 * renders no type-specific controls, and `queueSchema`'s `superRefine` skips
 * the per-type branch entirely — all silently. Restore it before any reader
 * sees the item.
 */
const restoreOmittedType = (item: ApiParams) => ({
	type: QueueType.OFFLINE_QUEUE,
	...item,
});

/**
 * Same proto3 omission, for the columns the table renders directly. Legacy did
 * this via a `defaultObject`; these are the zero values, not form defaults.
 */
const listZeroValues = {
	enabled: false,
	active: 0,
	waiting: 0,
	priority: 0,
};

const preRequestHandler = (item: ApiParams) => {
	const copy = deepCopy(item);
	// a queue whose `variables` the service omitted arrives without the key
	copy.variables = (copy.variables ?? []).reduce(
		(variables: ApiParams, variable: ApiParams) => {
			if (!variable.key) return variables;
			variables[variable.key] = variable.value;
			return variables;
		},
		{},
	);
	return copy;
};

const getQueuesList = async (params: ApiParams) => {
	const { page, size, search, sort, fields, id, queueType, team, tags } =
		applyTransform(params, [
			merge(getDefaultGetParams()),
			starToSearch('search'),
		]);

	try {
		const response = await getQueueService().searchQueue({
			page,
			size,
			// the generated param is `q`; `search` is what the datalist store sends
			q: search,
			sort,
			fields,
			id,
			// the service names these after the fields, not after the filters
			type: queueType,
			team_id: team,
			tags,
		});
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				mergeEach({
					...listZeroValues,
					type: QueueType.OFFLINE_QUEUE,
				}),
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const responseHandler = (item: ApiParams) => {
	const copy = deepCopy(item);
	if (copy.variables) {
		copy.variables = Object.keys(copy.variables).map((key) => ({
			key,
			value: copy.variables[key],
		}));
	}
	if (isEmpty(copy.taskProcessing)) {
		copy.taskProcessing = processing({
			enabled: !!copy.processing,
			formSchema: copy.formSchema,
			sec: copy.processingSec || 0,
			renewalSec: copy.processingRenewalSec || 0,
		});
	}
	return copy;
};

/**
 * Seeds every field the queue's type can use, so the card form has a
 * complete draft. Regle derives its nested `$fields` from state keys, not
 * from the Zod schema, so a key the backend omitted would otherwise have no
 * validation entry — no required marker, no error text, silently.
 *
 * Runs AFTER `responseHandler` on purpose: the handler back-fills
 * `taskProcessing` from the legacy flat fields only while it `isEmpty`, and
 * seeding the defaults first would suppress that. The item stays last in
 * the merge, so real values always win over defaults.
 */
const mergeTypeDefaults = (item: ApiParams) =>
	deepmerge(getQueueDefaults(item.type), item);

/**
 * `add` and `update` answer with the saved queue, and the card store adopts
 * that response as its new state instead of re-reading the queue — so it has
 * to arrive in exactly the shape `get` returns. Without this the form loses
 * the `variables` pair list (the next save then throws), the reconstructed
 * `taskProcessing`, and an offline queue's `type`.
 */
const cardResponseTransforms = [
	snakeToCamel(doNotConvertKeys),
	restoreOmittedType,
	responseHandler,
	mergeTypeDefaults,
];

const getQueue = async ({ itemId: id }: GetItemParams) => {
	try {
		const response = await getQueueService().readQueue(String(id));
		return applyTransform(response.data, cardResponseTransforms);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addQueue = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitizeToWire(fieldsToSend),
		camelToSnake(doNotConvertKeys),
	]);
	try {
		const response = await getQueueService().createQueue(item);
		return applyTransform(response.data, cardResponseTransforms);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateQueue = async ({ itemInstance, itemId: id }: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitizeToWire(fieldsToSend),
		camelToSnake(doNotConvertKeys),
	]);
	try {
		const response = await getQueueService().updateQueue(String(id), item);
		return applyTransform(response.data, cardResponseTransforms);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchQueue = async ({ id, changes }: PatchItemParams) => {
	const item = applyTransform(changes, [
		sanitizeToWire(fieldsToSend),
		camelToSnake(doNotConvertKeys),
	]);
	try {
		const response = await getQueueService().patchQueue(String(id), item);
		return applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteQueue = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getQueueService().deleteQueue(String(id));
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getQueuesLookup = (params: Parameters<typeof getQueuesList>[0]) =>
	getQueuesList({
		...params,
		fields: params.fields || [
			'id',
			'name',
			'type',
		],
	});

const getQueuesTags = async (params: ApiParams) => {
	const { page, size, search, sort, fields } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch(),
		camelToSnake(doNotConvertKeys),
	]);
	try {
		const response = await getQueueService().searchQueueTags({
			page,
			size,
			q: search,
			sort,
			fields,
		});
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
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

export type { QueueDefaults } from './defaults/queueTypeDefaults';
export {
	getQueueDefaults,
	hasQueueTypeDefaults,
	QueueTypeDefaults,
} from './defaults/queueTypeDefaults';

/**
 * `queuePeriod` is a relative-window preset ({@link QueuePeriod}), not a wire
 * value — the service only understands an absolute `joined_at.from`/
 * `joined_at.to` range, so the preset has to be resolved to timestamps before
 * the request goes out.
 */
const resolveJoinedAtWindow = (
	queuePeriod: QueuePeriod = QueuePeriod.TODAY,
) => {
	const end = new Date();
	let start: Date;

	const hour = 60 * 60 * 1000;
	const min = 60 * 1000;

	switch (queuePeriod) {
		case QueuePeriod.SIX_HOURS:
			start = new Date(end.getTime() - 6 * hour);
			break;
		case QueuePeriod.THREE_HOURS:
			start = new Date(end.getTime() - 3 * hour);
			break;
		case QueuePeriod.ONE_HOUR:
			start = new Date(end.getTime() - hour);
			break;
		case QueuePeriod.THIRTY_MINUTES:
			start = new Date(end.getTime() - 30 * min);
			break;
		case QueuePeriod.FIFTEEN_MINUTES:
			start = new Date(end.getTime() - 15 * min);
			break;
		default:
			start = new Date(end);
			start.setHours(0, 0, 0, 0);
			break;
	}

	return {
		joinedAtFrom: start.getTime(),
		joinedAtTo: end.getTime(),
	};
};

const defaultAgentStatusObject = {
	total: 0,
	online: 0,
	pause: 0,
	offline: 0,
	free: 0,
};

const asPercent = (value: number) => (value ? `${+value.toFixed(2)}%` : 0);
const rounded = (value: number) => (value ? +value.toFixed(2) : 0);

/**
 * Aggregated queue performance over a joined-at window — the supervisor queues
 * table. Bridged/abandoned/sl20/sl30 arrive as percent strings and durations
 * are rounded to 2 decimals so the table renders them without a caller-side
 * formatting step; `agentStatus` and `aggs` are defaulted to zero values since
 * a queue with no matching agents omits the field entirely.
 */
const getQueuesReportGeneral = async (params: ApiParams) => {
	const {
		page,
		size,
		queuePeriod,
		fields,
		sort,
		search,
		queue,
		team,
		queueType,
	} = applyTransform(params, [
		merge(getDefaultGetParams()),
		merge({
			search: '',
			sort: '+priority',
		}),
		starToSearch('search'),
	]);
	const { joinedAtFrom, joinedAtTo } = resolveJoinedAtWindow(queuePeriod);

	try {
		const response = await getQueueService().searchQueueReportGeneral({
			page,
			size,
			'joined_at.from': String(joinedAtFrom),
			'joined_at.to': String(joinedAtTo),
			fields,
			sort,
			// the generated param is `q`; `search` is what the datalist store sends
			q: search,
			queue_id: queue,
			team_id: team,
			type: queueType,
		});
		const { items, next, aggs } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: items.map((item: ApiParams) => ({
				...item,
				_isSelected: false,
				count: item.count || 0,
				transferred: item.transferred || 0,
				bridged: asPercent(item.bridged),
				abandoned: asPercent(item.abandoned),
				sumBillSec: rounded(item.sumBillSec),
				avgWrapSec: rounded(item.avgWrapSec),
				avgAsaSec: rounded(item.avgAsaSec),
				avgAwtSec: rounded(item.avgAwtSec),
				avgAhtSec: rounded(item.avgAhtSec),
				sl20: asPercent(item.sl20),
				sl30: asPercent(item.sl30),
				agentStatus: {
					...defaultAgentStatusObject,
					...item.agentStatus,
				},
				members: {
					processing: item.processed || 0,
					waiting: item.waiting || 0,
				},
			})),
			aggs: {
				...defaultAgentStatusObject,
				...aggs,
			},
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const QueuesAPI = {
	getList: getQueuesList,
	get: getQueue,
	add: addQueue,
	patch: patchQueue,
	update: updateQueue,
	delete: deleteQueue,
	getLookup: getQueuesLookup,
	getQueuesTags,
	getReportGeneral: getQueuesReportGeneral,
	// `getPermissionsList` + `patchPermissions`, the pair PermissionsApiModule
	// adapts for ui-datalist's permissions page.
	...generatePermissionsApi(baseUrl),
};
