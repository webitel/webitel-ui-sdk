import {
	getSkillPresets,
	SearchPresetQueryQueryParams,
	UpdatePresetQueryBody,
} from '../../../gen';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import { ApiId } from '../_shared/types';

const getActivityTypesList = async (params: Record<string, unknown>) => {
	const listFieldsToSend = getShallowFieldsToSendFromZodSchema(
		SearchPresetQueryQueryParams,
	);

	const { page, size, sort, id, q } = applyTransform(params, [
		merge(getDefaultGetParams()),
		sanitize(listFieldsToSend),
		camelToSnake(),
		starToSearch('q'),
	]);

	try {
		const response = await getSkillPresets().searchSkillPreset({
			page,
			size,
			sort,
			id,
			q,
		});
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

const getActivityType = async ({ itemId: id }: { itemId: ApiId }) => {
	try {
		const response = await getSkillPresets().getSkillPreset(id);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addActivityType = async ({
	itemInstance,
}: {
	itemInstance: Record<string, unknown>;
}) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
	]);
	try {
		const response = await getSkillPresets().createSkillPreset(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateActivityType = async ({
	itemInstance,
	itemId: id,
}: {
	itemInstance: Record<string, unknown>;
	itemId: ApiId;
}) => {
	const changes = applyTransform(itemInstance, [
		sanitize(getShallowFieldsToSendFromZodSchema(UpdatePresetQueryBody)),
		camelToSnake(),
	]);

	try {
		const response = await getSkillPresets().updateSkillPreset(id, changes);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchActivityType = async ({
	changes,
	id,
}: {
	changes: Record<string, unknown>;
	id: ApiId;
}) => {
	const changesBody = applyTransform(changes, [
		sanitize(getShallowFieldsToSendFromZodSchema(UpdatePresetQueryBody)),
		camelToSnake(),
	]);

	try {
		const response = await getSkillPresets().patchSkillPreset(id, changesBody);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteActivityType = async ({ id }: { id: ApiId }) => {
	try {
		const response = await getSkillPresets().deleteSkillPreset(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const ActivityTypesAPI = {
	getList: getActivityTypesList,
	get: getActivityType,
	add: addActivityType,
	update: updateActivityType,
	patch: patchActivityType,
	delete: deleteActivityType,
};
