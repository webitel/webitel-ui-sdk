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
	ApiId,
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

/** [Claude] The bulk item has no `listId`: the list goes in the path. */
const bulkFieldsToSend = [
	'number',
	'description',
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

/**
 * [Claude] CSV import. Not part of the ApiModule contract — called straight from the popup.
 * Rows the backend rejects (e.g. duplicates) come back in `failures`, not as an error.
 */
const addBlacklistNumberBulk = async ({
	parentId,
	items,
}: {
	parentId: ApiId;
	items: ApiParams[];
}) => {
	const body = {
		items: items.map((item) =>
			applyTransform(item, [
				sanitize(bulkFieldsToSend),
				camelToSnake(),
			]),
		),
	};
	try {
		const response = await getListService().createListCommunicationBulk(
			String(parentId),
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
	addBulk: addBlacklistNumberBulk,
	update: updateBlacklistNumber,
	delete: deleteBlacklistNumber,
};
