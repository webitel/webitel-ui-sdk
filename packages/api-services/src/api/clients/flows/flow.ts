import { EngineRoutingSchemaType } from '@webitel/api-services/gen/models';
import { RoutingSchemaServiceApiFactory } from 'webitel-sdk';
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
	UpdateItemParams,
} from '../_shared/types';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const flowService = RoutingSchemaServiceApiFactory(configuration, '', instance);

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

	const { page, size, search, sort, fields, id, name, type, tags } =
		applyTransform(paramsCopy, [
			merge(getDefaultGetParams()),
			starToSearch('search'),
			camelToSnake(doNotConvertKeys),
		]);

	try {
		const response = await flowService.searchRoutingSchema(
			page,
			size,
			search,
			sort,
			fields,
			id,
			name,
			type,
			undefined,
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
		const response = await flowService.readRoutingSchema(id);
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
		const response = await flowService.createRoutingSchema(item);
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
		const response = await flowService.updateRoutingSchema(id, item);
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
		const response = await flowService.deleteRoutingSchema(id);
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
	const { page, size, search, sort, fields, ids } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch(),
		camelToSnake(doNotConvertKeys),
	]);
	try {
		const response = await flowService.searchRoutingSchemaTags(
			page,
			size,
			search,
			sort,
			fields,
			ids,
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

export const FlowsAPI = {
	getList: getFlowList,
	get: getFlow,
	add: addFlow,
	update: updateFlow,
	delete: deleteFlow,
	getLookup: getFlowsLookup,
	getFlowTags,
};
