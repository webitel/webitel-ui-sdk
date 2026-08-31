import { getRoutingChatPlanService } from '../../../gen-wire';
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
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	PatchItemParams,
	UpdateItemParams,
} from '../_shared/types';

const fieldsToSend = [
	'name',
	'schema',
	'description',
	'enabled',
];

const getChatplansList = async (params: ApiParams) => {
	const defaultObject = {
		enabled: false,
	};

	const { page, size, search, sort, fields, id, name, enabled } =
		applyTransform(params, [
			merge(getDefaultGetParams()),
			starToSearch('search'),
			camelToSnake(),
		]);

	try {
		const response = await getRoutingChatPlanService().searchChatPlan({
			page,
			size,
			// the generated param is `q`; `search` is what the datalist store sends
			q: search,
			sort,
			fields,
			id,
			name,
			enabled,
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
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getRoutingChatPlanService().createChatPlan(item);
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
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getRoutingChatPlanService().patchChatPlan(
			Number(id),
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

const updateChatplan = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getRoutingChatPlanService().updateChatPlan(
			Number(id),
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
