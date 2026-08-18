import { SLAConditionsApiFactory } from 'webitel-sdk';
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

const slaConditionsService = SLAConditionsApiFactory(
	configuration,
	'',
	instance,
);

const fieldsToSend = [
	'name',
	'priorities',
	'sla_id',
	'reaction_time',
	'resolution_time',
];

const getConditionsList = async ({
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
		'slaConditionId',
		'priorityId',
	];

	const {
		page,
		size,
		fields,
		sort,
		id,
		q,
		sla_condition_id: slaConditionId,
		priority_id: priorityId,
	} = applyTransform(rest, [
		merge(getDefaultGetParams()),
		(params) => ({
			...params,
			q: params.search,
		}),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await slaConditionsService.listSLAConditions(
			String(parentId),
			page,
			size,
			fields,
			sort,
			id,
			q,
			slaConditionId,
			priorityId,
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

const getCondition = async ({
	parentId,
	itemId: id,
}: {
	parentId: ApiId;
	itemId: ApiId;
}) => {
	const itemResponseHandler = (item: ApiParams) => {
		return item.slaCondition;
	};

	try {
		const response = await slaConditionsService.locateSLACondition(
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

const updateCondition = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await slaConditionsService.updateSLACondition(
			itemInstance.slaId,
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

const addCondition = async ({
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
		const response = await slaConditionsService.createSLACondition(
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

const deleteCondition = async ({
	id,
	parentId,
}: {
	id: ApiId;
	parentId: ApiId;
}) => {
	try {
		const response = await slaConditionsService.deleteSLACondition(
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

const getLookup = async (params: Parameters<typeof getConditionsList>[0]) =>
	getConditionsList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const SLAConditionsAPI = {
	getList: getConditionsList,
	get: getCondition,
	update: updateCondition,
	delete: deleteCondition,
	add: addCondition,
	getLookup,
};
