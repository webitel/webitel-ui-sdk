import { getCustomers } from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	mergeEach,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type { ApiId, ApiParams } from '../_shared/types';

const getLicenseUsersList = async ({
	parentId,
	...rest
}: {
	parentId: ApiId;
} & ApiParams) => {
	const listFieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
	];

	const defaultObject = {
		sessions: 0,
	};

	const requestParams = applyTransform(rest, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		starToSearch('q'),
		(params: ApiParams) => ({
			...params,
			q: params.q ?? params.search,
			// Product-users select rejects `id` — ui-datalist may still put it in `fields`
			fields: Array.isArray(params.fields)
				? params.fields.filter((field: string) => field !== 'id')
				: params.fields,
			// wire declares repeated `sort` (`string[]`); datalist sends a string
			sort: params.sort
				? [
						params.sort,
					]
				: undefined,
		}),
		sanitize(listFieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getCustomers().licenseUsers(
			String(parentId),
			requestParams,
		);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				mergeEach(defaultObject),
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const LicenseUsersAPI = {
	getList: getLicenseUsersList,
};
