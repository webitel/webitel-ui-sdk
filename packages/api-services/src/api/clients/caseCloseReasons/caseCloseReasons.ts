import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import {
	CreateCloseReasonBody,
	getCloseReasons,
	ListCloseReasonsQueryParams,
	UpdateCloseReasonBody,
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
	ApiId,
	ApiParams,
	NestedUpdateItemParams,
} from '../_shared/types';

const getCloseReasonsList = async ({
	parentId,
	...rest
}: {
	parentId: ApiId;
} & ApiParams) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		ListCloseReasonsQueryParams,
	);

	const { page, size, fields, sort, id, q } = applyTransform(rest, [
		merge(getDefaultGetParams()),
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getCloseReasons().listCloseReasons(
			String(parentId),
			{
				page,
				size,
				fields,
				sort,
				id,
				q: q || rest.search,
			},
		);
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

const getCloseReason = async ({
	parentId,
	itemId: id,
}: {
	parentId: ApiId;
	itemId: ApiId;
}) => {
	const itemResponseHandler = (item: ApiParams) => item.closeReason;

	try {
		const response = await getCloseReasons().locateCloseReason(
			String(parentId),
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

const addCloseReason = async ({
	itemInstance,
	parentId,
}: {
	itemInstance: ApiParams;
	parentId: ApiId;
}) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		CreateCloseReasonBody,
	);

	const item = applyTransform(itemInstance, [
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getCloseReasons().createCloseReason(
			String(parentId),
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

const updateCloseReason = async ({
	itemInstance,
	itemId: id,
	parentId,
}: NestedUpdateItemParams) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		UpdateCloseReasonBody,
	);

	const item = applyTransform(itemInstance, [
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getCloseReasons().updateCloseReason(
			String(parentId),
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

const deleteCloseReason = async ({
	id,
	parentId,
}: {
	id: ApiId;
	parentId: ApiId;
}) => {
	try {
		const response = await getCloseReasons().deleteCloseReason(
			String(parentId),
			String(id),
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getCloseReasonLookup = async (
	params: Parameters<typeof getCloseReasonsList>[0],
) =>
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
