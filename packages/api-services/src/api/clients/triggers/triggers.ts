import deepCopy from 'deep-copy';
import { getTriggerService } from '../../../gen-wire';
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

/**
 * `variables` is a free-form string map; its keys are user data, not API
 * fields, so the case transformers must leave them alone.
 */
const doNotConvertKeys = [
	'variables',
];

const fieldsToSend = [
	'description',
	'enabled',
	'id',
	'name',
	'schema',
	'timeout',
	'timezone',
	'type',
	'variables',
	'expression',
	'event',
	'object',
];

/**
 * The form binds `variables` as a `{ key, value }[]`, the API takes a map.
 * `type`, `event` and `object` are bound as lookup objects; only the value
 * goes over the wire.
 */
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
	return {
		...copy,
		type: copy?.type?.value ?? copy?.type,
		event: copy?.event?.value ?? copy?.event,
		object: copy?.object?.value ?? copy?.object,
	};
};

const getTriggersList = async (params: ApiParams) => {
	const listFieldsToSend = [
		'page',
		'size',
		'search',
		'sort',
		'fields',
		'id',
		'schemaId',
	];
	const defaultObject = {
		enabled: false,
	};

	const { page, size, search, sort, fields, id, schemaId } = applyTransform(
		params,
		[
			merge(getDefaultGetParams()),
			starToSearch('search'),
			sanitize(listFieldsToSend),
		],
	);

	try {
		const response = await getTriggerService().searchTrigger({
			page,
			size,
			// the generated param is `q`; `search` is what the datalist store sends
			q: search,
			sort,
			fields,
			id,
			schema_id: schemaId,
		});
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

/**
 * Returns `type`, `event` and `object` as raw enum values. Mapping them onto
 * localized lookup entries is the caller's job — the labels are app-side i18n
 * keys.
 */
const getTrigger = async ({ itemId: id }: GetItemParams) => {
	const defaultObject = {
		timeout: 0,
		variables: {},
	};

	const responseHandler = (response: ApiParams) => {
		const copy = deepCopy(response);
		if (response.variables) {
			copy.variables = Object.keys(copy.variables).map((key) => ({
				key,
				value: copy.variables[key],
			}));
		}
		return copy;
	};

	try {
		const response = await getTriggerService().readTrigger(Number(id));
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

const addTrigger = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(doNotConvertKeys),
	]);
	try {
		const response = await getTriggerService().createTrigger(item);
		return applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchTrigger = async ({ changes, id }: PatchItemParams) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(doNotConvertKeys),
	]);
	try {
		const response = await getTriggerService().patchTrigger(Number(id), body);
		return applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateTrigger = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(doNotConvertKeys),
	]);
	try {
		const response = await getTriggerService().updateTrigger(Number(id), item);
		return applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteTrigger = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getTriggerService().deleteTrigger(Number(id));
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getTriggersLookup = (params: Parameters<typeof getTriggersList>[0]) =>
	getTriggersList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

const startTrigger = async (_params: ApiParams, item: ApiParams) => {
	const body = applyTransform(item, [
		camelToSnake(doNotConvertKeys),
	]);
	try {
		const response = await getTriggerService().createTriggerJob(
			Number(item.id),
			body,
		);
		return applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
			notify(({ callback }) =>
				callback({
					type: 'success',
					text: 'Successfully ran',
				}),
			),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const TriggersAPI = {
	getList: getTriggersList,
	get: getTrigger,
	add: addTrigger,
	patch: patchTrigger,
	update: updateTrigger,
	delete: deleteTrigger,
	getLookup: getTriggersLookup,
	start: startTrigger,
};
