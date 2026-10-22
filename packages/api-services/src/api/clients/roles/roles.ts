import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { roleSchema } from '@webitel/api-services/validations';
import { GetPermissionsQueryParams, getPermissions } from '../../../gen-wire';
import { ApplicationsAccess } from '../../../scripts';
import {
	getDefaultGetListResponse,
	getDefaultGetParams,
	getDefaultInstance,
} from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	sanitizeToWire,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type {
	AddItemParams,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	UpdateItemParams,
} from '../_shared/types';

const instance = getDefaultInstance();

const baseUrl = '/roles';

/** [Claude] the card schema's fields */
const fieldsToSend = getShallowFieldsToSendFromZodSchema(roleSchema);

/** [Claude] the role's app access goes over the wire minified: only the granted nodes, without their ui `_locale` */
const preRequestHandler = (item: ApiParams) => ({
	...item,
	metadata: {
		...item.metadata,
		access: ApplicationsAccess.minify(item.metadata?.access ?? {}),
	},
});

/** [Claude] the minified access is restored to the full tree of apps and sections */
const itemResponseHandler = (item: ApiParams) => ({
	...item,
	metadata: {
		...item.metadata,
		access: new ApplicationsAccess({
			access: item.metadata?.access,
		}).getAccess(),
	},
});

const getRoleList = async (params: ApiParams) => {
	const { page, size, q, sort, fields, ids } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params: ApiParams) => {
			const rawId = params.id ?? params.ids;
			return {
				...params,
				ids: rawId ? [].concat(rawId) : undefined,
				// the endpoint param is `q`; `search` is what the datalist store sends
				q: params.search,
			};
		},
		camelToSnake(),
	]);

	try {
		const response = await instance.get(baseUrl, {
			params: {
				page,
				size,
				q,
				sort,
				fields,
				ids,
			},
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

const getRole = async ({ itemId: id }: GetItemParams) => {
	const defaultObject = {
		name: '',
		description: '',
		permissions: [],
		metadata: {},
	};

	try {
		const response = await instance.get(`${baseUrl}/${id}`, {
			params: {
				fields: fieldsToSend,
			},
		});
		return applyTransform(response.data, [
			// snakeToCamel(), // prevent role "access" custom lookups from being converted to camelCase
			merge(defaultObject),
			itemResponseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addRole = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		// NOTE: prevent conversion of "access" custom lookups
		// camelToSnake(), https://webitel.atlassian.net/browse/WTEL-7599
	]);
	try {
		const response = await instance.post(baseUrl, item);
		return response.data;
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateRole = async ({ itemInstance, itemId: id }: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		// NOTE: prevent conversion of "access" custom lookups
		// camelToSnake(), https://webitel.atlassian.net/browse/WTEL-7599
	]);
	try {
		const response = await instance.put(`${baseUrl}/${id}`, item);
		return response.data;
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteRole = async ({ id }: DeleteItemParams) => {
	try {
		const response = await instance.delete(`${baseUrl}/${id}`);
		return response.data;
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getRolesLookup = (params: ApiParams) =>
	getRoleList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

/** The global actions a role can be granted. */
const getPermissionsOptions = async (params: ApiParams) => {
	const requestParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		(params: ApiParams) => ({
			...params,
			q: params.search,
		}),
		sanitizeToWire(
			getShallowFieldsToSendFromZodSchema(GetPermissionsQueryParams),
		),
		camelToSnake(),
	]);
	try {
		const response = await getPermissions().getPermissions(requestParams);
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

export const RolesAPI = {
	getList: getRoleList,
	get: getRole,
	add: addRole,
	update: updateRole,
	delete: deleteRole,
	getLookup: getRolesLookup,
	getPermissionsOptions,
};
