import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';

import {
	getRoutingOutboundCallService,
	SearchRoutingOutboundCallQueryParams,
	UpdateRoutingOutboundCallBody,
} from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	mergeEach,
	notify,
	sanitizeToWire,
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

/** [Claude] the body fields minus `domain_id`: the domain comes from the session, never from the form */
const fieldsToSend = getShallowFieldsToSendFromZodSchema(
	UpdateRoutingOutboundCallBody,
).filter((field) => field !== 'domain_id');

const toRequestItem = (item: ApiParams) =>
	applyTransform(item, [
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);

const getDialplansList = async (params: ApiParams) => {
	const requestParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params: ApiParams) => ({
			...params,
			q: params.search,
		}),
		sanitizeToWire(
			getShallowFieldsToSendFromZodSchema(SearchRoutingOutboundCallQueryParams),
		),
		camelToSnake(),
	]);

	try {
		const response =
			await getRoutingOutboundCallService().searchRoutingOutboundCall(
				requestParams,
			);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				mergeEach({
					disabled: false,
				}),
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
	try {
		const response =
			await getRoutingOutboundCallService().createRoutingOutboundCall(
				toRequestItem(itemInstance),
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

const updateDialplan = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	try {
		const response =
			await getRoutingOutboundCallService().updateRoutingOutboundCall(
				String(id),
				toRequestItem(itemInstance),
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
	try {
		const response =
			await getRoutingOutboundCallService().patchRoutingOutboundCall(
				String(id),
				toRequestItem(changes),
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
