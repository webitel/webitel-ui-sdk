import { ServicesApiFactory, WebitelContactsGroupType } from 'webitel-sdk';
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
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type {
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	PatchItemParams,
} from '../_shared/types';

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

const getServicesList = async ({
	rootId,
	...rest
}: {
	rootId: string;
} & ApiParams) => {
	const fieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
	];

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
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getService = async ({ itemId: id }: GetItemParams) => {
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

	const itemResponseHandler = (item: ApiParams) => {
		return item.service;
	};

	try {
		const response = await servicesService.locateService(
			String(id),
			fieldsToSend,
		);
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

const preRequestHandler = ({
	rootId,
	catalogId,
}: {
	rootId: string;
	catalogId: string;
}) => {
	return (item: ApiParams) => ({
		...item,
		assignee:
			item.group?.type === WebitelContactsGroupType.DYNAMIC
				? {}
				: item.assignee,
		rootId,
		catalogId,
	});
};

const addService = async ({
	itemInstance,
	rootId,
	catalogId,
}: {
	itemInstance: ApiParams;
	rootId: string;
	catalogId: string;
}) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler({
			rootId,
			catalogId,
		}),
		camelToSnake(),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await servicesService.createService(item);
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
}: {
	itemInstance: ApiParams;
	itemId: string;
	rootId: string;
	catalogId: string;
}) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler({
			rootId,
			catalogId,
		}),
		camelToSnake(),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await servicesService.updateService(id, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchService = async ({ changes, id }: PatchItemParams) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await servicesService.updateService2(String(id), body);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteService = async ({ id }: DeleteItemParams) => {
	try {
		const response = await servicesService.deleteService([
			String(id),
		]);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getServicesLookup = async (
	params: Parameters<typeof getServicesList>[0],
) =>
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
