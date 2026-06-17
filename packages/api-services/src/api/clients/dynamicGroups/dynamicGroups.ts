import { ContactsGroupType } from '@webitel/api-services/gen/models';
import { DynamicGroupsApiFactory } from 'webitel-sdk';

import { getDefaultInstance, getDefaultOpenAPIConfig } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	notify,
	sanitize,
	snakeToCamel,
} from '../../transformers';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const dynamicContactGroupsService = DynamicGroupsApiFactory(
	configuration,
	'',
	instance,
);

const fieldsToSend = [
	'name',
	'description',
	'enabled',
	'type',
	'default_group',
];

const addDynamicContactGroup = async ({
	itemInstance,
}: {
	itemInstance: Record<string, unknown>;
}) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await dynamicContactGroupsService.createDynamicGroup(item);
		return applyTransform(response.data, [
			snakeToCamel(),
			(item: Record<string, unknown>) => ({
				...item,
				type: ContactsGroupType.Dynamic,
			}),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateDynamicContactGroup = async ({
	itemInstance,
	itemId: id,
}: {
	itemInstance: Record<string, unknown>;
	itemId: string;
}) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await dynamicContactGroupsService.updateDynamicGroup(
			id,
			item,
		);
		return applyTransform(response.data, [
			snakeToCamel(),
			(item: Record<string, unknown>) => ({
				...item,
				type: ContactsGroupType.Dynamic,
			}),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const DynamicGroupsAPI = {
	add: addDynamicContactGroup,
	update: updateDynamicContactGroup,
};
