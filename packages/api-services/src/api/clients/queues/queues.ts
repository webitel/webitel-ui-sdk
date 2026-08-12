import { getQueueService } from '@webitel/api-services/gen';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { queueSchema } from '@webitel/api-services/validations';
import deepCopy from 'deep-copy';
import deepmerge from 'deepmerge';
import { isEmpty } from 'lodash-es';
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
			teamId: team,
			tags,
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

const getQueue = async ({ itemId: id }: GetItemParams) => {
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
		const response = await getQueueService().readQueue(String(id));
		return applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
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
		const response = await getQueueService().createQueue(item);
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
		const response = await getQueueService().updateQueue(String(id), item);
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
