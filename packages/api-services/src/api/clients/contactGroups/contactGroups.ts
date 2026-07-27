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

const baseUrl = '/contacts/groups';

const groupFieldsToSend = getShallowFieldsToSendFromZodSchema(UpdateGroupBody);

const appendStaticType = (item) => ({
	...item,
	type: item.type ?? ContactsGroupType.Static,
});

const getContactGroupsList = async (params) => {
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

const getContactGroup = async ({ itemId: id }) => {
	const itemResponseHandler = (item) => item.group;

	try {
		const response = await getGroups().locateGroup(id);
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

const addStaticContactGroup = async ({ itemInstance }) => {
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

const addContactsToGroups = async ({ contactIds, groupIds }) => {
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

const removeContactsFromGroup = async ({ id, contactIds }) => {
	try {
		const response = await getGroups().removeContactsFromGroup(id, {
			contactIds,
		});
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateStaticContactGroup = async ({ itemInstance, itemId: id }) => {
	const item = applyTransform(itemInstance, [
		sanitize(groupFieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getGroups().updateGroup(id, item);
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

const patchStaticContactGroup = async ({ id, changes }) => {
	const item = applyTransform(changes, [
		sanitize(groupFieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getGroups().updateGroup2(id, item);
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

const deleteStaticContactGroup = async ({ id }) => {
	try {
		const response = await getGroups().deleteGroup(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getLookup = (params) =>
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
