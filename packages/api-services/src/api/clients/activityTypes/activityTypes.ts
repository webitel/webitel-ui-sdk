import {
	getOnlineSkills,
	PatchOnlineSkillsBody,
	SearchOnlineSkillsQueryParams,
	UpdateOnlineSkillsBody,
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
import { getDefaultGetListResponse } from '../../defaults';
import { ApiId, ApiParams } from '../_shared/types';

const itemResponseHandler = (item: ApiParams) => {
	return item.item;
};

const getActivityTypesList = async (params: Record<string, unknown>) => {
	const listFieldsToSend = getShallowFieldsToSendFromZodSchema(
		SearchOnlineSkillsQueryParams,
	);

	const transformedParams = applyTransform(params, [
		sanitize(listFieldsToSend),
		(params) => ({
			...params,
			skipDefault: params.skipDefault || true,
			fields: [
				'id',
				...(params.fields || [
					'name',
				]),
			],
		}),
		camelToSnake(),
		starToSearch('q'),
	]);

	try {
		const response =
			await getOnlineSkills().searchOnlineSkills(transformedParams);
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
		const response = await getOnlineSkills().getOnlineSkills(String(id));
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

const addActivityType = async ({
	itemInstance,
}: {
	itemInstance: Record<string, unknown>;
}) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
	]);
	try {
		const response = await getOnlineSkills().createOnlineSkills(item);
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

const updateActivityType = async ({
	itemInstance,
	itemId: id,
}: {
	itemInstance: Record<string, unknown>;
	itemId: ApiId;
}) => {
	const changes = applyTransform(itemInstance, [
		sanitize(getShallowFieldsToSendFromZodSchema(UpdateOnlineSkillsBody)),
		camelToSnake(),
	]);

	try {
		const response = await getOnlineSkills().updateOnlineSkills(
			String(id),
			changes,
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

const patchActivityType = async ({
	changes,
	id,
}: {
	changes: Record<string, unknown>;
	id: ApiId;
}) => {
	const changesBody = applyTransform(changes, [
		sanitize(getShallowFieldsToSendFromZodSchema(PatchOnlineSkillsBody)),
		camelToSnake(),
	]);

	try {
		const response = await getOnlineSkills().patchOnlineSkills(
			String(id),
			changesBody,
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

const deleteActivityType = async ({ id }: { id: ApiId }) => {
	try {
		const response = await getOnlineSkills().deleteOnlineSkills(String(id));
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
