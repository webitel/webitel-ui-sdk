import {
	CreateCloseReasonBody,
	getCloseReasons,
	ListCloseReasonsQueryParams,
	UpdateCloseReasonBody,
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

const getCloseReasonsList = async ({ parentId, ...rest }) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		ListCloseReasonsQueryParams,
	);

	const { page, size, fields, sort, id, q } = applyTransform(rest, [
		merge(getDefaultGetParams()),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getCloseReasons().listCloseReasons(parentId, {
			page,
			size,
			fields,
			sort,
			id,
			q: q || rest.search,
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

const getCloseReason = async ({ parentId, itemId: id }) => {
	const itemResponseHandler = (item) => item.closeReason;

	try {
		const response = await getCloseReasons().locateCloseReason(parentId, id);
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

const addCloseReason = async ({ itemInstance, parentId }) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		CreateCloseReasonBody,
	);

	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getCloseReasons().createCloseReason(parentId, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateCloseReason = async ({ itemInstance, itemId: id }) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		UpdateCloseReasonBody,
	);

	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getCloseReasons().updateCloseReason(
			itemInstance.closeReasonGroupId,
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

const deleteCloseReason = async ({ id, parentId }) => {
	try {
		const response = await getCloseReasons().deleteCloseReason(parentId, id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getCloseReasonLookup = async (params) =>
	getCloseReasonsList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const CaseCloseReasonsAPI = {
	getList: getCloseReasonsList,
	getLookup: getCloseReasonLookup,
	get: getCloseReason,
	add: addCloseReason,
	update: updateCloseReason,
	delete: deleteCloseReason,
};
