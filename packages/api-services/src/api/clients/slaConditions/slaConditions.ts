import {
	CreateSLAConditionBody,
	getSlaconditions,
	ListSLAConditionsQueryParams,
	UpdateSLAConditionBody,
} from '@webitel/api-services/gen';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';

import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
} from '../../transformers';

const getConditionsList = async ({ parentId, ...rest }) => {
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
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getSlaconditions().listSLAConditions(parentId, {
			page,
			size,
			fields,
			sort,
			id,
			q,
			slaConditionId,
			priorityId,
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

const getCondition = async ({ parentId, itemId: id }) => {
	const itemResponseHandler = (item) => item.slaCondition;

	try {
		const response = await getSlaconditions().locateSLACondition(parentId, id);
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

const addCondition = async ({ itemInstance, parentId }) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		CreateSLAConditionBody,
	);

	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getSlaconditions().createSLACondition(
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

const updateCondition = async ({ itemInstance, itemId: id }) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		UpdateSLAConditionBody,
	);

	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getSlaconditions().updateSLACondition(
			itemInstance.slaId,
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

const deleteCondition = async ({ id, parentId }) => {
	try {
		const response = await getSlaconditions().deleteSLACondition(parentId, id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getLookup = async (params) =>
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
