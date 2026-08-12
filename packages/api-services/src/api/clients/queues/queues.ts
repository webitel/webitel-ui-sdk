import deepCopy from 'deep-copy';
import deepmerge from 'deepmerge';
import { isEmpty } from 'lodash-es';
import { QueueServiceApiFactory } from 'webitel-sdk';
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
	mergeEach,
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
	PatchItemParams,
	UpdateItemParams,
} from '../_shared/types';
import processing from './defaults/processing';
import { getQueueDefaults } from './defaults/queueTypeDefaults';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const queueService = QueueServiceApiFactory(configuration, '', instance);

const baseUrl = '/call_center/queues';

const doNotConvertKeys = [
	'variables',
];

/**
 * Deliberately an explicit list rather than
 * `getShallowFieldsToSendFromZodSchema(queueSchema)`. The schema also declares
 * `formSchema`, which this whitelist has never sent, so deriving it would start
 * writing a field the backend has not been receiving — a behaviour change that
 * does not belong in a refactor.
 *
 * `maxOfRetry`, `timeout` and `secBetweenRetries` are gone: they appeared
 * nowhere in the workspace except this list and its two copies, so nothing ever
 * populated them.
 */
const fieldsToSend = [
	'name',
	'type',
	'strategy',
	'team',
	'priority',
	'dncList',
	'schema',
	'payload',
	'taskProcessing',
	'variables',
	'calendar',
	'description',
	'enabled',
	'ringtone',
	'doSchema',
	'afterSchema',
	'stickyAgent',
	'grantee',
	'tags',
];

const preRequestHandler = (item: ApiParams) => {
	const copy = deepCopy(item);
	copy.variables = copy.variables.reduce(
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
	const defaultObject = {
		type: 0,
		enabled: false,
		active: 0,
		waiting: 0,
		priority: '0',
	};

	const { page, size, search, sort, fields, id, queueType, team, tags } =
		applyTransform(params, [
			merge(getDefaultGetParams()),
			starToSearch('search'),
		]);

	try {
		const response = await queueService.searchQueue(
			page,
			size,
			search,
			sort,
			fields,
			id,
			queueType,
			team,
			tags,
		);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
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

const getQueue = async ({ itemId: id }: GetItemParams) => {
	const defaultObject = {
		tags: [],
		type: 0,
		formSchema: {},
		taskProcessing: {},
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
	try {
		const response = await queueService.readQueue(String(id));
		return applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
			merge(defaultObject),
			responseHandler,
			mergeTypeDefaults,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addQueue = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(doNotConvertKeys),
	]);
	try {
		const response = await queueService.createQueue(item);
		return applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateQueue = async ({ itemInstance, itemId: id }: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(doNotConvertKeys),
	]);
	try {
		const response = await queueService.updateQueue(String(id), item);
		return applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchQueue = async ({ id, changes }: PatchItemParams) => {
	const item = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(doNotConvertKeys),
	]);
	try {
		const response = await queueService.patchQueue(String(id), item);
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
		const response = await queueService.deleteQueue(String(id));
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
		const response = await queueService.searchQueueTags(
			page,
			size,
			search,
			sort,
			fields,
		);
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

export const QueuesAPI = {
	getList: getQueuesList,
	get: getQueue,
	add: addQueue,
	patch: patchQueue,
	update: updateQueue,
	delete: deleteQueue,
	getLookup: getQueuesLookup,
	getQueuesTags,
	// `getPermissionsList` + `patchPermissions`, the pair PermissionsApiModule
	// adapts for ui-datalist's permissions page.
	...generatePermissionsApi(baseUrl),
};
