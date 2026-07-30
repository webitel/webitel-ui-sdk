import {
	CreateServiceBody,
	getServices,
	ListServicesQueryParams,
	UpdateService2Body,
	UpdateServiceBody,
} from '@webitel/api-services/gen';
import { ContactsGroupType } from '@webitel/api-services/gen/models';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';

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

const getServicesList = async ({ parentId, rootId, ...rest }) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		ListServicesQueryParams,
	);

	const { page, size, fields, sort, id, q } = applyTransform(rest, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params) => ({
			...params,
			q: params.search,
		}),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getServices().listServices({
			page,
			size,
			fields,
			sort,
			id,
			q,
			rootId: rootId ?? parentId,
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

const getService = async ({ itemId: id }) => {
	const fieldsToSend = [
		'name',
		'code',
		'sla',
		'state',
		'prefix',
		'group',
		'assignee',
		'description',
		'default_priority',
		'catalog_id',
		'root_id',
	];

	const itemResponseHandler = (item) => item.service;

	try {
		const response = await getServices().locateService(id, {
			fields: fieldsToSend,
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

const preRequestHandler = ({ rootId, catalogId }) => {
	return (item) => ({
		...item,
		assignee:
			item.group?.type === ContactsGroupType.Dynamic ? {} : item.assignee,
		rootId: rootId ?? item.rootId,
		catalogId: catalogId ?? item.catalogId,
	});
};

const addService = async ({ itemInstance, rootId, catalogId }) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(CreateServiceBody);

	const item = applyTransform(itemInstance, [
		preRequestHandler({
			rootId,
			catalogId,
		}),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getServices().createService(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateService = async ({
	itemInstance,
	itemId: id,
	rootId,
	catalogId,
}) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(UpdateServiceBody);

	const item = applyTransform(itemInstance, [
		preRequestHandler({
			rootId,
			catalogId,
		}),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getServices().updateService(id, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchService = async ({ changes, id }) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(UpdateService2Body);

	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getServices().updateService2(id, body);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteService = async ({ id }) => {
	try {
		const response = await getServices().deleteService(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getServicesLookup = async (params) =>
	getServicesList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const ServicesAPI = {
	getList: getServicesList,
	get: getService,
	add: addService,
	update: updateService,
	patch: patchService,
	delete: deleteService,
	getLookup: getServicesLookup,
};
