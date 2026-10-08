import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { shiftTemplateSchema } from '@webitel/api-services/validations';
import {
	getShiftTemplateService,
	ShiftTemplateServiceSearchShiftTemplateQueryParams,
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

const fieldsToSend = getShallowFieldsToSendFromZodSchema(shiftTemplateSchema);

/**
 * [Claude] WFM services wrap both request and response payloads in an `item` envelope.
 */
const itemResponseHandler = (response: ApiParams) => ({
	...response.item,
});

const getShiftTemplatesList = async (params: ApiParams) => {
	const requestParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params: ApiParams) => ({
			...params,
			q: params.q ?? params.search,
		}),
		sanitizeToWire(
			getShallowFieldsToSendFromZodSchema(
				ShiftTemplateServiceSearchShiftTemplateQueryParams,
			),
		),
		camelToSnake(),
	]);

	try {
		const response =
			await getShiftTemplateService().shiftTemplateServiceSearchShiftTemplate(
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
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response =
			await getShiftTemplateService().shiftTemplateServiceCreateShiftTemplate({
				item,
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
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response =
			await getShiftTemplateService().shiftTemplateServiceUpdateShiftTemplate(
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

const getShiftTemplatesLookup = (params: ApiParams) =>
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
