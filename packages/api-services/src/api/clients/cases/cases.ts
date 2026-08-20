import {
	CreateCaseBody,
	getCases,
	UpdateCase2Body,
	UpdateCaseBody,
} from '@webitel/api-services/gen';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { snakeToKebab } from '@webitel/api-services/utils';
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
import { FTSServiceAPI } from './_internals/ftsService';
import { stringifyCaseFilters } from './_internals/stringifyCaseFilters';

const casesService = getCases();

const baseUrl = '/cases';

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
	let ftsIds: string[] | undefined;
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
			{
				page,
				size,
				q,
				ids,
				sort,
				fields: [
					'custom',
					'priority',
					'description',
					'comments',
					...fields,
				],
				filters: stringifyCaseFilters(filters),
			},
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
		const response = await casesService.locateCase(String(id), {
			fields: fieldsToSend,
		});
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
		const response = await casesService.deleteCase(String(id));
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateFieldsToSend = getShallowFieldsToSendFromZodSchema(UpdateCaseBody);

const updateCase = async ({ itemInstance }) => {
	const { etag } = itemInstance;

	const item = applyTransform(itemInstance, [
		sanitize(updateFieldsToSend),
		camelToSnake([
			'custom',
		]),
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

const addFieldsToSend = getShallowFieldsToSendFromZodSchema(CreateCaseBody);

const addCase = async ({ itemInstance }) => {
	const item = applyTransform(itemInstance, [
		sanitize(addFieldsToSend),
		camelToSnake([
			'custom',
		]),
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
