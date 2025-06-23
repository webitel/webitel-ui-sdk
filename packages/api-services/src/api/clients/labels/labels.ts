import { LabelsApiFactory } from 'webitel-sdk';
import {
	getDefaultGetParams,
	getDefaultInstance,
	getDefaultOpenAPIConfig,
} from '../../defaults/index';
import applyTransform, {
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../transformers/index';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const service = LabelsApiFactory(configuration, '', instance);

const getList = async (params) => {
	const fieldsToSend = ['page', 'size', 'search', 'sort', 'fields', 'id'];
	const { page, size, search } = applyTransform(params, [
		sanitize(fieldsToSend),
		merge(getDefaultGetParams()),
		starToSearch('search'),
		camelToSnake(),
	]);
	try {
		const response = await service.getLabels(page, size, search);
		const { labels, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge({ labels: [], next: false }),
		]);
		return {
			items: labels,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getLabelsLookup = (params) =>
	getList({
		...params,
		fields: params.fields || ['id', 'name'],
	});

export const LabelsAPI = {
	getList,
	getLookup: getLabelsLookup,
};
