import { getDictionaries } from '@webitel/api-services/gen';
import { get } from 'lodash-es';

import {
	getDefaultGetListResponse,
	getDefaultGetParams,
	getDefaultInstance,
} from '../../../defaults';
import {
	applyTransform,
	camelToSnake,
	generateUrl,
	merge,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../../transformers';

const instance = getDefaultInstance();

const getAdjunctTypeRecordsList = async ({ repo, ...params }) => {
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

const getAdjunctTypeRecord = async ({ itemId: id, repo }) => {
	try {
		const response = await getDictionaries().locateData(repo, id);
		return response.data;
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addAdjunctTypeRecord = async ({ itemInstance, fieldsToSend, repo }) => {
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

const updateAdjunctTypeRecord = async ({
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

const deleteAdjunctTypeRecord = async ({ repo, id }) => {
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

// options for Select/Multiselect fields; path is dynamic
// (users, contacts, dictionaries/{repo}, ...), so there is no single gen method
const getAdjunctTypeRecordsLookup = async ({
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

const batchCreateAdjunctTypeRecords = async ({ repo, rows }) => {
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

export const AdjunctTypeRecordsAPI = {
	getList: getAdjunctTypeRecordsList,
	get: getAdjunctTypeRecord,
	add: addAdjunctTypeRecord,
	update: updateAdjunctTypeRecord,
	delete: deleteAdjunctTypeRecord,
	getLookup: getAdjunctTypeRecordsLookup,
	batchCreate: batchCreateAdjunctTypeRecords,
};
