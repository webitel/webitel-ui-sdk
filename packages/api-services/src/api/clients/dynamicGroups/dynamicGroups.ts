import {
	CreateDynamicGroupBody,
	getDynamicGroups,
	ListDynamicGroupsQueryParams,
	UpdateDynamicGroup2Body,
	UpdateDynamicGroupBody,
} from '@webitel/api-services/gen';
import { ContactsGroupType } from '@webitel/api-services/gen/models';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';

import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
} from '../../transformers';

const dynamicGroupFieldsToSend = getShallowFieldsToSendFromZodSchema(
	UpdateDynamicGroupBody,
);

const appendDynamicType = (item: Record<string, unknown>) => ({
	...item,
	type: ContactsGroupType.Dynamic,
});

const getDynamicGroupsList = async (params: Record<string, unknown>) => {
	const listFieldsToSend = getShallowFieldsToSendFromZodSchema(
		ListDynamicGroupsQueryParams,
	);

	const { page, size, fields, sort, id, q, name } = applyTransform(params, [
		merge(getDefaultGetParams()),
		sanitize(listFieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getDynamicGroups().listDynamicGroups({
			page,
			size,
			fields,
			sort,
			id,
			q: q || params.search,
			name,
		});
		const { items, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, []),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getDynamicGroup = async ({ itemId: id }: { itemId: string }) => {
	const itemResponseHandler = (item: { group: unknown }) => item.group;

	try {
		const response = await getDynamicGroups().locateDynamicGroup(id, {
			fields: dynamicGroupFieldsToSend,
		});
		return applyTransform(response.data, [
			snakeToCamel(),
			itemResponseHandler,
			appendDynamicType,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addDynamicGroup = async ({
	itemInstance,
}: {
	itemInstance: Record<string, unknown>;
}) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		CreateDynamicGroupBody,
	);

	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getDynamicGroups().createDynamicGroup(item);
		return applyTransform(response.data, [
			snakeToCamel(),
			appendDynamicType,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateDynamicGroup = async ({
	itemInstance,
	itemId: id,
}: {
	itemInstance: Record<string, unknown>;
	itemId: string;
}) => {
	const item = applyTransform(itemInstance, [
		sanitize(dynamicGroupFieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getDynamicGroups().updateDynamicGroup(id, item);
		return applyTransform(response.data, [
			snakeToCamel(),
			appendDynamicType,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchDynamicGroup = async ({
	changes,
	itemId: id,
}: {
	changes: Record<string, unknown>;
	itemId: string;
}) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		UpdateDynamicGroup2Body,
	);

	const item = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getDynamicGroups().updateDynamicGroup2(id, item);
		return applyTransform(response.data, [
			snakeToCamel(),
			appendDynamicType,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteDynamicGroup = async ({ id }: { id: string }) => {
	try {
		const response = await getDynamicGroups().deleteDynamicGroup(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getLookup = (params: Record<string, unknown>) =>
	getDynamicGroupsList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const DynamicGroupsAPI = {
	getList: getDynamicGroupsList,
	get: getDynamicGroup,
	add: addDynamicGroup,
	update: updateDynamicGroup,
	patch: patchDynamicGroup,
	delete: deleteDynamicGroup,
	getLookup,
};
