import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';

import {
	getRoutingChatPlanService,
	SearchChatPlanQueryParams,
	UpdateChatPlanBody,
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
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	PatchItemParams,
	UpdateItemParams,
} from '../_shared/types';

const toRequestItem = (item: ApiParams) =>
	applyTransform(item, [
		sanitizeToWire(getShallowFieldsToSendFromZodSchema(UpdateChatPlanBody)),
		camelToSnake(),
	]);

const getChatplansList = async (params: ApiParams) => {
	const requestParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params: ApiParams) => ({
			...params,
			q: params.search,
		}),
		sanitizeToWire(
			getShallowFieldsToSendFromZodSchema(SearchChatPlanQueryParams),
		),
		camelToSnake(),
	]);

	try {
		const response =
			await getRoutingChatPlanService().searchChatPlan(requestParams);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				mergeEach({
					enabled: false,
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

const getChatplan = async ({ itemId: id }: GetItemParams) => {
	try {
		const response = await getRoutingChatPlanService().readChatPlan(Number(id));
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addChatplan = async ({ itemInstance }: AddItemParams) => {
	try {
		const response = await getRoutingChatPlanService().createChatPlan(
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

const patchChatplan = async ({ changes, id }: PatchItemParams) => {
	try {
		const response = await getRoutingChatPlanService().patchChatPlan(
			Number(id),
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

const updateChatplan = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	try {
		const response = await getRoutingChatPlanService().updateChatPlan(
			Number(id),
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

const deleteChatplan = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getRoutingChatPlanService().deleteChatPlan(
			Number(id),
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getChatplansLookup = (params: Parameters<typeof getChatplansList>[0]) =>
	getChatplansList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const ChatplansAPI = {
	getList: getChatplansList,
	get: getChatplan,
	add: addChatplan,
	patch: patchChatplan,
	update: updateChatplan,
	delete: deleteChatplan,
	getLookup: getChatplansLookup,
};
