import deepCopy from 'deep-copy';
import {
	getDefaultGetListResponse,
	getDefaultGetParams,
	getDefaultInstance,
} from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	generateUrl,
	merge,
	mergeEach,
	notify,
	sanitize,
	snakeToCamel,
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

const instance = getDefaultInstance();

const baseUrl = '/users';
const fieldsToSend = [
	'name',
	'username',
	'password',
	'extension',
	'status',
	'note',
	'roles',
	'license',
	'devices',
	'device',
	'profile',
	'email',
	'contact',
	'chatName',
];

const getUsersList = async (params: ApiParams) => {
	const fieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
		'not_user_id',
	];

	const defaultObject = {
		name: '',
		status: '',
		state: true,
		dnd: false,
	};

	const url = applyTransform(params, [
		merge(getDefaultGetParams()),
		(params) => ({
			...params,
			q: params.search,
		}),
		sanitize(fieldsToSend),
		camelToSnake(),
		generateUrl(baseUrl),
	]);
	try {
		const response = await instance.get(url);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel([
				'profile',
			]),
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

const getUser = async ({ itemId: id }: GetItemParams) => {
	const defaultObject = {
		roles: [],
		license: [],
		devices: [],
		device: {},
		variables: [
			{
				key: '',
				value: '',
			},
		],
	};

	const itemResponseHandler = (item: ApiParams) => {
		const copy = deepCopy(item);
		if (copy.license) {
			copy.license.forEach((item: ApiParams) => {
				item.name = item.prod;
			});
		}
		if (copy.profile) {
			copy.variables = Object.keys(copy.profile).map((key) => ({
				key,
				value: copy.profile[key],
			}));
		} else {
			copy.variables = [
				{
					key: '',
					value: '',
				},
			];
		}
		return copy;
	};

	const url = `${baseUrl}/${id}`;

	try {
		const response = await instance.get(url);
		return applyTransform(response.data, [
			snakeToCamel([
				'profile',
			]),
			merge(defaultObject),
			itemResponseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const preRequestHandler = (item: ApiParams) => {
	const copy = deepCopy(item);
	if (item.device && !item.device.id) copy.device = undefined;

	if (copy.roles)
		copy.roles.forEach((copy: ApiParams) => {
			copy.text = undefined;
		});

	if (copy.devices)
		copy.devices.forEach((copy: ApiParams) => {
			copy.text = undefined;
		});
	if (copy.license) {
		copy.license = copy.license.map((copy: ApiParams) => ({
			id: copy.id,
		}));
	}
	copy.profile = {};
	if (copy.variables) {
		copy.variables.forEach((variable: ApiParams) => {
			copy.profile[variable.key] = variable.value;
		});
	}
	return copy;
};

const addUser = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake([
			'profile',
		]),
	]);
	try {
		const response = await instance.post(baseUrl, item);
		return applyTransform(response.data, [
			snakeToCamel([
				'profile',
			]),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateUser = async ({ itemInstance, itemId: id }: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake([
			'profile',
		]),
	]);

	const url = `${baseUrl}/${id}`;
	try {
		const response = await instance.put(url, item);
		return applyTransform(response.data, [
			snakeToCamel([
				'profile',
			]),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchUser = async ({ changes, id }: PatchItemParams) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake([
			'profile',
		]),
	]);
	const url = `${baseUrl}/${id}`;
	try {
		const response = await instance.patch(url, body);
		return applyTransform(response.data, [
			snakeToCamel([
				'profile',
			]),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchUserPresence = async ({ changes, id }: PatchItemParams) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake([
			'profile',
		]),
	]);
	const url = `${baseUrl}/${id}/presence`;
	try {
		const response = await instance.patch(url, body);
		return applyTransform(response.data, [
			snakeToCamel([
				'profile',
			]),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteUser = async ({ id }: DeleteItemParams) => {
	const url = `${baseUrl}/${id}?permanent=true`;
	// permanent=true for complete deletion
	try {
		const response = await instance.delete(url);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getUsersLookup = (params: Parameters<typeof getUsersList>[0]) =>
	getUsersList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

const logoutUser = async ({ id }: DeleteItemParams) => {
	const url = `${baseUrl}/${id}/logout`;
	try {
		const response = await instance.post(url, {});
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const logoutMultipleUsers = async (selection: ApiParams[]) => {
	const url = `${baseUrl}/logout`;
	try {
		const response = await instance.post(url, {
			selection,
		});
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const UsersAPI = {
	getList: getUsersList,
	get: getUser,
	add: addUser,
	patch: patchUser,
	update: updateUser,
	delete: deleteUser,
	getLookup: getUsersLookup,
	patchUserPresence,
	logoutUser,
	logoutMultipleUsers,

	...generatePermissionsApi(baseUrl),
};
