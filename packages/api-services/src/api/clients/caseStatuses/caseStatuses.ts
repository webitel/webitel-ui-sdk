import { getStatuses } from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
} from '../../transformers';
import type {
	AddItemParams,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	UpdateItemParams,
} from '../_shared/types';

const fieldsToSend = [
	'name',
	'description',
];

const getStatusesList = async (params: ApiParams) => {
	const fieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
	];

	const { page, size, fields, sort, id, q } = applyTransform(params, [
		merge(getDefaultGetParams()),
		(params) => ({
			...params,
			q: params.search,
		}),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getStatuses().listStatuses({
			page,
			size,
			fields,
			sort,
			id,
			q,
		});
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

const getStatus = async ({ itemId: id }: GetItemParams) => {
	const itemResponseHandler = (item: ApiParams) => {
		return item.status;
	};

	try {
		const response = await getStatuses().locateStatus(String(id), {
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

const addStatus = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await getStatuses().createStatus(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateStatus = async ({ itemInstance, itemId: id }: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await getStatuses().updateStatus(String(id), item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteStatus = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getStatuses().deleteStatus(String(id));
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getStatusesLookup = async (
	params: Parameters<typeof getStatusesList>[0],
) =>
	getStatusesList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const CaseStatusesAPI = {
	getList: getStatusesList,
	get: getStatus,
	update: updateStatus,
	getLookup: getStatusesLookup,
	delete: deleteStatus,
	add: addStatus,
};
