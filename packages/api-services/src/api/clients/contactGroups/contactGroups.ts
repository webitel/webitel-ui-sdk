import {
	AddContactsToGroupsBody,
	CreateGroupBody,
	getGroups,
	ListGroupsQueryParams,
	UpdateGroupBody,
} from '@webitel/api-services/gen';
import { ContactsGroupType } from '@webitel/api-services/gen/models';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';

import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	mergeEach,
	notify,
	sanitize,
	snakeToCamel,
} from '../../transformers';
import { generatePermissionsApi } from '../_shared/generatePermissionsApi';
import type {
	AddItemParams,
	ApiId,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	PatchItemParams,
	UpdateItemParams,
} from '../_shared/types';

const baseUrl = '/contacts/groups';

const groupFieldsToSend = getShallowFieldsToSendFromZodSchema(UpdateGroupBody);

const appendStaticType = (item: ApiParams) => ({
	...item,
	type: item.type ?? ContactsGroupType.Static,
});

const getContactGroupsList = async (params: ApiParams) => {
	const listFieldsToSend = getShallowFieldsToSendFromZodSchema(
		ListGroupsQueryParams,
	);
	const defaultObject = {
		enabled: false,
	};

	const { page, size, fields, sort, id, q, name, type, enabled } =
		applyTransform(params, [
			merge(getDefaultGetParams()),
			sanitize(listFieldsToSend),
			camelToSnake(),
		]);

	try {
		const response = await getGroups().listGroups({
			page,
			size,
			fields,
			sort,
			id,
			q: q || params.search,
			name,
			type,
			enabled,
		});
		const { items, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				mergeEach(defaultObject),
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

const getContactGroup = async ({ itemId: id }: GetItemParams) => {
	const itemResponseHandler = (item: { group: unknown }) => item.group;

	try {
		const response = await getGroups().locateGroup(String(id));
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

const addStaticContactGroup = async ({ itemInstance }: AddItemParams) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(CreateGroupBody);

	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getGroups().createGroup(item);
		return applyTransform(response.data, [
			snakeToCamel(),
			appendStaticType,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addContactsToGroups = async ({
	contactIds,
	groupIds,
}: {
	contactIds: ApiId[];
	groupIds: ApiId[];
}) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		AddContactsToGroupsBody,
	);

	const item = applyTransform(
		{
			groupIds,
			contactIds,
		},
		[
			sanitize(fieldsToSend),
		],
	);

	try {
		const response = await getGroups().addContactsToGroups(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const removeContactsFromGroup = async ({
	id,
	contactIds,
}: {
	id: ApiId;
	contactIds: ApiId[];
}) => {
	try {
		const response = await getGroups().removeContactsFromGroup(String(id), {
			contactIds: contactIds.map(String),
		});
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateStaticContactGroup = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(groupFieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getGroups().updateGroup(String(id), item);
		return applyTransform(response.data, [
			snakeToCamel(),
			appendStaticType,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchStaticContactGroup = async ({ id, changes }: PatchItemParams) => {
	const item = applyTransform(changes, [
		sanitize(groupFieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getGroups().updateGroup2(String(id), item);
		return applyTransform(response.data, [
			snakeToCamel(),
			appendStaticType,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteStaticContactGroup = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getGroups().deleteGroup(String(id));
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getLookup = (params: Parameters<typeof getContactGroupsList>[0]) =>
	getContactGroupsList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const ContactGroupsAPI = {
	getList: getContactGroupsList,
	get: getContactGroup,
	add: addStaticContactGroup,
	update: updateStaticContactGroup,
	patch: patchStaticContactGroup,
	delete: deleteStaticContactGroup,
	getLookup,
	addContactsToGroups,
	removeContactsFromGroup,

	...generatePermissionsApi(baseUrl),
};
