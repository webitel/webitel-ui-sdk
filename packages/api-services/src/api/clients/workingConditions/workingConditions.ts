import { getWorkingConditionService } from '../../../gen-wire';
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
	'workdayHours',
	'workdayPerMonth',
	'pauseDuration',
	'vacation',
	'pauseTemplate',
	'sickLeaves',
	'shiftTemplate',
	'daysOff',
	'createdAt',
	'createdBy',
	'domainId',
	'id',
	'updatedAt',
	'updatedBy',
];

/**
 * WFM services wrap both request and response payloads in an `item` envelope.
 */
const itemResponseHandler = (response: ApiParams) => ({
	...response.item,
});

const getWorkingConditionsList = async (params: ApiParams) => {
	const {
		search: q,
		page,
		size,
		sort,
		fields,
	} = applyTransform(params, [
		merge(getDefaultGetParams()),
	]);

	try {
		const response =
			await getWorkingConditionService().workingConditionServiceSearchWorkingCondition(
				{
					page,
					size,
					q,
					sort,
					fields,
				},
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
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response =
			await getWorkingConditionService().workingConditionServiceCreateWorkingCondition(
				{
					item: {
						...item,
					},
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
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response =
			await getWorkingConditionService().workingConditionServiceUpdateWorkingCondition(
				String(id),
				{
					item: {
						...item,
					},
				},
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

const getWorkingConditionsLookup = (
	params: Parameters<typeof getWorkingConditionsList>[0],
) =>
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
