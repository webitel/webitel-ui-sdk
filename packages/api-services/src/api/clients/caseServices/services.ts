import { ServicesApiFactory, WebitelContactsGroupType } from 'webitel-sdk';

import {
	getDefaultGetListResponse,
	getDefaultGetParams,
	getDefaultInstance,
	getDefaultOpenAPIConfig,
} from '../../defaults/index';
import applyTransform, {
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../transformers/index';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const servicesService = ServicesApiFactory(configuration, '', instance);

const fieldsToSend = [
	'name',
	'code',
	'sla',
	'status',
	'state',
	'description',
	'group',
	'assignee',
	'services',
	'root_id',
	'catalog_id',
];

const getServicesList = async ({ rootId, ...rest }) => {
	const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id'];

	const { page, size, fields, sort, id, q } = applyTransform(rest, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params) => ({ ...params, q: params.search }),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await servicesService.listServices(
			page,
			size,
			sort,
			id,
			q,
			rootId,
			undefined,
			fields,
		);
		const { items, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, []),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
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
		'catalog_id',
		'root_id',
	];

	const itemResponseHandler = (item) => {
		return item.service;
	};

	try {
		const response = await servicesService.locateService(id, fieldsToSend);
		return applyTransform(response.data, [snakeToCamel(), itemResponseHandler]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const preRequestHandler = ({ rootId, catalogId }) => {
	return (item) => ({
		...item,
		assignee:
			item.group?.type === WebitelContactsGroupType.DYNAMIC
				? {}
				: item.assignee,
		rootId,
		catalogId,
	});
};

const addService = async ({ itemInstance, rootId, catalogId }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler({ rootId, catalogId }),
		camelToSnake(),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await servicesService.createService(item);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const updateService = async ({
	itemInstance,
	itemId: id,
	rootId,
	catalogId,
}) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler({ rootId, catalogId }),
		camelToSnake(),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await servicesService.updateService(id, item);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const patchService = async ({ changes, id }) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await servicesService.updateService2(id, body);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const deleteService = async ({ id }) => {
	try {
		const response = await servicesService.deleteService(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getServicesLookup = async (params) =>
	getServicesList({
		...params,
		fields: params.fields || ['id', 'name'],
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
