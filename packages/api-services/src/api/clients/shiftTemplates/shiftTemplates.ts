import { getShiftTemplateService } from '../../../gen-wire';
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
	'times',
];

/**
 * WFM services wrap both request and response payloads in an `item` envelope.
 */
const itemResponseHandler = (response: ApiParams) => {
	const copy = {
		...response.item,
	};

	copy.times = copy.times?.map((time: ApiParams) => ({
		...time,
		duration: time.end - time.start,
	}));

	return copy;
};

const getShiftTemplatesList = async (params: ApiParams) => {
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
			await getShiftTemplateService().shiftTemplateServiceSearchShiftTemplate({
				q,
				page,
				size,
				sort,
				fields,
			});
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

const getShiftTemplate = async ({ itemId: id }: GetItemParams) => {
	try {
		const response =
			await getShiftTemplateService().shiftTemplateServiceReadShiftTemplate(
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

const addShiftTemplate = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response =
			await getShiftTemplateService().shiftTemplateServiceCreateShiftTemplate({
				item: {
					...item,
				},
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

const updateShiftTemplate = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response =
			await getShiftTemplateService().shiftTemplateServiceUpdateShiftTemplate(
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

const deleteShiftTemplate = async ({ id }: DeleteItemParams) => {
	try {
		const response =
			await getShiftTemplateService().shiftTemplateServiceDeleteShiftTemplate(
				String(id),
			);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getShiftTemplatesLookup = (
	params: Parameters<typeof getShiftTemplatesList>[0],
) =>
	getShiftTemplatesList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const ShiftTemplatesAPI = {
	getList: getShiftTemplatesList,
	get: getShiftTemplate,
	add: addShiftTemplate,
	update: updateShiftTemplate,
	delete: deleteShiftTemplate,
	getLookup: getShiftTemplatesLookup,
};
