import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import {
	ConfigServiceCreateConfigBody,
	ConfigServicePatchConfigBody,
	ConfigServiceReadSystemObjectsQueryParams,
	ConfigServiceSearchConfigQueryParams,
	ConfigServiceUpdateConfigBody,
	getConfigService,
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
import type {
	AddItemParams,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	PatchItemParams,
	UpdateItemParams,
} from '../_shared/types';

const getChangelogsList = async (params: ApiParams) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		ConfigServiceSearchConfigQueryParams,
	);

	const transformedParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		(params) => ({
			...params,
			q: params.search,
		}),
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response =
			await getConfigService().configServiceSearchConfig(transformedParams);
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

const getChangelog = async ({ itemId: id }: GetItemParams) => {
	try {
		const response = await getConfigService().configServiceReadConfig(
			Number(id),
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

const addChangelog = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitizeToWire(
			getShallowFieldsToSendFromZodSchema(ConfigServiceCreateConfigBody),
		),
		camelToSnake(),
	]);
	try {
		const response = await getConfigService().configServiceCreateConfig(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateChangelog = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitizeToWire(
			getShallowFieldsToSendFromZodSchema(ConfigServiceUpdateConfigBody),
		),
	]);

	try {
		const response = await getConfigService().configServiceUpdateConfig(
			Number(id),
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

const patchChangelog = async ({ id, changes }: PatchItemParams) => {
	const body = applyTransform(changes, [
		sanitizeToWire(
			getShallowFieldsToSendFromZodSchema(ConfigServicePatchConfigBody),
		),
		camelToSnake(),
	]);
	try {
		const response = await getConfigService().configServicePatchConfig(
			Number(id),
			body,
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

const deleteChangelog = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getConfigService().configServiceDeleteConfig(
			Number(id),
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getLookup = (params: Parameters<typeof getChangelogsList>[0]) =>
	getChangelogsList({
		...params,
		fields: params.fields || [
			'id',
			'object',
		],
	});

const getObjectsList = async (params: ApiParams) => {
	const transformedParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		(params) => ({
			...params,
			q: params.search,
		}),
		// without this the caller's `search` rides along beside `q`, and the
		// endpoint declares only `q`
		sanitizeToWire(
			getShallowFieldsToSendFromZodSchema(
				ConfigServiceReadSystemObjectsQueryParams,
			),
		),
		camelToSnake(),
	]);

	try {
		const response =
			await getConfigService().configServiceReadSystemObjects(
				transformedParams,
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

export const ChangelogsAPI = {
	getList: getChangelogsList,
	get: getChangelog,
	add: addChangelog,
	update: updateChangelog,
	patch: patchChangelog,
	delete: deleteChangelog,
	getLookup,
	getObjectsList,
};
