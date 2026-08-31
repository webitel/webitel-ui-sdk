import { getPriorities } from '../../../gen-wire';
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
	'color',
];

const getPrioritiesList = async (params: ApiParams) => {
	/*
	 * This endpoint spells its filters in camelCase — both `src/gen` and
	 * `src/gen-wire` agree — so no case conversion runs here. The object keys
	 * below are the wire names.
	 */
	const listFieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
		'notInSla',
		'inSlaCond',
	];
	const { page, size, fields, sort, id, q, notInSla, inSlaCond } =
		applyTransform(params, [
			merge(getDefaultGetParams()),
			(params) => ({
				...params,
				q: params.search,
			}),
			sanitize(listFieldsToSend),
		]);
	try {
		const response = await getPriorities().listPriorities({
			page,
			size,
			fields,
			sort,
			id,
			q,
			notInSla,
			inSlaCond,
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

const getPriority = async ({ itemId: id }: GetItemParams) => {
	const itemResponseHandler = (item: ApiParams) => {
		return item.priority;
	};

	try {
		const response = await getPriorities().locatePriority(String(id), {
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

const addPriority = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await getPriorities().createPriority(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updatePriority = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await getPriorities().updatePriority(String(id), item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deletePriority = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getPriorities().deletePriority(String(id));
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getConditionsLookup = (params: Parameters<typeof getPrioritiesList>[0]) =>
	getPrioritiesList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const CasePrioritiesAPI = {
	getList: getPrioritiesList,
	get: getPriority,
	update: updatePriority,
	getLookup: getConditionsLookup,
	delete: deletePriority,
	add: addPriority,
};
