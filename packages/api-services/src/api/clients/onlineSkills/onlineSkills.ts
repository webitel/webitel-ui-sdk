import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import {
	getOnlineSkills,
	PatchOnlineSkillsBody,
	SearchOnlineSkillsQueryParams,
	UpdateOnlineSkillsBody,
} from '../../../gen';
import { getDefaultGetListResponse } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type { ApiId, ApiParams } from '../_shared/types';

const itemResponseHandler = (item: ApiParams) => {
	return item.item;
};

const getOnlineSkillsList = async (params: ApiParams) => {
	const listFieldsToSend = getShallowFieldsToSendFromZodSchema(
		SearchOnlineSkillsQueryParams,
	);

	const transformedParams = applyTransform(params, [
		sanitize(listFieldsToSend),
		(params) => ({
			...params,
			skipDefault: params.skipDefault ?? true,
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

const getOnlineSkill = async ({ itemId: id }: { itemId: ApiId }) => {
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

const addOnlineSkill = async ({
	itemInstance,
}: {
	itemInstance: ApiParams;
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

const updateOnlineSkill = async ({
	itemInstance,
	itemId: id,
}: {
	itemInstance: ApiParams;
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

const patchOnlineSkill = async ({
	changes,
	id,
}: {
	changes: ApiParams;
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

const deleteOnlineSkill = async ({ id }: { id: ApiId }) => {
	try {
		const response = await getOnlineSkills().deleteOnlineSkills(String(id));
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const OnlineSkillsAPI = {
	getList: getOnlineSkillsList,
	get: getOnlineSkill,
	add: addOnlineSkill,
	update: updateOnlineSkill,
	patch: patchOnlineSkill,
	delete: deleteOnlineSkill,
};
