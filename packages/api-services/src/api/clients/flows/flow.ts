import { EngineRoutingSchemaType } from '@webitel/api-services/gen/models';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';

import {
	getRoutingSchemaService,
	SearchRoutingSchemaQueryParams,
	SearchRoutingSchemaTagsQueryParams,
	UpdateRoutingSchemaBody,
} from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	mergeEach,
	notify,
	sanitize,
	sanitizeToWire,
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

/** [Claude] `schema` and `payload` are free-form JSON: case converters keep them as they are */
const doNotConvertKeys = [
	'schema',
	'payload',
];

/** [Claude] the generated body leaves `schema` and `payload` out: the spec types them as free-form */
const fieldsToSend = [
	...getShallowFieldsToSendFromZodSchema(UpdateRoutingSchemaBody),
	...doNotConvertKeys,
];

/** [Claude] a type filter always keeps typeless ("default") flows in the list */
const withDefaultType = (type: unknown) => {
	if (!type) return type;
	const types = [
		type,
	].flat();
	return types.includes(EngineRoutingSchemaType.Default)
		? types
		: [
				...types,
				EngineRoutingSchemaType.Default,
			];
};

/** [Claude] the code editor edits `schema` as text: get, add and update all hand it back stringified */
const stringifySchema = (item: ApiParams) => ({
	...item,
	schema: JSON.stringify(item.schema, null, 4),
});

const parseSchema = (item: ApiParams) => ({
	...item,
	schema:
		typeof item.schema === 'string' ? JSON.parse(item.schema) : item.schema,
});

const toRequestItem = (itemInstance: ApiParams) =>
	applyTransform(itemInstance, [
		parseSchema,
		sanitize(fieldsToSend),
		camelToSnake(doNotConvertKeys),
	]);

const fromResponseItem = (item: ApiParams) =>
	applyTransform(item, [
		snakeToCamel(doNotConvertKeys),
		stringifySchema,
	]);

const getFlowList = async (params: ApiParams) => {
	const requestParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params: ApiParams) => ({
			...params,
			q: params.search,
			// [Claude] the table filter is named `flowType` (cf. `queueType`); plain `type` still works
			type: withDefaultType(params.flowType ?? params.type),
		}),
		sanitizeToWire(
			getShallowFieldsToSendFromZodSchema(SearchRoutingSchemaQueryParams),
		),
		camelToSnake(doNotConvertKeys),
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
				mergeEach({
					type: EngineRoutingSchemaType.Default,
					editor: false,
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

const getFlow = async ({ itemId: id }: GetItemParams) => {
	try {
		const response = await getRoutingSchemaService().readRoutingSchema(
			String(id),
		);
		return applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
			merge({
				tags: [],
				editor: false,
				type: EngineRoutingSchemaType.Default,
			}),
			stringifySchema,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addFlow = async ({ itemInstance }: AddItemParams) => {
	try {
		const response = await getRoutingSchemaService().createRoutingSchema(
			toRequestItem(itemInstance),
		);
		return fromResponseItem(response.data);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateFlow = async ({ itemInstance, itemId: id }: UpdateItemParams) => {
	try {
		const response = await getRoutingSchemaService().updateRoutingSchema(
			String(id),
			toRequestItem(itemInstance),
		);
		return fromResponseItem(response.data);
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
		(params: ApiParams) => ({
			...params,
			q: params.search,
			// fixme: `ids` was passed into the `type` positional slot of the
			// webitel-sdk factory; preserved verbatim here. The endpoint has no
			// `id` filter, so this is very likely a latent bug.
			type: params.ids,
		}),
		sanitizeToWire(
			getShallowFieldsToSendFromZodSchema(SearchRoutingSchemaTagsQueryParams),
		),
		camelToSnake(doNotConvertKeys),
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
