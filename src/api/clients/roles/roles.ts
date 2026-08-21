import deepCopy from 'deep-copy';
import { RolesApiFactory } from 'webitel-sdk';
import { ApplicationsAccess } from '../../../modules/Userinfo';
import {
	getDefaultGetListResponse,
	getDefaultGetParams,
	getDefaultInstance,
	getDefaultOpenAPIConfig,
} from '../../defaults';
import applyTransform, {
	camelToSnake,
	generateUrl,
	merge,
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
	UpdateItemParams,
} from '../_shared/types';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const rolesApiFactory = RolesApiFactory(configuration, '', instance);

const fieldsToSend = [
	'name',
	'description',
	'permissions',
	'metadata',
];

const preRequestHandler = (item: ApiParams) => {
	const copy = deepCopy(item);
	copy.metadata.access = ApplicationsAccess.minify(copy.metadata.access);
	return copy;
};

const getRoleList = async (params: ApiParams) => {
	const fieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
	];

	const { page, size, q, sort, name, fields, id, userId, userName } =
		applyTransform(params, [
			merge(getDefaultGetParams()),
			starToSearch('search'),
			(params: ApiParams) => {
				const rawId = params.id ?? params.ids;
				return {
					...params,
					id: rawId ? [].concat(rawId) : undefined,
					q: params.search,
				};
			},
			sanitize(fieldsToSend),
			camelToSnake(),
		]);

	try {
		const response = await rolesApiFactory.searchRoles(
			id,
			name,
			userId,
			userName,
			q,
			fields,
			sort,
			page,
			size,
		);
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

const getRole = async ({ itemId: id }: GetItemParams<string>) => {
	const defaultObject = {
		name: '',
		description: '',
		permissions: [],
		metadata: {},
	};

	const itemResponseHandler = (response: ApiParams) => {
		const copy = deepCopy(response);
		copy.metadata.access = new ApplicationsAccess({
			access: copy.metadata.access,
		}).getAccess();
		return copy;
	};

	try {
		const response = await rolesApiFactory.readRole(id, fieldsToSend);
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
		const response = await rolesApiFactory.createRole(item);
		return applyTransform(response.data, [
			// snakeToCamel(), // prevent role "access" custom lookups from being converted to camelCase
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateRole = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams<string>) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		// NOTE: prevent conversion of "access" custom lookups
		// camelToSnake(), https://webitel.atlassian.net/browse/WTEL-7599
	]);

	try {
		const response = await rolesApiFactory.updateRole(id, item);
		return applyTransform(response.data, [
			// snakeToCamel(), // prevent role "access" custom lookups from being converted to camelCase
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteRole = async ({ id }: DeleteItemParams<string>) => {
	try {
		const response = await rolesApiFactory.deleteRole(id);
		return applyTransform(response.data, []);
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

const PERMISSIONS_LIST_URL = '/permissions';

const getPermissionsOptions = async (params: ApiParams) => {
	const fieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
	];

	const url = applyTransform(params, [
		merge(getDefaultGetParams()),
		(params: ApiParams) => ({
			...params,
			q: params.search,
		}),
		sanitize(fieldsToSend),
		camelToSnake(),
		generateUrl(PERMISSIONS_LIST_URL),
	]);
	try {
		const response = await instance.get(url);
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

const RolesAPI = {
	getList: getRoleList,
	get: getRole,
	add: addRole,
	update: updateRole,
	delete: deleteRole,
	getLookup: getRolesLookup,

	getPermissionsOptions,
};

export default RolesAPI;
