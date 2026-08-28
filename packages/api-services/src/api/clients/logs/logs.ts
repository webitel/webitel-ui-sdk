import { getLoggerService } from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	merge,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type { ApiParams } from '../_shared/types';

/**
 * The logger endpoints have no natural ordering, so both lists default to
 * newest first.
 */
const DEFAULT_SORT = '-date';

const getLogsByUserList = async (params: ApiParams) => {
	const fieldsToSend = [
		'parentId',
		'page',
		'size',
		'search',
		'sort',
		'fields',
		'action',
		'object',
		'from',
		'to',
		'userIp',
	];

	const {
		parentId,
		page,
		size,
		search,
		sort,
		fields,
		action,
		object,
		from,
		to,
		userIp,
	} = applyTransform(params, [
		sanitize(fieldsToSend),
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response = await getLoggerService().loggerServiceSearchLogByUserId(
			Number(parentId),
			{
				page,
				size,
				// the generated param is `q`; `search` is what the datalist store sends
				q: search,
				sort: sort || DEFAULT_SORT,
				fields,
				object_id: object,
				action,
				user_ip: userIp,
				date_from: from,
				date_to: to,
			},
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

const getLogsByConfigList = async (params: ApiParams) => {
	const fieldsToSend = [
		'parentId',
		'page',
		'size',
		'search',
		'sort',
		'fields',
		'action',
		'user',
		'from',
		'to',
		'userIp',
	];

	const {
		parentId,
		page,
		size,
		search,
		sort,
		fields,
		action,
		user,
		from,
		to,
		userIp,
	} = applyTransform(params, [
		sanitize(fieldsToSend),
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response = await getLoggerService().loggerServiceSearchLogByConfigId(
			Number(parentId),
			{
				page,
				size,
				// the generated param is `q`; `search` is what the datalist store sends
				q: search,
				sort: sort || DEFAULT_SORT,
				fields,
				user_id: user,
				action,
				user_ip: userIp,
				date_from: from,
				date_to: to,
			},
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

/** Audit log of everything one user did. */
export const UserLogsAPI = {
	getList: getLogsByUserList,
};

/** Audit log of everything done to one logger config's object. */
export const ConfigLogsAPI = {
	getList: getLogsByConfigList,
};
