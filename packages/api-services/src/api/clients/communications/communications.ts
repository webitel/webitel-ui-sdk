import { getCommunicationTypeService } from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	mergeEach,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type {
	AddItemParams,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	PatchItemParams,
	UpdateItemParams,
} from '../_shared/types';

const getCommunicationsList = async (params: ApiParams) => {
	const defaultObject = {
		default: false,
	};

	const requestParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		camelToSnake(),
		(params) => ({
			...params,
			q: params.search,
		}),
		sanitize([
			'page',
			'size',
			'q',
			'sort',
			'fields',
			'id',
			'channel',
		]),
	]);

	try {
		const response =
			await getCommunicationTypeService().searchCommunicationType(
				requestParams,
			);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				mergeEach(defaultObject),
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getCommunication = async ({ itemId: id }: GetItemParams) => {
	try {
		const response = await getCommunicationTypeService().readCommunicationType(
			String(id),
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

const fieldsToSend = [
	'code',
	'name',
	'description',
	'channel',
	'default',
];

const addCommunication = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response =
			await getCommunicationTypeService().createCommunicationType(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchCommunication = async ({ changes, id }: PatchItemParams) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getCommunicationTypeService().patchCommunicationType(
			String(id),
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

const updateCommunication = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response =
			await getCommunicationTypeService().updateCommunicationType(
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

const deleteCommunication = async ({ id }: DeleteItemParams) => {
	try {
		const response =
			await getCommunicationTypeService().deleteCommunicationType(String(id));
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getCommunicationsLookup = (
	params: Parameters<typeof getCommunicationsList>[0],
) =>
	getCommunicationsList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const CommunicationsAPI = {
	getList: getCommunicationsList,
	get: getCommunication,
	add: addCommunication,
	patch: patchCommunication,
	update: updateCommunication,
	delete: deleteCommunication,
	getLookup: getCommunicationsLookup,
};
