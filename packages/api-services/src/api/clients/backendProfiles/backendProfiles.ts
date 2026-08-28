import { getBackendProfileService } from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	mergeEach,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type {
	AddItemParams,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	PatchItemParams,
	UpdateItemParams,
} from '../_shared/types';

/**
 * File storage backends ("storage profiles" in the admin UI).
 *
 * `type` and `properties.region` are returned as the raw backend strings.
 * Mapping them onto UI enums and region option objects is the caller's job —
 * those lookups are app-side.
 */
const fieldsToSend = [
	'name',
	'maxSize',
	'priority',
	'properties',
	'expireDays',
	'type',
	'disabled',
];

const getBackendProfilesList = async (params: ApiParams) => {
	const defaultObject = {
		disabled: false,
		maxSize: 0,
		expireDays: 0,
		priority: 0,
	};

	const { page, size, search, sort, fields, id } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response = await getBackendProfileService().searchBackendProfile({
			page,
			size,
			// the generated param is `q`; `search` is what the datalist store sends
			q: search,
			sort,
			fields,
			id,
		});
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				mergeEach(defaultObject),
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getBackendProfile = async ({ itemId: id }: GetItemParams) => {
	const defaultObject = {
		maxSize: 0,
		expireDays: 0,
		priority: 0,
	};

	try {
		const response = await getBackendProfileService().readBackendProfile(
			String(id),
		);
		return applyTransform(response.data, [
			snakeToCamel(),
			merge(defaultObject),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addBackendProfile = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response =
			await getBackendProfileService().createBackendProfile(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateBackendProfile = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getBackendProfileService().updateBackendProfile(
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

const patchBackendProfile = async ({ changes, id }: PatchItemParams) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getBackendProfileService().patchBackendProfile(
			String(id),
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

const deleteBackendProfile = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getBackendProfileService().deleteBackendProfile(
			String(id),
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getBackendProfilesLookup = (
	params: Parameters<typeof getBackendProfilesList>[0],
) =>
	getBackendProfilesList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const BackendProfilesAPI = {
	getList: getBackendProfilesList,
	get: getBackendProfile,
	add: addBackendProfile,
	patch: patchBackendProfile,
	update: updateBackendProfile,
	delete: deleteBackendProfile,
	getLookup: getBackendProfilesLookup,
};
