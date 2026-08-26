import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import {
	CreateCatalogBody,
	getCatalogs,
	ListCatalogsQueryParams,
	UpdateCatalogBody,
} from '../../../gen-wire';

import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
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

const fieldsToSend = [
	'id',
	'name',
	'code',
	'sla',
	'teams',
	'skills',
	'status',
	'state',
	'prefix',
	'default_priority',
	'close_reason_group',
	'reason',
	'description',
	'services',
];
const servicesFieldsToSend = [
	'id',
	'name',
	'group',
	'assignee',
	'assignee.name',
	'description',
	'default_priority',
	'code',
	'prefix',
	'state',
	'sla',
	'root_id',
	'catalog_id',
];

const getCatalogsList = async (params: ApiParams) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		ListCatalogsQueryParams,
	);

	const { page, size, fields, sort, id, query, state, has_subservices } =
		applyTransform(params, [
			merge(getDefaultGetParams()),
			starToSearch('search'),
			(params) => ({
				...params,
				query: params.search,
			}),
			sanitizeToWire(fieldsToSend),
			camelToSnake(),
		]);

	try {
		const response = await getCatalogs().listCatalogs({
			page,
			size,
			fields: [
				...fields,
				'services',
			],
			sort,
			id,
			query,
			state,
			depth: '100', // Implemented depth 100 for load all subservices in one request
			sub_fields: servicesFieldsToSend,
			hasSubservices: has_subservices,
		});
		const { items, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				snakeToCamel(),
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getCatalog = async ({ itemId: id }: GetItemParams) => {
	const itemResponseHandler = (item: ApiParams) => item.catalog;

	try {
		const response = await getCatalogs().locateCatalog(String(id), {
			fields: fieldsToSend,
			sub_fields: servicesFieldsToSend,
		});
		return applyTransform(response.data, [
			snakeToCamel(),
			itemResponseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addCatalog = async ({ itemInstance }: AddItemParams) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(CreateCatalogBody);

	const item = applyTransform(itemInstance, [
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getCatalogs().createCatalog(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateCatalog = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(UpdateCatalogBody);

	const item = applyTransform(itemInstance, [
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getCatalogs().updateCatalog(String(id), item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchCatalog = async ({ itemInstance, itemId: id }: UpdateItemParams) => {
	const fieldsToSend = [
		'name',
		'description',
		'state',
	];
	const item = applyTransform(itemInstance, [
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getCatalogs().updateCatalog2(String(id), item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteCatalog = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getCatalogs().deleteCatalog([
			String(id),
		]);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const ServiceCatalogsAPI = {
	getList: getCatalogsList,
	get: getCatalog,
	add: addCatalog,
	update: updateCatalog,
	patch: patchCatalog,
	delete: deleteCatalog,
};
