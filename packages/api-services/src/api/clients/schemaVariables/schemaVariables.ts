import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { schemaVariableSchema } from '@webitel/api-services/validations';
import {
	getSchemaVariablesService,
	SearchSchemaVariableQueryParams,
} from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
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
	PatchItemParams,
	UpdateItemParams,
} from '../_shared/types';

/** "Global variables" in the admin UI. [Claude] The card schema's fields. */
const fieldsToSend = getShallowFieldsToSendFromZodSchema(schemaVariableSchema);

const getSchemaVariablesList = async (params: ApiParams) => {
	const requestParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params: ApiParams) => ({
			...params,
			// [Claude] the generated param is `q`; `search` is what the datalist store sends
			q: params.q ?? params.search,
		}),
		sanitizeToWire(
			getShallowFieldsToSendFromZodSchema(SearchSchemaVariableQueryParams),
		),
		camelToSnake(),
	]);

	try {
		const response =
			await getSchemaVariablesService().searchSchemaVariable(requestParams);
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

const getSchemaVariable = async ({ itemId: id }: GetItemParams) => {
	try {
		const response = await getSchemaVariablesService().readSchemaVariable(
			Number(id),
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

const addSchemaVariable = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response =
			await getSchemaVariablesService().createSchemaVariable(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateSchemaVariable = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getSchemaVariablesService().updateSchemaVariable(
			Number(id),
			item,
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

const patchSchemaVariable = async ({ changes, id }: PatchItemParams) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getSchemaVariablesService().patchSchemaVariable(
			Number(id),
			body,
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

const deleteSchemaVariable = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getSchemaVariablesService().deleteSchemaVariable(
			Number(id),
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getSchemaVariablesLookup = (
	params: Parameters<typeof getSchemaVariablesList>[0],
) =>
	getSchemaVariablesList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const SchemaVariablesAPI = {
	getList: getSchemaVariablesList,
	get: getSchemaVariable,
	add: addSchemaVariable,
	update: updateSchemaVariable,
	patch: patchSchemaVariable,
	delete: deleteSchemaVariable,
	getLookup: getSchemaVariablesLookup,
};
