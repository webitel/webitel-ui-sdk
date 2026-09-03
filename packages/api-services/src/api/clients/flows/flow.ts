import { EngineRoutingSchemaType } from '@webitel/api-services/gen/models';
import { getRoutingSchemaService } from '../../../gen-wire';
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
	UpdateItemParams,
} from '../_shared/types';

/*
CONVERT "SCHEMA" FIELD TO JSON TO PREVENT ITS CHANGE
BY CAMEL-SNAKE TRANSFORMERS
 */
const doNotConvertKeys = [
	'schema',
];

const fieldsToSend = [
	'name',
	'schema',
	'type',
	'payload',
	'editor',
	'tags',
];

const getFlowList = async (params: ApiParams) => {
	const defaultObject = {
		type: EngineRoutingSchemaType.Default,
		editor: false,
	};

	const paramsCopy = {
		...params,
	};

	if (paramsCopy.type) {
		const _type = Array.isArray(paramsCopy.type)
			? paramsCopy.type
			: [
					paramsCopy.type,
				];
		if (!paramsCopy.type.includes(EngineRoutingSchemaType.Default)) {
			_type.push(EngineRoutingSchemaType.Default);
		}
		paramsCopy.type = _type;
	}

	const requestParams = applyTransform(paramsCopy, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		camelToSnake(doNotConvertKeys),
		(params) => ({
			...params,
			q: params.search,
		}),
		sanitize([
			'page',
			'size',
			'q',
			'sort',
			'fields',
			'id',
			'name',
			'type',
			'tags',
		]),
	]);

	try {
		const response =
			await getRoutingSchemaService().searchRoutingSchema(requestParams);
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
const getFlow = async ({ itemId: id }: GetItemParams) => {
	const defaultObject = {
		tags: [],
		editor: false,
		type: EngineRoutingSchemaType.Default,
	};

	const itemResponseHandler = (item: ApiParams) => ({
		...item,
		schema: JSON.stringify(item.schema, null, 4),
	});

	try {
		const response = await getRoutingSchemaService().readRoutingSchema(
			String(id),
		);
		return applyTransform(response.data, [
			({ payload, schema, ...rest }) => ({
				payload,
				schema,
				...snakeToCamel(doNotConvertKeys)(rest),
			}),
			merge(defaultObject),
			itemResponseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const preRequestHandler = (item: ApiParams) => ({
	...item,
	schema:
		typeof item.schema === 'string' ? JSON.parse(item.schema) : item.schema,
});

const addFlow = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		({ payload, schema, ...rest }) => ({
			payload,
			schema,
			...camelToSnake(doNotConvertKeys)(rest),
		}),
	]);
	try {
		const response = await getRoutingSchemaService().createRoutingSchema(item);
		return applyTransform(response.data, [
			({ payload, schema, ...rest }) => ({
				payload,
				schema,
				...snakeToCamel(doNotConvertKeys)(rest),
			}),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};
const updateFlow = async ({ itemInstance, itemId: id }: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		({ payload, schema, ...rest }) => ({
			payload,
			schema,
			...camelToSnake(doNotConvertKeys)(rest),
		}),
	]);
	try {
		const response = await getRoutingSchemaService().updateRoutingSchema(
			String(id),
			item,
		);
		return applyTransform(response.data, [
			({ payload, schema, ...rest }) => ({
				payload,
				schema,
				...snakeToCamel(doNotConvertKeys)(rest),
			}),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteFlow = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getRoutingSchemaService().deleteRoutingSchema(
			String(id),
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getFlowsLookup = (params: Parameters<typeof getFlowList>[0]) =>
	getFlowList({
		...params,
		fields: params.fields || [
			'id',
			'name',
			'type',
		],
	});

const getFlowTags = async (params: ApiParams) => {
	const requestParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch(),
		camelToSnake(doNotConvertKeys),
		(params) => ({
			...params,
			q: params.search,
			// fixme: `ids` was passed into the `type` positional slot of the
			// webitel-sdk factory; preserved verbatim here. The endpoint has no
			// `id` filter, so this is very likely a latent bug.
			type: params.ids,
		}),
		sanitize([
			'page',
			'size',
			'q',
			'sort',
			'fields',
			'type',
		]),
	]);
	try {
		const response =
			await getRoutingSchemaService().searchRoutingSchemaTags(requestParams);
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

export const FlowsAPI = {
	getList: getFlowList,
	get: getFlow,
	add: addFlow,
	update: updateFlow,
	delete: deleteFlow,
	getLookup: getFlowsLookup,
	getFlowTags,
};
