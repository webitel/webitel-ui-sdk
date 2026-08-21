import {
	CreateServiceBody,
	getServices,
	ListServicesQueryParams,
	UpdateService2Body,
	UpdateServiceBody,
} from '@webitel/api-services/gen';
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
import type {
	AddItemParams,
	ApiId,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	PatchItemParams,
	UpdateItemParams,
} from '../_shared/types';

const preRequestHandler = (item: ApiParams) => {
	return {
		...item,
		state: item.state ?? true,
		sla_id: item.sla?.id,
		status_id: item.status?.id,
		close_reason_id: item.closeReason?.id,
		team_ids: item.teams?.map((team: ApiParams) => team.id),
		skill_ids: item.skills?.map((skill: ApiParams) => skill.id),
	};
};

const getServicesList = async ({
	parentId,
	rootId,
	...rest
}: {
	parentId?: ApiId;
	rootId: ApiId;
} & ApiParams) => {
	const listFieldsToSend = getShallowFieldsToSendFromZodSchema(
		ListServicesQueryParams,
	);

	const { page, size, fields, sort, id, q } = applyTransform(rest, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params) => ({
			...params,
			q: params.search,
		}),
		sanitize(listFieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getServices().listServices({
			page,
			size,
			sort,
			id,
			q,
			rootId: String(rootId ?? parentId),
			fields,
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

const serviceFieldsToSend =
	getShallowFieldsToSendFromZodSchema(CreateServiceBody);

const getService = async ({ itemId: id }: GetItemParams) => {
	const itemResponseHandler = (item: ApiParams) => item.service;

	try {
		const response = await getServices().locateService(String(id), {
			fields: serviceFieldsToSend,
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

const addFieldsToSend = getShallowFieldsToSendFromZodSchema(CreateServiceBody);

const addService = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(addFieldsToSend),
		preRequestHandler,
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

const updateFieldsToSend =
	getShallowFieldsToSendFromZodSchema(UpdateServiceBody);

const updateService = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(updateFieldsToSend),
		preRequestHandler,
		camelToSnake(),
	]);
	try {
		const response = await getServices().updateService(String(id), item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchFieldsToSend =
	getShallowFieldsToSendFromZodSchema(UpdateService2Body);

const patchService = async ({ changes, id }: PatchItemParams) => {
	const body = applyTransform(changes, [
		sanitize(patchFieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getServices().updateService2(String(id), body);
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
		const response = await getServices().deleteService([
			String(id),
		]);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getServicesLookup = (params: Parameters<typeof getServicesList>[0]) =>
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
