import {
	CreateOAuthServiceBody,
	DeleteOAuthService2Body,
	DeleteOAuthServiceBody,
	getOauth2Federation,
	SearchOAuthServiceQueryParams,
	UpdateOAuthService2Body,
	UpdateOAuthServiceBody,
} from '@webitel/api-services/gen';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { generatePermissionsApi } from '../_shared/generatePermissionsApi';

import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../transformers';

const oauthAppFieldsToSend = getShallowFieldsToSendFromZodSchema(
	CreateOAuthServiceBody,
);
const baseUrl = '/oauth';

const getOAuthAppsList = async (params: Record<string, unknown>) => {
	const listFieldsToSend = getShallowFieldsToSendFromZodSchema(
		SearchOAuthServiceQueryParams,
	);
	const { page, size, fields, sort, id, q, name, access, enabled } =
		applyTransform(params, [
			merge(getDefaultGetParams()),
			sanitize(listFieldsToSend),
			camelToSnake(),
			starToSearch('q'),
		]);

	try {
		const response = await getOauth2Federation().searchOAuthService({
			page,
			size,
			fields: [
				...fields,
				'id',
			],
			sort,
			id,
			q: q || params.search,
			name,
			access,
			enabled,
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

const getOAuthApp = async ({ itemId: id }: { itemId: string }) => {
	try {
		const response = await getOauth2Federation().locateOAuthService([
			id,
		]);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addOAuthApp = async ({
	itemInstance,
}: {
	itemInstance: Record<string, unknown>;
}) => {
	const item = applyTransform(itemInstance, [
		sanitize(oauthAppFieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getOauth2Federation().createOAuthService(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateOAuthApp = async ({
	itemInstance,
	itemId: id,
}: {
	itemInstance: Record<string, unknown>;
	itemId: string;
}) => {
	const putFieldsToSend = getShallowFieldsToSendFromZodSchema(
		UpdateOAuthServiceBody.shape.changes.unwrap(),
	);

	const changes = applyTransform(itemInstance, [
		sanitize(putFieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getOauth2Federation().updateOAuthService(id, {
			changes,
		});
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchOAuthApp = async ({
	changes,
	id,
}: {
	changes: Record<string, unknown>;
	id: string;
}) => {
	const patchFieldsToSend = getShallowFieldsToSendFromZodSchema(
		UpdateOAuthService2Body.shape.changes.unwrap(),
	);

	const changesBody = applyTransform(changes, [
		sanitize(patchFieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getOauth2Federation().updateOAuthService2(
			id,
			changesBody,
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

const deleteOAuthApp = async ({ id }: { id: string }) => {
	const body = applyTransform({}, [
		sanitize(getShallowFieldsToSendFromZodSchema(DeleteOAuthService2Body)),
		camelToSnake(),
	]);

	try {
		const response = await getOauth2Federation().deleteOAuthService2(
			[
				id,
			],
			body,
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteOAuthApps = async ({
	id,
	permanent,
}: {
	id: string[];
	permanent?: boolean;
}) => {
	const body = applyTransform(
		{
			id,
			permanent,
		},
		[
			sanitize(getShallowFieldsToSendFromZodSchema(DeleteOAuthServiceBody)),
			camelToSnake(),
		],
	);

	try {
		const response = await getOauth2Federation().deleteOAuthService(body);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getLookup = (params: Record<string, unknown>) =>
	getOAuthAppsList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const OAuthAppsAPI = {
	getList: getOAuthAppsList,
	get: getOAuthApp,
	add: addOAuthApp,
	update: updateOAuthApp,
	patch: patchOAuthApp,
	delete: deleteOAuthApp,
	deleteMany: deleteOAuthApps,
	getLookup,

	...generatePermissionsApi(baseUrl),
};
