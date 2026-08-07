import { getCases, UpdateCase2Body } from '@webitel/api-services/gen';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { snakeToKebab } from '@webitel/api-services/utils';
import { CasesApiFactory } from 'webitel-sdk';
import {
	getDefaultGetListResponse,
	getDefaultGetParams,
	getDefaultInstance,
	getDefaultOpenAPIConfig,
} from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
} from '../../transformers';
import { generatePermissionsApi } from '../_shared/generatePermissionsApi';
import { FTSServiceAPI } from './_internals/ftsService';
import { stringifyCaseFilters } from './_internals/stringifyCaseFilters';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const casesService = CasesApiFactory(configuration, '', instance);

const baseUrl = '/cases';

const fieldsToSend = [
	'subject',
	'description',
	'contact_info',
	'status_lookup',
	'close_reason_lookup',
	'author',
	'assignee',
	'reporter',
	'impacted',
	'group',
	'priority',
	'source',
	'status',
	'close_reason',
	'close_result',
	'sla_condition',
	'sla',
	'service',
	'status_condition',
	'close_reason_group',
	'custom',
];

function transformSourceType(data) {
	if (Array.isArray(data)) {
		return data.map((item) => {
			if (item.source?.type) {
				item.source.type = snakeToKebab(item.source.type.toLowerCase());
			}
			return item;
		});
	}

	if (data.source?.type) {
		data.source.type = snakeToKebab(data.source.type.toLowerCase());
	}
	return data;
}

const transformCustomFields = (data) => {
	if (!data.custom) {
		data.custom = {};
	}

	return data;
};

const checkCustomFields = (data) => {
	if (!Object.keys(data.custom).length) {
		delete data.custom;
	}

	return data;
};

const getCasesList = async (params) => {
	let ftsIds;
	const { fts } = params;
	if (fts) {
		try {
			const { items } = await FTSServiceAPI.getList({
				page: params.page,
				size: params.size,
				fts: params.fts,
				sort: params.sort,
				object_name: [
					'cases',
					'case_comments',
				],
			});
			ftsIds = items.map(({ id }) => id);
		} catch {
			// skip error, load cases without fts
		}
	}

	const { page, size, q, ids, sort, fields, options, ...filters } =
		applyTransform(
			{
				...params,
				ids: params.ids || ftsIds,
			},
			[
				merge(getDefaultGetParams()),
				(params) => ({
					...params,
					q: params.search,
				}),
			],
		);

	try {
		const response = await casesService.searchCases(
			page,
			size,
			q,
			ids,
			sort,
			[
				'custom',
				'priority',
				'description',
				'comments',
				...fields,
			],
			stringifyCaseFilters(filters),
			options,
		);

		const { items, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				snakeToCamel(),
				transformSourceType,
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getCase = async ({ itemId: id }) => {
	const fieldsToSend = [
		'etag',
		'id',
		'name',
		'subject',
		'description',
		'contact_info',
		'created_at',
		'planned_reaction_at',
		'planned_resolve_at',
		'status_lookup',
		'close_reason_lookup',
		'author',
		'assignee',
		'reporter',
		'impacted',
		'group',
		'priority',
		'source',
		'status',
		'close_reason',
		'close_result',
		'rating',
		'rating_comment',
		'reacted_at',
		'resolved_at',
		'sla_condition',
		'difference_in_reaction',
		'difference_in_resolve',
		'sla',
		'service',
		'comments',
		'related_cases',
		'links',
		'status_condition',
		'created_by',
		'custom',
	];
	try {
		const response = await casesService.locateCase(id, fieldsToSend);
		return applyTransform(response.data, [
			snakeToCamel([
				'custom',
			]),
			transformCustomFields,
			transformSourceType,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteCase = async ({ id }) => {
	try {
		const response = await casesService.deleteCase(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateCase = async ({ itemInstance }) => {
	const { etag } = itemInstance;

	const item = applyTransform(itemInstance, [
		camelToSnake([
			'custom',
		]),
		sanitize(fieldsToSend),
		checkCustomFields,
	]);

	try {
		const response = await casesService.updateCase(etag, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addCase = async ({ itemInstance }) => {
	const item = applyTransform(itemInstance, [
		camelToSnake([
			'custom',
		]),
		sanitize(fieldsToSend),
	]);
	try {
		const response = await casesService.createCase(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchCase = async ({ changes, etag }) => {
	const body = applyTransform(changes, [
		sanitize(getShallowFieldsToSendFromZodSchema(UpdateCase2Body)),
		camelToSnake(),
	]);
	try {
		const response = await casesService.updateCase2(etag, body);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const exportCase = async (params) => {
	// updateCase/updateCase2 on the generated client have a broken path
	// (literal "/cases/input.etag}") for etag-templated mutations, so those
	// still go through webitel-sdk's CasesApiFactory above — but the plain
	// collection-level export endpoint doesn't hit that bug, so it's safe here.
	const casesService = getCases();

	const { q, sort, fields, options, format, separator, ids, ...filters } =
		applyTransform(
			{
				...params,
			},
			[
				merge(getDefaultGetParams()),
				(params) => ({
					...params,
					q: params.search,
				}),
			],
		);

	delete filters.page;
	delete filters.size;

	const exportParams: Record<string, unknown> = {
		q,
		sort,
		fields,
		format,
		separator,
		filters: stringifyCaseFilters(filters),
	};

	if (ids?.length) {
		exportParams.ids = ids;
	}

	try {
		const response = await casesService.exportCases(exportParams, {
			...options,
			responseType: 'blob',
		});

		return {
			response,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getCasesLookup = (params) =>
	getCasesList({
		...params,
		fields: params.fields || [
			'id',
			'name',
			'subject',
			'priority',
		],
	});

export const CasesAPI = {
	getList: getCasesList,
	getLookup: getCasesLookup,
	get: getCase,
	delete: deleteCase,
	update: updateCase,
	add: addCase,
	patch: patchCase,
	exportData: exportCase,

	...generatePermissionsApi(baseUrl),
};

export { FTSServiceAPI } from './_internals/ftsService';
export { stringifyCaseFilters } from './_internals/stringifyCaseFilters';
