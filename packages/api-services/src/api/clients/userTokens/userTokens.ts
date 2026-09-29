import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { userTokenSchema } from '@webitel/api-services/validations';
import { getUserAccessTokens } from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitizeToWire,
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

const fieldsToSend = getShallowFieldsToSendFromZodSchema(userTokenSchema);

const getUserTokensList = async (params: ApiParams) => {
	const { page, size, search, sort, fields, parentId } = applyTransform(
		params,
		[
			merge(getDefaultGetParams()),
			starToSearch('search'),
		],
	);

	try {
		const response = await getUserAccessTokens().listUserAccessToken(
			String(parentId),
			{
				page,
				size,
				q: search,
				sort: sort
					? [
							sort,
						]
					: undefined,
				fields,
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

const getUserToken = async ({ parentId, itemId: id }: NestedGetItemParams) => {
	try {
		const response = await getUserAccessTokens().getUserAccessToken(
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

const addUserToken = async ({
	parentId,
	itemInstance,
}: NestedAddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getUserAccessTokens().addUserAccessToken(
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

const updateUserToken = async ({
	parentId,
	itemId: id,
	itemInstance,
}: NestedUpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getUserAccessTokens().updateUserAccessToken(
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

const deleteUserToken = async ({ parentId, id }: NestedDeleteItemParams) => {
	try {
		const response = await getUserAccessTokens().deleteUserAccessToken(
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

export const UserTokensAPI = {
	getList: getUserTokensList,
	get: getUserToken,
	add: addUserToken,
	update: updateUserToken,
	delete: deleteUserToken,
};
