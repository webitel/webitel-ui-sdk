import { getCognitiveProfileService } from '../../../gen-wire';
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
import { generatePermissionsApi } from '../_shared/generatePermissionsApi';
import type {
	AddItemParams,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	PatchItemParams,
	UpdateItemParams,
} from '../_shared/types';

const baseUrl = '/storage/cognitive_profiles';

/**
 * `service` and `properties.region` are returned as the raw backend values.
 * Mapping them onto the localized service lookup and the Microsoft region
 * option object is the caller's job — those lookups are app-side.
 */
const fieldsToSend = [
	'name',
	'default',
	'enabled',
	'provider',
	'service',
	'description',
	'properties',
];

/** The form binds `service` and `properties.region` as option objects. */
const preRequestHandler = (item: ApiParams) => {
	const result = {
		...item,
		service: item.service?.value ?? item.service,
		properties: {
			...item.properties,
		},
	};
	if (result.properties.region) {
		result.properties.region =
			item.properties.region?.id ?? item.properties.region;
	}
	return result;
};

const getCognitiveProfilesList = async (params: ApiParams) => {
	const defaultObject = {
		default: false,
		enabled: false,
	};

	const { page, size, search, sort, fields, id, service, enabled } =
		applyTransform(params, [
			merge(getDefaultGetParams()),
			starToSearch('search'),
		]);

	try {
		const response = await getCognitiveProfileService().searchCognitiveProfile({
			page,
			size,
			// the generated param is `q`; `search` is what the datalist store sends
			q: search,
			sort,
			fields,
			id,
			service,
			enabled,
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

const getCognitiveProfile = async ({ itemId: id }: GetItemParams) => {
	const defaultObject = {
		properties: {},
	};

	try {
		const response = await getCognitiveProfileService().readCognitiveProfile(
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

const addCognitiveProfile = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response =
			await getCognitiveProfileService().createCognitiveProfile(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchCognitiveProfile = async ({ changes, id }: PatchItemParams) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getCognitiveProfileService().patchCognitiveProfile(
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

const updateCognitiveProfile = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getCognitiveProfileService().updateCognitiveProfile(
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

const deleteCognitiveProfile = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getCognitiveProfileService().deleteCognitiveProfile(
			String(id),
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getCognitiveProfilesLookup = (
	params: Parameters<typeof getCognitiveProfilesList>[0],
) =>
	getCognitiveProfilesList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const CognitiveProfilesAPI = {
	getList: getCognitiveProfilesList,
	get: getCognitiveProfile,
	add: addCognitiveProfile,
	patch: patchCognitiveProfile,
	update: updateCognitiveProfile,
	delete: deleteCognitiveProfile,
	getLookup: getCognitiveProfilesLookup,

	...generatePermissionsApi(baseUrl),
};
