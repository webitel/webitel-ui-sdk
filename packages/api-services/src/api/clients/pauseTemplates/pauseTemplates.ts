import deepCopy from 'deep-copy';
import { getPauseTemplateService } from '../../../gen-wire';
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
	'causes',
	'domainId',
	'createdAt',
	'createdBy',
	'updatedAt',
	'updatedBy',
];

/**
 * WFM services wrap both request and response payloads in an `item` envelope,
 * and nest each pause cause under a `cause` key. The form binds a flat
 * `{ id, name, duration }`.
 */
const itemResponseHandler = (response: ApiParams) => {
	const item = {
		...response.item,
	};

	item.causes = item.causes?.map((cause: ApiParams) => ({
		id: cause.cause?.id,
		name: cause.cause?.name,
		duration: cause?.duration,
	}));

	return item;
};

const preRequestHandler = (item: ApiParams) => {
	const copy = deepCopy(item);
	copy.causes = copy.causes.map((cause: ApiParams) => {
		if (!cause.name && !cause.id) return cause;
		return {
			cause: {
				id: cause?.id,
				name: cause?.name,
			},
			duration: cause.duration,
		};
	});
	return copy;
};

const getPauseTemplatesList = async (params: ApiParams) => {
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
			await getPauseTemplateService().pauseTemplateServiceSearchPauseTemplate({
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
		sanitize(fieldsToSend),
		camelToSnake(),
		preRequestHandler,
	]);
	try {
		const response =
			await getPauseTemplateService().pauseTemplateServiceCreatePauseTemplate({
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

const updatePauseTemplate = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
		preRequestHandler,
	]);
	try {
		const response =
			await getPauseTemplateService().pauseTemplateServiceUpdatePauseTemplate(
				String(id),
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

const getPauseTemplatesLookup = (
	params: Parameters<typeof getPauseTemplatesList>[0],
) =>
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
