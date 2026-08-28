import { get } from 'lodash-es';
import { getDictionaries } from '../../../../gen-wire';
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
import type { ApiId, ApiParams } from '../../_shared/types';

const instance = getDefaultInstance();

const getAdjunctTypeRecordsList = async ({
	parentId,
	...params
}: {
	parentId: string;
} & ApiParams) => {
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
		const response = await getDictionaries().searchData(parentId, {
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

const getAdjunctTypeRecord = async ({
	itemId: id,
	parentId,
}: {
	itemId: ApiId;
	parentId: string;
}) => {
	try {
		const response = await getDictionaries().locateData(parentId, String(id));
		return response.data;
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addAdjunctTypeRecord = async ({
	itemInstance,
	fieldsToSend,
	parentId,
}: {
	itemInstance: ApiParams;
	fieldsToSend: string[];
	parentId: string;
}) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);
	try {
		const response = await getDictionaries().createData(parentId, item);
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
	parentId,
}: {
	itemInstance: ApiParams;
	fieldsToSend: string[];
	itemId: ApiId;
	parentId: string;
}) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);
	try {
		const response = await getDictionaries().updateData(
			parentId,
			String(id),
			item,
		);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteAdjunctTypeRecord = async ({
	parentId,
	id,
}: {
	parentId: string;
	id: ApiId | ApiId[];
}) => {
	const ids = (
		Array.isArray(id)
			? id
			: [
					id,
				]
	).map(String);
	try {
		await getDictionaries().deleteData2(parentId, ids);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const transformItemsForSelect =
	({ primary, display }: { primary: string; display: string }) =>
	(items: ApiParams[]) => {
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
}: {
	path: string;
	display: string;
	primary: string;
} & ApiParams) => {
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

const batchCreateAdjunctTypeRecords = async ({
	repo,
	rows,
}: {
	repo: string;
	rows: ApiParams[];
}) => {
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
