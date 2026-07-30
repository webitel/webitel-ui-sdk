import {
	CreateCloseReasonGroupBody,
	getCloseReasonGroups,
	ListCloseReasonGroupsQueryParams,
	UpdateCloseReasonGroupBody,
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

const getCloseReasonGroupsList = async (params) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		ListCloseReasonGroupsQueryParams,
	);

	const { page, size, fields, sort, id, q } = applyTransform(params, [
		merge(getDefaultGetParams()),
		sanitize(fieldsToSend),
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

const getCloseReasonGroup = async ({ itemId: id }) => {
	const itemResponseHandler = (item) => item.closeReasonGroup;

	try {
		const response = await getCloseReasonGroups().locateCloseReasonGroup(id);
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

const addCloseReasonGroup = async ({ itemInstance }) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		CreateCloseReasonGroupBody,
	);

	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
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

const updateCloseReasonGroup = async ({ itemInstance, itemId: id }) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		UpdateCloseReasonGroupBody,
	);

	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getCloseReasonGroups().updateCloseReasonGroup(
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

const deleteCloseReasonGroup = async ({ id }) => {
	try {
		const response = await getCloseReasonGroups().deleteCloseReasonGroup(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getCloseReasonGroupsLookup = async (params) =>
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
