import deepCopy from 'deep-copy';
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
import type {
	AddItemParams,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	PatchItemParams,
	UpdateItemParams,
} from '../_shared/types';
import processing from './defaults/processing';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const queueService = QueueServiceApiFactory(configuration, '', instance);

const doNotConvertKeys = [
	'variables',
];

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
	'maxOfRetry',
	'timeout',
	'secBetweenRetries',
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
	try {
		const response = await queueService.readQueue(String(id));
		return applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
			merge(defaultObject),
			responseHandler,
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

export const QueuesAPI = {
	getList: getQueuesList,
	get: getQueue,
	add: addQueue,
	patch: patchQueue,
	update: updateQueue,
	delete: deleteQueue,
	getLookup: getQueuesLookup,
	getQueuesTags,
};
