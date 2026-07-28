import { getQuickRepliesService } from '@webitel/api-services/gen';
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
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	UpdateItemParams,
} from '../_shared/types';

const fieldsToSend = [
	'name',
	'queues',
	'article',
	'teams',
	'text',
];

const getQuickRepliesList = async (params: ApiParams) => {
	const fieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
		'restrictToAgent',
	];

	const { page, size, fields, sort, id, q, restrict_to_agent } = applyTransform(
		params,
		[
			merge(getDefaultGetParams()),
			(params) => ({
				...params,
				q: params.search,
			}),
			sanitize(fieldsToSend),
			starToSearch('q'),
			camelToSnake(),
		],
	);

	try {
		const response = await getQuickRepliesService().searchQuickReplies({
			page,
			size,
			fields,
			sort,
			id,
			q,
			restrictToAgent: restrict_to_agent,
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

const getQuickReply = async ({ itemId: id }: GetItemParams) => {
	try {
		const response = await getQuickRepliesService().readQuickReply(Number(id));
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addQuickReply = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getQuickRepliesService().createQuickReply(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateQuickReply = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await getQuickRepliesService().updateQuickReply(
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

const deleteQuickReply = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getQuickRepliesService().deleteQuickReply(
			Number(id),
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getLookup = (params: Parameters<typeof getQuickRepliesList>[0]) =>
	getQuickRepliesList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const QuickRepliesAPI = {
	getList: getQuickRepliesList,
	get: getQuickReply,
	add: addQuickReply,
	update: updateQuickReply,
	delete: deleteQuickReply,
	getLookup,
};
