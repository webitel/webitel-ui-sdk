import { CloseReasonsApiFactory } from 'webitel-sdk';
import {
	getDefaultGetListResponse,
	getDefaultGetParams,
	getDefaultInstance,
	getDefaultOpenAPIConfig,
} from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
} from '../../transformers';
import type { ApiId, ApiParams, UpdateItemParams } from '../_shared/types';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const closeReasonsService = CloseReasonsApiFactory(configuration, '', instance);

const fieldsToSend = [
	'name',
	'description',
];

const getCloseReasonsList = async ({
	parentId,
	...rest
}: {
	parentId: ApiId;
} & ApiParams) => {
	const fieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
	];

	const { page, size, fields, sort, id, q } = applyTransform(rest, [
		merge(getDefaultGetParams()),
		(params) => ({
			...params,
			q: params.search,
		}),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await closeReasonsService.listCloseReasons(
			String(parentId),
			page,
			size,
			fields,
			sort,
			id,
			q,
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
	const itemResponseHandler = (item: ApiParams) => {
		return item.closeReason;
	};

	try {
		const response = await closeReasonsService.locateCloseReason(
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
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await closeReasonsService.createCloseReason(
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
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
	]);

	try {
		const response = await closeReasonsService.updateCloseReason(
			itemInstance.id,
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
		const response = await closeReasonsService.deleteCloseReason(
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
