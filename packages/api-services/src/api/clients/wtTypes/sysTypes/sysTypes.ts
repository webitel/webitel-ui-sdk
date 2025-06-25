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
	starToSearch,
} from '../../../transformers';

const instance = getDefaultInstance();

const getSysTypeRecordsList = async ({ path, display, primary, ...params }) => {
	const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id', 'ids'];

	const url = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params) => ({ ...params, q: params.search }),
		(params) => ({
			...params,
			ids: params.id /* https://webitel.atlassian.net/browse/WTEL-6788 */,
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
			// Some endpoints return data, some return items so we need to check for both of them
			items:
				applyTransform(data || items, [
					// transformItemsForSelect({ display, primary }),
				]) ?? [],
			next,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getSysTypeRecordsLookup = (params) =>
	getSysTypeRecordsList({
		...params,
		fields: params.fields || ['id', 'name'],
	});

export const SysTypesAPI = {
	getList: getSysTypeRecordsList,
	getLookup: getSysTypeRecordsLookup,
};
