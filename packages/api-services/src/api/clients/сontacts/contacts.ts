import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import {
	CreateContactBody,
	getContacts,
	SearchContactsQueryParams,
	UpdateContactBody,
} from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	merge,
	notify,
	sanitizeToWire,
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

const searchFieldsToSend = getShallowFieldsToSendFromZodSchema(
	SearchContactsQueryParams,
);

const getList = async (params: ApiParams) => {
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

	let changedParams: ApiParams;

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

		changedParams = {
			...params,
			q: searchValue || '',
			qin: searchKey || '',
		};

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
	}

	if (params.parentId) {
		changedParams.group = [
			params.parentId,
		];
	}

	// `notIdGroup`/`qin`/`group`/`owner`/`label`/`user` are the field names the
	// generated `SearchContactsParams` type declares for this endpoint — unlike
	// the old `ContactsApiFactory`-based client, no camelCase->snake_case
	// conversion is applied on the way out here.
	const searchParams = applyTransform(changedParams, [
		sanitizeToWire(searchFieldsToSend),
		merge(getDefaultGetParams()),
	]);

	try {
		const response = await getContacts().searchContacts({
			...searchParams,
			sort: searchParams.sort
				? [
						searchParams.sort,
					]
				: [
						'+name',
					],
			fields: [
				'mode',
				...(searchParams.fields || []),
			],
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
			items,
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

	try {
		const response = await getContacts().locateContact(String(id), {
			fields,
		});
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

// `custom` is tenant-defined and has no fixed shape, so it's not part of the
// generated body schemas — kept on the allowlist by hand alongside them.
const createFieldsToSend = [
	...getShallowFieldsToSendFromZodSchema(CreateContactBody),
	'custom',
];
const updateFieldsToSend = [
	...getShallowFieldsToSendFromZodSchema(UpdateContactBody),
	'custom',
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

const add = async ({ itemInstance }: AddItemParams) => {
	// `name`/`managers[].user`/`timezones[].timezone`/`groups[].group` are
	// expected already in the shape `ContactsInputContact` declares (e.g.
	// `name: { commonName }`, not a plain string) — callers build the draft
	// against the raw `Contact` type now, so no request-side wrapping happens
	// here anymore.
	const item = applyTransform(itemInstance, [
		sanitizeManagers,
		sanitizeTimezones,
		sanitizeGroups,
		sanitizeToWire(createFieldsToSend),
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
		sanitizeManagers,
		sanitizeTimezones,
		sanitizeGroups,
		sanitizeToWire(updateFieldsToSend),
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

const getContactsLookup = async (params: Parameters<typeof getList>[0]) => {
	// Every other entity's lookup returns a flat `{id, name: string}` shape,
	// and generic search/select components across the app rely on that
	// convention for their default option rendering — so `name` is flattened
	// here (unlike `getList`/`get`, which return the raw `Contact` shape with
	// `name: { commonName }`) to keep lookups a drop-in for those components.
	const { items, next } = await getList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});
	return {
		items: items.map((item: ApiParams) => ({
			...item,
			name: item.name?.commonName,
		})),
		next,
	};
};

export const ContactsAPI = {
	getList,
	get,
	add,
	update,
	delete: deleteContact,
	getLookup: getContactsLookup,

	...generatePermissionsApi(baseUrl),
};
