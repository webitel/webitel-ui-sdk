import { getRoutingOutboundCallService } from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	mergeEach,
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

const fieldsToSend = [
	'name',
	'schema',
	'pattern',
	'description',
	'disabled',
];

const getDialplansList = async (params: ApiParams) => {
	const defaultObject = {
		disabled: false,
	};

	const { page, size, search, sort, fields, id } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response =
			await getRoutingOutboundCallService().searchRoutingOutboundCall({
				page,
				size,
				// the generated param is `q`; `search` is what the datalist store sends
				q: search,
				sort,
				fields,
				id,
			});
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				mergeEach(defaultObject),
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getDialplan = async ({ itemId: id }: GetItemParams) => {
	try {
		const response =
			await getRoutingOutboundCallService().readRoutingOutboundCall(String(id));
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addDialplan = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response =
			await getRoutingOutboundCallService().createRoutingOutboundCall(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateDialplan = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response =
			await getRoutingOutboundCallService().updateRoutingOutboundCall(
				String(id),
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

const patchDialplan = async ({ changes, id }: PatchItemParams) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response =
			await getRoutingOutboundCallService().patchRoutingOutboundCall(
				String(id),
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

const deleteDialplan = async ({ id }: DeleteItemParams) => {
	try {
		const response =
			await getRoutingOutboundCallService().deleteRoutingOutboundCall(
				String(id),
			);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const moveDialplan = async ({
	fromId,
	toId,
}: {
	fromId: ApiId;
	toId: ApiId;
}) => {
	try {
		const response =
			await getRoutingOutboundCallService().movePositionRoutingOutboundCall(
				String(fromId),
				String(toId),
				{},
			);
		return applyTransform(response.data, [
			notify(({ callback }) =>
				callback({
					type: 'success',
					text: 'Successfully saved',
				}),
			),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const DialplansAPI = {
	getList: getDialplansList,
	get: getDialplan,
	add: addDialplan,
	update: updateDialplan,
	patch: patchDialplan,
	delete: deleteDialplan,
	moveDialplan,
};
