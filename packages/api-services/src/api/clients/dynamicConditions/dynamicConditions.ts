import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import {
	CreateConditionBody,
	getDynamicConditions,
	ListConditionsQueryParams,
	UpdateCondition2Body,
	UpdateConditionBody,
} from '../../../gen-wire';

import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitizeToWire,
	snakeToCamel,
} from '../../transformers';

const conditionFieldsToSend =
	getShallowFieldsToSendFromZodSchema(CreateConditionBody);

const getConditionsList = async ({
	parentId,
	...params
}: {
	parentId: string;
	[key: string]: unknown;
}) => {
	const listFieldsToSend = getShallowFieldsToSendFromZodSchema(
		ListConditionsQueryParams,
	);

	const { page, size, fields, sort, id, q } = applyTransform(params, [
		merge(getDefaultGetParams()),
		sanitizeToWire(listFieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getDynamicConditions().listConditions(parentId, {
			page,
			size,
			fields,
			sort,
			id,
			q: q || params.search,
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

const getCondition = async ({ itemId: id }: { itemId: string }) => {
	const itemResponseHandler = (item: { condition: unknown }) => item.condition;

	try {
		const response = await getDynamicConditions().locateCondition(id, {
			fields: conditionFieldsToSend,
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

const addCondition = async ({
	itemInstance,
	parentId,
}: {
	itemInstance: Record<string, unknown>;
	parentId: string;
}) => {
	const item = applyTransform(itemInstance, [
		sanitizeToWire(conditionFieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getDynamicConditions().createCondition(
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

const updateCondition = async ({
	itemInstance,
	itemId: id,
}: {
	itemInstance: Record<string, unknown>;
	itemId: string;
}) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(UpdateConditionBody);

	const item = applyTransform(itemInstance, [
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getDynamicConditions().updateCondition(id, item);
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
	changes,
	itemId: id,
}: {
	changes: Record<string, unknown>;
	itemId: string;
}) => {
	const fieldsToSend =
		getShallowFieldsToSendFromZodSchema(UpdateCondition2Body);

	const item = applyTransform(changes, [
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getDynamicConditions().updateCondition2(id, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteCondition = async ({ id }: { id: string }) => {
	try {
		const response = await getDynamicConditions().deleteCondition(id);
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
	add: addCondition,
	update: updateCondition,
	patch: patchCondition,
	delete: deleteCondition,
};
