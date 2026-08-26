import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import {
	CreateCloseReasonGroupBody,
	getCloseReasonGroups,
	ListCloseReasonGroupsQueryParams,
	UpdateCloseReasonGroupBody,
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
	UpdateItemParams,
} from '../_shared/types';

const getCloseReasonGroupsList = async (params: ApiParams) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		ListCloseReasonGroupsQueryParams,
	);

	const { page, size, fields, sort, id, q } = applyTransform(params, [
		merge(getDefaultGetParams()),
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getCloseReasonGroups().listCloseReasonGroups({
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

const getCloseReasonGroup = async ({ itemId: id }: GetItemParams) => {
	const itemResponseHandler = (item: ApiParams) => item.closeReasonGroup;

	try {
		const response = await getCloseReasonGroups().locateCloseReasonGroup(
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

const addCloseReasonGroup = async ({ itemInstance }: AddItemParams) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		CreateCloseReasonGroupBody,
	);

	const item = applyTransform(itemInstance, [
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getCloseReasonGroups().createCloseReasonGroup(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateCloseReasonGroup = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		UpdateCloseReasonGroupBody,
	);

	const item = applyTransform(itemInstance, [
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getCloseReasonGroups().updateCloseReasonGroup(
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

const deleteCloseReasonGroup = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getCloseReasonGroups().deleteCloseReasonGroup(
			String(id),
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getCloseReasonGroupsLookup = async (
	params: Parameters<typeof getCloseReasonGroupsList>[0],
) =>
	getCloseReasonGroupsList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const CaseCloseReasonGroupsAPI = {
	getList: getCloseReasonGroupsList,
	get: getCloseReasonGroup,
	add: addCloseReasonGroup,
	update: updateCloseReasonGroup,
	delete: deleteCloseReasonGroup,
	getLookup: getCloseReasonGroupsLookup,
};
