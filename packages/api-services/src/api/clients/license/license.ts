import { getCustomers } from '../../../gen-wire';
import {
	getDefaultGetListResponse,
	getDefaultGetParams,
	getDefaultInstance,
} from '../../defaults';
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
import type { ApiParams } from '../_shared/types';

const instance = getDefaultInstance();

const getLicenseList = async (params: ApiParams) => {
	const listFieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
	];

	const defaultObject = {
		remain: 0,
		limit: 0,
	};

	const requestParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		starToSearch('q'),
		(params: ApiParams) => ({
			...params,
			// filtersManager may pass `q` (Path A) or legacy `search`
			q: params.q ?? params.search,
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
		const response = await getCustomers().licenseUsage2(requestParams);
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

/**
 * Import / update customer certificate.
 * Sent as JSON body — matches admin's historical contract. Generated
 * `updateCustomer` puts `certificate` in query params with an empty body.
 */
const updateLicense = async (data: { certificate: string }) => {
	try {
		const response = await instance.put('/customer', data);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const LicenseAPI = {
	getList: getLicenseList,
	update: updateLicense,
};
