import { getDictionaries } from '../../../../gen-wire';
import {
	getDefaultGetListResponse,
	getDefaultGetParams,
} from '../../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../../transformers';
import type {
	AddItemParams,
	ApiId,
	ApiParams,
	UpdateItemParams,
} from '../../_shared/types';
import { assignFieldPositions } from '../_shared/utils/assignFieldPositions';
import { sortDynamicFields } from '../_shared/utils/sortDynamicFields';

const fieldsToSend = [
	'name',
	'about',
	'dictionary',
	'fields',
	'repo',
	'administered',
	'primary',
	'display',
];

// dictionary types are identified by repo, but stores expect id
const itemResponseHandler = (item: ApiParams) => ({
	...item,
	id: item.repo,
});

const getAdjunctTypesList = async (
	params: ApiParams,
	{
		silent = false,
	}: {
		silent?: boolean;
	} = {},
) => {
	const listFieldsToSend = [
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
		sanitize(listFieldsToSend),
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

		const itemsResponseHandler = (items: ApiParams[]) =>
			(items || []).map(itemResponseHandler);

		return {
			items: applyTransform(data, [
				snakeToCamel(),
				itemsResponseHandler,
			]),
			next,
		};
	} catch (err) {
		const errTransformers = silent
			? []
			: [
					notify,
				];
		throw applyTransform(err, errTransformers);
	}
};

const getAdjunctType = async ({ itemId: itemRepo }: { itemId: string }) => {
	try {
		const response = await getDictionaries().locateType(itemRepo);
		return applyTransform(response.data, [
			snakeToCamel(),
			itemResponseHandler,
			assignFieldPositions,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addAdjunctType = async ({ itemInstance }: AddItemParams) => {
	const repo = itemInstance.repo;
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		sanitize(fieldsToSend),
	]);
	try {
		const response = await getDictionaries().createType(repo, item);
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

const updateAdjunctType = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sortDynamicFields,
		camelToSnake(),
		sanitize(fieldsToSend),
	]);
	try {
		const response = await getDictionaries().updateType(String(id), item);
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

const deleteAdjunctType = async ({ id }: { id?: ApiId | ApiId[] }) => {
	const repo = (
		Array.isArray(id)
			? id
			: [
					id,
				]
	).map(String);
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

const getAdjunctTypesLookup = async (
	params: Parameters<typeof getAdjunctTypesList>[0],
) =>
	getAdjunctTypesList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const AdjunctTypesAPI = {
	getList: getAdjunctTypesList,
	get: getAdjunctType,
	add: addAdjunctType,
	update: updateAdjunctType,
	delete: deleteAdjunctType,
	getLookup: getAdjunctTypesLookup,
};

/**
 * @alias AdjunctTypesAPI
 */
export const CustomLookupAPI = AdjunctTypesAPI;
