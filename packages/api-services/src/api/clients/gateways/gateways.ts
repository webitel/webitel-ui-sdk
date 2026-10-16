import { GatewayIpAclProtocol } from '../../../enums/GatewayIpAclProtocol/GatewayIpAclProtocol';
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
	translateError,
} from '../../transformers';
import type {
	AddItemParams,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	PatchItemParams,
	UpdateItemParams,
} from '../_shared/types';

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
	/** [Claude] one set for both types: on save each type sends only its own fields */
	const defaultObject = {
		name: '',
		usage: '',
		proxy: '',
		schema: {},
		enable: true,
		account: '',
		username: '',
		password: '',
		expires: 600,
		host: '',
		ipacl: [],
	};

	const defaultIpAcl = {
		ip: '',
		proto: GatewayIpAclProtocol.Any,
		port: null,
	};

	const url = `${baseUrl}/${id}`;

	try {
		const response = await instance.get(url);
		const item = applyTransform(response.data, [
			snakeToCamel(),
			merge(defaultObject),
		]);
		return {
			...item,
			ipacl: applyTransform(item.ipacl, [
				mergeEach(defaultIpAcl),
			]),
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const commonFieldsToSend = [
	'name',
	'proxy',
	'register',
	'schema',
	'usage',
	'enable',
];

const registerFieldsToSend = [
	...commonFieldsToSend,
	'account',
	'username',
	'expires',
	'registrar',
	'password',
];

const trunkingFieldsToSend = [
	...commonFieldsToSend,
	'host',
	'ipacl',
];

/** [Claude] each gateway type sends only its own fields */
const toRequestItem = (item: ApiParams) =>
	applyTransform(item, [
		sanitize(item.register ? registerFieldsToSend : trunkingFieldsToSend),
		camelToSnake(),
	]);

const addGateway = async ({ itemInstance }: AddItemParams) => {
	try {
		const response = await instance.post(baseUrl, toRequestItem(itemInstance));
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			translateError,
			notify,
		]);
	}
};
const updateGateway = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const url = `${baseUrl}/${id}`;
	try {
		const response = await instance.put(url, toRequestItem(itemInstance));
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			translateError,
			notify,
		]);
	}
};

/** [Claude] a patch carries only the changed fields, so the type is unknown here */
const patchGateway = async ({ changes, id }: PatchItemParams) => {
	const body = applyTransform(changes, [
		sanitize([
			...new Set([
				...registerFieldsToSend,
				...trunkingFieldsToSend,
			]),
		]),
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
			translateError,
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
