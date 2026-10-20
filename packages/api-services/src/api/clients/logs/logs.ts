import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import {
	getLoggerService,
	LoggerServiceSearchLogByConfigIdQueryParams,
	LoggerServiceSearchLogByUserIdQueryParams,
} from '../../../gen-wire';
import { normalizeDatetimeRange } from '../../../scripts';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitizeToWire,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type { ApiParams, GetItemParams } from '../_shared/types';

/**
 * The logger endpoints have no natural ordering, so both lists default to
 * newest first.
 */
const DEFAULT_SORT = '-date';

/**
 * [Claude] The datalist's params, as the logger list endpoints take them: the
 * date filter is a range, split into its bounds; anything the endpoint does
 * not declare is dropped.
 */
const toLogsListParams = (params: ApiParams, wireFields: string[]) =>
	applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		({ date, ...rest }: ApiParams) => {
			const range = normalizeDatetimeRange(date);
			return {
				...rest,
				// the generated param is `q`; `search` is what the datalist store sends
				q: rest.q ?? rest.search,
				sort: rest.sort || DEFAULT_SORT,
				dateFrom: range?.from,
				dateTo: range?.to,
			};
		},
		sanitizeToWire(wireFields),
		camelToSnake(),
	]);

const getLogsByUserList = async ({ parentId, ...params }: ApiParams) => {
	const requestParams = toLogsListParams(
		{
			...params,
			// [Claude] the rows link to their changelog, whatever columns are shown
			fields: params.fields && [
				...params.fields,
				'config_id',
			],
			objectId: params.object,
		},
		getShallowFieldsToSendFromZodSchema(
			LoggerServiceSearchLogByUserIdQueryParams,
		),
	);

	try {
		const response = await getLoggerService().loggerServiceSearchLogByUserId(
			Number(parentId),
			requestParams,
		);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
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

const getLogsByConfigList = async ({ parentId, ...params }: ApiParams) => {
	const requestParams = toLogsListParams(
		{
			...params,
			userId: params.user,
		},
		getShallowFieldsToSendFromZodSchema(
			LoggerServiceSearchLogByConfigIdQueryParams,
		),
	);

	try {
		const response = await getLoggerService().loggerServiceSearchLogByConfigId(
			Number(parentId),
			requestParams,
		);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
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

const getLog = async ({ itemId: id }: GetItemParams) => {
	try {
		const response = await getLoggerService().loggerServiceGetLog(Number(id));
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

/** Audit log of everything one user did. */
export const UserLogsAPI = {
	getList: getLogsByUserList,
};

/** Audit log of everything done to one logger config's object. */
export const ConfigLogsAPI = {
	getList: getLogsByConfigList,
	get: getLog,
};
