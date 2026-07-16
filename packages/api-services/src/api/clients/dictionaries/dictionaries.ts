import { getDictionaries } from '@webitel/api-services/gen';
import { get } from 'lodash-es';

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
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../transformers';

const instance = getDefaultInstance();

const typeFieldsToSend = [
	'name',
	'about',
	'dictionary',
	'fields',
	'repo',
	'administered',
	'primary',
	'display',
];

const typeItemResponseHandler = (item) => ({
	...item,
	id: item.repo,
});

const getCustomLookupRecords = async ({ repo, ...params }) => {
	const fieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
	];

	const { page, size, fields, sort, id, q } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params) => ({
			...params,
			q: params.search,
		}),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getDictionaries().searchData(repo, {
			size,
			page,
			sort,
			fields,
			q,
			id,
		});
		const { data, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(data, []),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getCustomLookupRecord = async ({ itemId: id, repo }) => {
	try {
		const response = await getDictionaries().locateData(repo, id);
		return response.data;
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addCustomLookupRecord = async ({ itemInstance, fieldsToSend, repo }) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);
	try {
		const response = await getDictionaries().createData(repo, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateCustomLookupRecord = async ({
	itemInstance,
	fieldsToSend,
	itemId: id,
	repo,
}) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);
	try {
		const response = await getDictionaries().updateData(repo, id, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteCustomLookupRecord = async ({ repo, id }) => {
	const ids = Array.isArray(id)
		? id
		: [
				id,
			];
	try {
		const response = await getDictionaries().deleteData2(repo, ids);
		return response.data;
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const transformItemsForSelect =
	({ primary, display }) =>
	(items) => {
		return items.map((item) => ({
			id: item[primary],
			name: get(item, display.split('.')),
		}));
	};

const getCustomLookupRecordsLookup = async ({
	path,
	display,
	primary,
	...params
}) => {
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
		starToSearch('search'),
		(params) => ({
			...params,
			q: params.search,
		}),
		sanitize(fieldsToSend),
		camelToSnake(),
		generateUrl(path),
	]);
	try {
		const response = await instance.get(url);
		const { data, items, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()),
		]);

		return {
			items:
				applyTransform(data || items, [
					transformItemsForSelect({
						display,
						primary,
					}),
				]) ?? [],
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const batchCreateCustomLookupRecords = async ({ repo, rows }) => {
	const preparedRows = (rows || []).map((row) =>
		applyTransform(row, [
			camelToSnake(),
		]),
	);
	try {
		const response = await getDictionaries().batchCreateData(repo, {
			rows: preparedRows,
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

const getCustomLookupsList = async (params) => {
	const fieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
	];

	const { page, size, fields, sort, id, q } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params) => ({
			...params,
			q: params.search,
		}),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getDictionaries().searchType({
			q,
			id,
			size,
			page,
			sort,
			fields,
		});
		const { data, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()),
		]);

		const itemResponseHandler = (items) =>
			(items || []).map((item) => ({
				...item,
				id: item.repo,
			}));

		return {
			items: applyTransform(data, [
				snakeToCamel(),
				itemResponseHandler,
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getCustomLookupType = async ({ itemId: itemRepo }) => {
	try {
		const response = await getDictionaries().locateType(itemRepo);
		return applyTransform(response.data, [
			snakeToCamel(),
			typeItemResponseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addCustomLookupType = async ({ itemInstance }) => {
	const repo = itemInstance.repo;
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(typeFieldsToSend),
	]);
	try {
		const response = await getDictionaries().createType(repo, item);
		return applyTransform(response.data, [
			snakeToCamel(),
			typeItemResponseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateCustomLookupType = async ({ itemInstance, itemId: id }) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(typeFieldsToSend),
	]);
	try {
		const response = await getDictionaries().updateType(id, item);
		return applyTransform(response.data, [
			snakeToCamel(),
			typeItemResponseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteCustomLookupType = async ({ id }) => {
	const repo = Array.isArray(id)
		? id
		: [
				id,
			];
	try {
		const response = await getDictionaries().deleteType({
			repo,
		});
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getCustomLookupTypeLookup = async (params) =>
	getCustomLookupsList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const DictionariesAPI = {
	getList: getCustomLookupRecords,
	get: getCustomLookupRecord,
	add: addCustomLookupRecord,
	update: updateCustomLookupRecord,
	delete: deleteCustomLookupRecord,
	getLookup: getCustomLookupRecordsLookup,
	batchCreate: batchCreateCustomLookupRecords,

	getTypesList: getCustomLookupsList,
	getType: getCustomLookupType,
	addType: addCustomLookupType,
	updateType: updateCustomLookupType,
	deleteType: deleteCustomLookupType,
	getTypeLookup: getCustomLookupTypeLookup,
};
