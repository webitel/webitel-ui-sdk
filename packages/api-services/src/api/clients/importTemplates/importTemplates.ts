import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { importTemplateSchema } from '@webitel/api-services/validations';
import {
	getImportTemplateService,
	SearchImportTemplateQueryParams,
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
import { generatePermissionsApi } from '../_shared/generatePermissionsApi';
import type {
	AddItemParams,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	PatchItemParams,
	UpdateItemParams,
} from '../_shared/types';

const baseUrl = '/storage/import_templates';

/**
 * `mappings` keys are CSV column names — user data, not API fields — so the
 * case transformers must leave them alone.
 */
const doNotConvertKeys = [
	'mappings',
];

/** [Claude] the card schema's fields */
const fieldsToSend = getShallowFieldsToSendFromZodSchema(importTemplateSchema);

const searchImportTemplates = async (params: ApiParams) => {
	const requestParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params: ApiParams) => ({
			...params,
			// [Claude] the generated param is `q`; `search` is what the datalist store sends
			q: params.q ?? params.search,
		}),
		sanitizeToWire(
			getShallowFieldsToSendFromZodSchema(SearchImportTemplateQueryParams),
		),
		camelToSnake(),
	]);

	try {
		const response =
			await getImportTemplateService().searchImportTemplate(requestParams);
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

const getImportTemplate = async ({ itemId: id }: GetItemParams) => {
	try {
		const response = await getImportTemplateService().readImportTemplate(
			Number(id),
		);
		return applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addImportTemplate = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(doNotConvertKeys),
	]);
	try {
		const response =
			await getImportTemplateService().createImportTemplate(item);
		return applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

/*
 * The webitel-sdk copy of this client called `updateImportTemplate` for both
 * `patch` and `update`; kept as-is so the request is unchanged.
 */
const patchImportTemplate = async ({ changes, id }: PatchItemParams) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(doNotConvertKeys),
	]);
	try {
		const response = await getImportTemplateService().updateImportTemplate(
			Number(id),
			body,
		);
		return applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateImportTemplate = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(doNotConvertKeys),
	]);
	try {
		const response = await getImportTemplateService().updateImportTemplate(
			Number(id),
			item,
		);
		return applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

/** [Claude] a template row is uploaded from, which needs its `parameters` even when no column shows them; without a field list every field comes anyway */
const getImportTemplatesList = (params: ApiParams) =>
	searchImportTemplates({
		...params,
		fields: params.fields && [
			...new Set([
				...params.fields,
				'parameters',
			]),
		],
	});

const deleteImportTemplate = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getImportTemplateService().deleteImportTemplate(
			Number(id),
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getImportTemplatesLookup = (
	params: Parameters<typeof searchImportTemplates>[0],
) =>
	searchImportTemplates({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const ImportTemplatesAPI = {
	getList: getImportTemplatesList,
	get: getImportTemplate,
	add: addImportTemplate,
	patch: patchImportTemplate,
	update: updateImportTemplate,
	delete: deleteImportTemplate,
	getLookup: getImportTemplatesLookup,

	...generatePermissionsApi(baseUrl),
};
