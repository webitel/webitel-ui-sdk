import { StatusConditionsApiFactory } from 'webitel-sdk';
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
import type { ApiId, ApiParams } from '../_shared/types';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const statusConditionsService = StatusConditionsApiFactory(
	configuration,
	'',
	instance,
);

const fieldsToSend = [
	'name',
	'description',
];

const getStatusConditionsList = async ({
	statusId,
	parentId,
	...rest
}: {
	statusId?: ApiId;
	parentId?: ApiId;
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
		const response = await statusConditionsService.listStatusConditions(
			String(statusId || parentId),
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

const getStatusCondition = async ({
	parentId,
	itemId: id,
}: {
	parentId: ApiId;
	itemId: ApiId;
}) => {
	const itemResponseHandler = (item: ApiParams) => {
		return item.status;
	};

	try {
		const response = await statusConditionsService.locateStatusCondition(
			String(parentId),
			String(id),
			fieldsToSend,
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

const updateStatusCondition = async ({
	itemInstance,
	itemId: id,
	parentId,
}: {
	itemInstance: ApiParams;
	itemId: ApiId;
	parentId: ApiId;
}) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await statusConditionsService.updateStatusCondition(
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

const addStatusCondition = async ({
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
		const response = await statusConditionsService.createStatusCondition(
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

const patchStatusCondition = async ({
	id,
	parentId,
	changes,
}: {
	id: ApiId;
	parentId: ApiId;
	changes: ApiParams;
}) => {
	const fieldsToSend = [
		'name',
		'description',
		'initial',
		'final',
	];
	const input = applyTransform(changes, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await statusConditionsService.updateStatusCondition2(
			String(parentId),
			String(id),
			input,
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteStatusCondition = async ({
	id,
	parentId,
}: {
	id: ApiId;
	parentId: ApiId;
}) => {
	try {
		const response = await statusConditionsService.deleteStatusCondition(
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

const getStatusesLookup = (
	params: Parameters<typeof getStatusConditionsList>[0],
) =>
	getStatusConditionsList({
		...params,
		parentId: params.parentId,
		id: params.id,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const CaseStatusConditionsAPI = {
	getList: getStatusConditionsList,
	getLookup: getStatusesLookup,
	get: getStatusCondition,
	update: updateStatusCondition,
	patch: patchStatusCondition,
	delete: deleteStatusCondition,
	add: addStatusCondition,
};
