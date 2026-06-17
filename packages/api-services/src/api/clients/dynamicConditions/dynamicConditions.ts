import { DynamicConditionsApiFactory } from 'webitel-sdk';

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
} from '../../transformers';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const dynamicGroupConditionsService = DynamicConditionsApiFactory(
	configuration,
	'',
	instance,
);

const fieldsToSend = [
	'assignee',
	'expression',
	'group',
];

const getConditionsList = async ({
	parentId,
	...rest
}: {
	parentId: string;
	[key: string]: unknown;
}) => {
	const listFieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
	];

	const { page, size, fields, sort, id, q } = applyTransform(rest, [
		merge(getDefaultGetParams()),
		(params: Record<string, unknown>) => ({
			...params,
			q: params.search,
		}),
		sanitize(listFieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await dynamicGroupConditionsService.listConditions(
			parentId,
			page,
			size,
			fields,
			sort,
			id,
			q,
		);
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

const getCondition = async ({ itemId: id }: { itemId: string }) => {
	const itemResponseHandler = (item: { condition: unknown }) => item.condition;

	try {
		const response = await dynamicGroupConditionsService.locateCondition(
			id,
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

const updateCondition = async ({
	itemInstance,
	itemId: id,
}: {
	itemInstance: Record<string, unknown>;
	itemId: string;
}) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await dynamicGroupConditionsService.updateCondition(
			id,
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

const addCondition = async ({
	itemInstance,
	parentId,
}: {
	itemInstance: Record<string, unknown>;
	parentId: string;
}) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await dynamicGroupConditionsService.createCondition(
			parentId,
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

const patchCondition = async ({
	parentId,
	changes,
}: {
	parentId: string;
	changes: Record<string, unknown>;
}) => {
	const item = applyTransform(changes, [
		camelToSnake(),
	]);

	try {
		const response = await dynamicGroupConditionsService.updateCondition2(
			parentId,
			item,
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteCondition = async ({ id }: { id: string }) => {
	try {
		const response = await dynamicGroupConditionsService.deleteCondition(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const DynamicConditionsAPI = {
	getList: getConditionsList,
	get: getCondition,
	update: updateCondition,
	patch: patchCondition,
	delete: deleteCondition,
	add: addCondition,
};
