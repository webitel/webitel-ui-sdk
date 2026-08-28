import deepCopy from 'deep-copy';
import { getContacts } from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
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
} from '../_shared/types';
import { ContactsSearchMode } from './enums/ContactsSearchMode';

const baseUrl = '/contacts';

const formatAccessMode = (item: ApiParams) => ({
	...item,
	access: {
		edit: item.mode.includes('w'),
		delete: item.mode.includes('d'),
	},
});

const getList = async (params: ApiParams) => {
	const fieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
		'qin',
		'notIdGroup',
		'group',
		'owner',
		'label',
		'user',
	];

	if (!params.fields) {
		params.fields = [
			'id',
			'etag',
			'name',
			'managers',
			'labels',
			'about',
			'variables',
			'timezones',
			'phones',
			'emails',
			'imclients',
		];
	}

	const listResponseHandler = (items: ApiParams[]) =>
		items?.map((item) => ({
			...item,
			name: item.name.commonName,
			managers: item.managers
				? [
						...item.managers.data,
					]
				: [],
			labels: item.labels
				? [
						...item.labels.data,
					]
				: [],
			groups: getGroupsFromResponse(item),
			variables: item.variables
				? [
						...item.variables.data,
					]
				: [],
			timezones: item.timezones
				? [
						...item.timezones.data,
					]
				: [],
			phones: item.phones
				? [
						...item.phones.data,
					]
				: [],
			emails: item.emails
				? [
						...item.emails.data,
					]
				: [],
		}));

	let changedParams: Record<string, unknown> = {};

	if (params?.search) {
		changedParams = {
			...params,
			q: params.search,
		};
	} else if (params?.q && params?.qin) {
		changedParams = {
			...params,
		};
	} else {
		let searchValue = '';
		let searchKey = '';

		if (params[ContactsSearchMode.NAME]) {
			searchValue = params[ContactsSearchMode.NAME];
			searchKey = ContactsSearchMode.NAME;
		} else if (params[ContactsSearchMode.LABELS]) {
			searchValue = params[ContactsSearchMode.LABELS];
			searchKey = ContactsSearchMode.LABELS;
		} else if (params[ContactsSearchMode.ABOUT]) {
			searchValue = params[ContactsSearchMode.ABOUT];
			searchKey = ContactsSearchMode.ABOUT;
		} else if (params[ContactsSearchMode.VARIABLES]) {
			searchValue = params[ContactsSearchMode.VARIABLES];
			searchKey = ContactsSearchMode.VARIABLES;
		} else if (params[ContactsSearchMode.DESTINATION]) {
			searchValue = params[ContactsSearchMode.DESTINATION];
			searchKey = 'emails,phones,imclients{user{name}}';
		}

		// This code needed for adding starToSearch method to applyTransform while searchKey !== SearchMode.VARIABLES because '*' in variables search mode brokes backend logic.
		// if (searchKey !== ContactsSearchMode.VARIABLES) {
		//   transformations.push(starToSearch('q')); WTEL-4265
		// }

		changedParams = {
			...params,
			q: searchValue || '',
			qin: searchKey || '',
		};
	}

	if (params.hasUser != null) {
		changedParams.user = params.hasUser;
	}

	if (params.contactGroup) {
		changedParams.group = [
			...params.contactGroup.list,
		];
	}
	if (params.contactLabel) {
		changedParams.label = params.contactLabel.map(
			(item: ApiParams) => item.label,
		);
	}
	if (params.contactOwner) {
		changedParams.owner = params.contactOwner;
	}

	if (params.parentId) {
		changedParams.group = [
			params.parentId,
		];
	}

	const transformations = [
		sanitize(fieldsToSend),
		merge(getDefaultGetParams()),
		camelToSnake(),
	];

	const {
		page,
		size,
		q,
		sort,
		fields,
		id,
		qin,
		mode,
		group,
		not_id_group,
		owner,
		label,
		user,
	} = applyTransform(changedParams, transformations);

	try {
		const response = await getContacts().searchContacts({
			page,
			size,
			q,
			sort: sort || '+name',
			fields: [
				'mode',
				...fields,
			],
			id,
			qin,
			mode,
			not_id_group,
			group,
			owner,
			label,
			user,
		});

		const { items, next } = applyTransform(
			{
				...response.data,
				items: response.data.data || [],
			},
			[
				snakeToCamel([
					'custom',
				]),
				merge(getDefaultGetListResponse()),
			],
		);

		return {
			items: applyTransform(items, [
				(items: ApiParams[]) => items?.map((item) => formatAccessMode(item)),
				listResponseHandler,
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const get = async ({ itemId: id }: GetItemParams) => {
	const fields = [
		'name',
		'about',
		'labels',
		'groups',
		'etag',
		'mode',
		'managers',
		'timezones',
		'variables',
		'phones',
		'emails',
		'imclients',
		'user',
		'custom',
	];

	const defaultObject = {};
	const itemResponseHandler = (item: ApiParams) => {
		return {
			...item,
			name: item.name.commonName,
			labels: item.labels
				? [
						...item.labels.data,
					]
				: [],
			groups: getGroupsFromResponse(item),
			managers: item.managers
				? [
						...item.managers.data,
					]
				: [],
			timezones: item.timezones
				? [
						...item.timezones.data,
					]
				: [],
			variables: item.variables
				? [
						...item.variables.data,
					]
				: [],
			phones: item.phones
				? [
						...item.phones.data,
					]
				: [],
			emails: item.emails
				? [
						...item.emails.data,
					]
				: [],
		};
	};
	try {
		const response = await getContacts().locateContact(String(id), {
			fields,
		});
		return applyTransform(response.data, [
			snakeToCamel([
				'custom',
			]),
			merge(defaultObject),
			itemResponseHandler,
			formatAccessMode,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const fieldsToSend = [
	'name',
	'labels',
	'about',
	'managers',
	'timezones',
	'groups',
	'custom',
	'emails',
	'phones',
];

const sanitizeManagers = (itemInstance: ApiParams) => {
	// handle many managers and even no managers field cases
	const managers = (itemInstance.managers || []).filter(
		({
			user,
		}: {
			user?: {
				id?: unknown;
			};
		} = {}) => user?.id,
	);
	return {
		...itemInstance,
		managers,
	};
};

const sanitizeTimezones = (itemInstance: ApiParams) => {
	// handle many timezones and even no timezones field cases
	const timezones = (itemInstance.timezones || []).filter(
		({
			timezone,
		}: {
			timezone?: {
				id?: unknown;
			};
		} = {}) => timezone?.id,
	);
	return {
		...itemInstance,
		timezones,
	};
};

const sanitizeGroups = (itemInstance: ApiParams) => {
	// handle many groups and even no groups field cases
	const groups = (itemInstance.groups || []).map((item: ApiParams) => ({
		group: item,
	}));
	return {
		...itemInstance,
		groups,
	};
};

const preRequestHandler = (item: ApiParams) => {
	const copy = deepCopy(item);
	copy.name = {
		commonName: copy.name,
	};
	return copy;
};

const getGroupsFromResponse = (item: ApiParams) => {
	return item.groups
		? [
				...item.groups.data.map((el: ApiParams) => el.group),
			]
		: [];
};

const add = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitizeManagers,
		sanitizeTimezones,
		sanitizeGroups,
		sanitize(fieldsToSend),
		camelToSnake([
			'custom',
		]),
	]);
	try {
		const response = await getContacts().createContact(item);
		return applyTransform(response.data, [
			snakeToCamel([
				'custom',
			]),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const update = async ({ itemInstance }: AddItemParams) => {
	const { etag } = itemInstance;
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitizeManagers,
		sanitizeTimezones,
		sanitizeGroups,
		sanitize(fieldsToSend),
		camelToSnake([
			'custom',
		]),
	]);
	try {
		const response = await getContacts().updateContact(etag, item);
		return applyTransform(response.data, [
			snakeToCamel([
				'custom',
			]),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteContact = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getContacts().deleteContact(String(id));
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getContactsLookup = (params: Parameters<typeof getList>[0]) =>
	getList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const ContactsAPI = {
	getList,
	get,
	add,
	update,
	delete: deleteContact,
	getLookup: getContactsLookup,

	...generatePermissionsApi(baseUrl),
};
