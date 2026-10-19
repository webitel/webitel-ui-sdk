import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { workingConditionSchema } from '@webitel/api-services/validations';
import {
	getWorkingConditionService,
	WorkingConditionServiceSearchWorkingConditionQueryParams,
} from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
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
	UpdateItemParams,
} from '../_shared/types';

const fieldsToSend = getShallowFieldsToSendFromZodSchema(
	workingConditionSchema,
);

/**
 * [Claude] WFM services wrap both request and response payloads in an `item` envelope.
 */
const itemResponseHandler = (response: ApiParams) => ({
	...response.item,
});

const getWorkingConditionsList = async (params: ApiParams) => {
	const requestParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params: ApiParams) => ({
			...params,
			q: params.q ?? params.search,
		}),
		sanitizeToWire(
			getShallowFieldsToSendFromZodSchema(
				WorkingConditionServiceSearchWorkingConditionQueryParams,
			),
		),
		camelToSnake(),
	]);

	try {
		const response =
			await getWorkingConditionService().workingConditionServiceSearchWorkingCondition(
				requestParams,
			);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getWorkingCondition = async ({ itemId: id }: GetItemParams) => {
	try {
		const response =
			await getWorkingConditionService().workingConditionServiceReadWorkingCondition(
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

const addWorkingCondition = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response =
			await getWorkingConditionService().workingConditionServiceCreateWorkingCondition(
				{
					item,
				},
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

const updateWorkingCondition = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response =
			await getWorkingConditionService().workingConditionServiceUpdateWorkingCondition(
				String(id),
				{
					item,
				},
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

const deleteWorkingCondition = async ({ id }: DeleteItemParams) => {
	try {
		const response =
			await getWorkingConditionService().workingConditionServiceDeleteWorkingCondition(
				String(id),
			);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getWorkingConditionsLookup = (params: ApiParams) =>
	getWorkingConditionsList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const WorkingConditionsAPI = {
	getList: getWorkingConditionsList,
	get: getWorkingCondition,
	add: addWorkingCondition,
	update: updateWorkingCondition,
	delete: deleteWorkingCondition,
	getLookup: getWorkingConditionsLookup,
};
