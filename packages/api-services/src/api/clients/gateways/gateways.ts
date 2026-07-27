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
import registerGateway from './defaults/registerGateway';
import trunkingGateway from './defaults/trunkingGateway';

const instance = getDefaultInstance();

const baseUrl = '/sip/gateways';

const getGatewayList = async (params: ApiParams) => {
	const fieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
		'name',
	];

	const defaultObject = {
		name: '',
		proxy: '',
		enable: false,
	};

	const url = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		starToSearch('name'),
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

const getGateway = async ({ itemId: id }: GetItemParams) => {
	const coerceTrunkingResponse = (response: ApiParams) => {
		const defaultIPacl = {
			ip: '',
			proto: 'any',
			port: null,
		};

		const result = {
			...trunkingGateway(),
			...response,
		};
		result.ipacl = result.ipacl.map((acl) => ({
			...defaultIPacl,
			...acl,
		}));
		return result;
	};

	const coerceRegisterResponse = (response: ApiParams) => {
		const result = {
			...registerGateway(),
			...response,
		};
		return result;
	};

	const itemResponseHandler = (response: ApiParams) => {
		if (response.register) return coerceRegisterResponse(response);
		return coerceTrunkingResponse(response);
	};

	const url = `${baseUrl}/${id}`;

	try {
		const response = await instance.get(url);
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

const fieldsToSend = [
	'name',
	'proxy',
	'id',
	'host',
	'ipacl',
	'account',
	'username',
	'expires',
	'account',
	'registrar',
	'name',
	'register',
	'password',
	'schema',
	'usage',
	'enable',
];

const addGateway = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await instance.post(baseUrl, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};
const updateGateway = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	const url = `${baseUrl}/${id}`;
	try {
		const response = await instance.put(url, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchGateway = async ({ changes, id }: PatchItemParams) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	const url = `${baseUrl}/${id}`;
	try {
		const response = await instance.patch(url, body);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteGateway = async ({ id }: DeleteItemParams) => {
	const url = `${baseUrl}/${id}`;
	try {
		const response = await instance.delete(url);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getGatewaysLookup = (params: Parameters<typeof getGatewayList>[0]) =>
	getGatewayList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const GatewaysAPI = {
	getList: getGatewayList,
	get: getGateway,
	add: addGateway,
	patch: patchGateway,
	update: updateGateway,
	delete: deleteGateway,
	getLookup: getGatewaysLookup,
};
