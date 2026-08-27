import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import {
	CreateSLAConditionBody,
	getSlaconditions,
	ListSLAConditionsQueryParams,
	UpdateSLAConditionBody,
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
import type { ApiId, ApiParams } from '../_shared/types';

const getConditionsList = async ({
	parentId,
	...rest
}: {
	parentId: ApiId;
} & ApiParams) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		ListSLAConditionsQueryParams,
	);

	const {
		page,
		size,
		fields,
		sort,
		id,
		q,
		sla_condition_id: slaConditionId,
		priority_id: priorityId,
	} = applyTransform(rest, [
		merge(getDefaultGetParams()),
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getSlaconditions().listSLAConditions(
			String(parentId),
			{
				page,
				size,
				fields,
				sort,
				id,
				q,
				sla_condition_id: slaConditionId,
				priority_id: priorityId,
			},
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

const getCondition = async ({
	parentId,
	itemId: id,
}: {
	parentId: ApiId;
	itemId: ApiId;
}) => {
	const itemResponseHandler = (item: ApiParams) => item.slaCondition;

	try {
		const response = await getSlaconditions().locateSLACondition(
			String(parentId),
			String(id),
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

const addCondition = async ({
	itemInstance,
	parentId,
}: {
	itemInstance: ApiParams;
	parentId: ApiId;
}) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		CreateSLAConditionBody,
	);

	const item = applyTransform(itemInstance, [
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getSlaconditions().createSLACondition(
			String(parentId),
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
	itemInstance: ApiParams;
	itemId: ApiId;
}) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		UpdateSLAConditionBody,
	);

	const item = applyTransform(itemInstance, [
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getSlaconditions().updateSLACondition(
			String(itemInstance.slaId),
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

const deleteCondition = async ({
	id,
	parentId,
}: {
	id: ApiId;
	parentId: ApiId;
}) => {
	try {
		const response = await getSlaconditions().deleteSLACondition(
			String(parentId),
			String(id),
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getLookup = async (params: Parameters<typeof getConditionsList>[0]) =>
	getConditionsList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const SLAConditionsAPI = {
	getList: getConditionsList,
	get: getCondition,
	update: updateCondition,
	delete: deleteCondition,
	add: addCondition,
	getLookup,
};
