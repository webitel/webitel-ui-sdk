import deepCopy from 'deep-copy';

import {
	getDefaultGetListResponse,
	getDefaultGetParams,
	getDefaultInstance,
} from '../../defaults/index.js';
import applyTransform, {
	addQueryParamsToUrl,
	camelToSnake,
	generateUrl,
	merge,
	mergeEach,
	notify,
	sanitize,
	snakeToCamel,
} from '../../transformers/index.js';
import { generatePermissionsApi } from '../_shared/generatePermissionsApi.js';

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
	'forcePasswordChange',
];

const getUsersList = async (params) => {
	const fieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
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

const getUser = async ({ itemId: id }) => {
	const defaultObject = {
		roles: [],
		license: [],
		devices: [],
		device: {},
		generateDevice: false,
		variables: [
			{
				key: '',
				value: '',
			},
		],
	};

	const itemResponseHandler = (item) => {
		const copy = deepCopy(item);
		if (copy.license) {
			copy.license.forEach((item) => {
				item.name = item.name || item.prod;
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

const preRequestHandler = (item) => {
	const copy = deepCopy(item);
	if (item.device && !item.device.id) delete copy.device;

	if (copy.roles) {
		copy.roles.forEach((role) => {
			delete role.text;
		});
	}

	if (copy.devices) {
		copy.devices.forEach((device) => {
			delete device.text;
		});
	}
	if (copy.license) {
		copy.license = copy.license.map((copy) => ({
			id: copy.id,
		}));
	}
	copy.profile = {};
	if (copy.variables) {
		copy.variables.forEach((variable) => {
			copy.profile[variable.key] = variable.value;
		});
	}
	return copy;
};

const addUser = async ({ itemInstance }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake([
			'profile',
		]),
	]);
	// WTEL-9735 Підзадача 0: за прапорцем itemInstance.generateDevice додаємо
	// query ?generate_device=true. Прапорець не входить у fieldsToSend, тож у
	// тіло не потрапляє — лише в query. Без прапорця URL не змінюється.
	const url = applyTransform(baseUrl, [
		addQueryParamsToUrl(
			itemInstance.generateDevice
				? [
						'generate_device=true',
					]
				: [],
		),
	]);
	try {
		const response = await instance.post(url, item);
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

const updateUser = async ({ itemInstance, itemId: id }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake([
			'profile',
		]),
	]);

	// WTEL-9735 Підзадача 0: генерація пристрою і на edit (PUT) — той самий
	// прапорець itemInstance.generateDevice; query додається лише коли він true
	const url = applyTransform(`${baseUrl}/${id}`, [
		addQueryParamsToUrl(
			itemInstance.generateDevice
				? [
						'generate_device=true',
					]
				: [],
		),
	]);
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

const patchUser = async ({ changes, id }) => {
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

const patchUserPresence = async ({ changes, id }) => {
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

const deleteUser = async ({ id }) => {
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

const getUsersLookup = (params) =>
	getUsersList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

const logoutUser = async ({ id }) => {
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

const logoutMultipleUsers = async (selection) => {
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

const UsersAPI = {
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

export default UsersAPI;
