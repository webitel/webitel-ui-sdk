import { getListService } from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type {
	ApiParams,
	NestedAddItemParams,
	NestedDeleteItemParams,
	NestedGetItemParams,
	NestedUpdateItemParams,
} from '../_shared/types';

/** Numbers inside one blacklist. `parentId` is the list. */
const fieldsToSend = [
	'listId',
	'description',
	'number',
	'expireAt',
];

const getBlacklistNumbersList = async (params: ApiParams) => {
	const { parentId, page, size, search, sort, fields, id } = applyTransform(
		params,
		[
			merge(getDefaultGetParams()),
			starToSearch('search'),
		],
	);

	try {
		const response = await getListService().searchListCommunication(
			String(parentId),
			{
				page,
				size,
				// the generated param is `q`; `search` is what the datalist store sends
				q: search,
				sort,
				fields,
				id,
			},
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

const getBlacklistNumber = async ({
	parentId,
	itemId: id,
}: NestedGetItemParams) => {
	try {
		const response = await getListService().readListCommunication(
			String(parentId),
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

const addBlacklistNumber = async ({
	parentId,
	itemInstance,
}: NestedAddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getListService().createListCommunication(
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

const updateBlacklistNumber = async ({
	parentId,
	itemInstance,
	itemId: id,
}: NestedUpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getListService().updateListCommunication(
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

const deleteBlacklistNumber = async ({
	parentId,
	id,
}: NestedDeleteItemParams) => {
	try {
		const response = await getListService().deleteListCommunication(
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

export const BlacklistNumbersAPI = {
	getList: getBlacklistNumbersList,
	get: getBlacklistNumber,
	add: addBlacklistNumber,
	update: updateBlacklistNumber,
	delete: deleteBlacklistNumber,
};
