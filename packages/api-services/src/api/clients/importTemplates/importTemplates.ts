import { getImportTemplateService } from '../../../gen-wire';
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

const baseUrl = '/storage/import_templates';

/**
 * `mappings` keys are CSV column names — user data, not API fields — so the
 * case transformers must leave them alone.
 */
const doNotConvertKeys = [
	'mappings',
];

const fieldsToSend = [
	'description',
	'name',
	'parameters',
	'source',
	'sourceType',
];

const getImportTemplatesList = async (params: ApiParams) => {
	const { page, size, search, sort, fields, id } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response = await getImportTemplateService().searchImportTemplate({
			page,
			size,
			// the generated param is `q`; `search` is what the datalist store sends
			q: search,
			sort,
			fields,
			id,
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
	params: Parameters<typeof getImportTemplatesList>[0],
) =>
	getImportTemplatesList({
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
