import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { pauseTemplateSchema } from '@webitel/api-services/validations';
import {
	getPauseTemplateService,
	PauseTemplateServiceSearchPauseTemplateQueryParams,
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

const fieldsToSend = getShallowFieldsToSendFromZodSchema(pauseTemplateSchema);

/**
 * [Claude] WFM services wrap both request and response payloads in an `item` envelope.
 */
const itemResponseHandler = (response: ApiParams) => ({
	...response.item,
});

const getPauseTemplatesList = async (params: ApiParams) => {
	const requestParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params: ApiParams) => ({
			...params,
			q: params.q ?? params.search,
		}),
		sanitizeToWire(
			getShallowFieldsToSendFromZodSchema(
				PauseTemplateServiceSearchPauseTemplateQueryParams,
			),
		),
		camelToSnake(),
	]);

	try {
		const response =
			await getPauseTemplateService().pauseTemplateServiceSearchPauseTemplate(
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

const getPauseTemplate = async ({ itemId: id }: GetItemParams) => {
	try {
		const response =
			await getPauseTemplateService().pauseTemplateServiceReadPauseTemplate(
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

const addPauseTemplate = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response =
			await getPauseTemplateService().pauseTemplateServiceCreatePauseTemplate({
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

const updatePauseTemplate = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response =
			await getPauseTemplateService().pauseTemplateServiceUpdatePauseTemplate(
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

const deletePauseTemplate = async ({ id }: DeleteItemParams) => {
	try {
		const response =
			await getPauseTemplateService().pauseTemplateServiceDeletePauseTemplate(
				String(id),
			);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getPauseTemplatesLookup = (params: ApiParams) =>
	getPauseTemplatesList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const PauseTemplatesAPI = {
	getList: getPauseTemplatesList,
	get: getPauseTemplate,
	add: addPauseTemplate,
	update: updatePauseTemplate,
	delete: deletePauseTemplate,
	getLookup: getPauseTemplatesLookup,
};
