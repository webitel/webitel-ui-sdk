import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import {
	ForecastCalculationServiceSearchForecastCalculationQueryParams,
	getForecastCalculationService,
} from '../../../gen-wire';
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
import type { ApiParams } from '../_shared/types';

const getForecastCalculationsList = async (params: ApiParams) => {
	const requestParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params: ApiParams) => ({
			...params,
			q: params.q ?? params.search,
		}),
		sanitizeToWire(
			getShallowFieldsToSendFromZodSchema(
				ForecastCalculationServiceSearchForecastCalculationQueryParams,
			),
		),
		camelToSnake(),
	]);

	try {
		const response =
			await getForecastCalculationService().forecastCalculationServiceSearchForecastCalculation(
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

const getForecastCalculationsLookup = (params: ApiParams) =>
	getForecastCalculationsList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const ForecastCalculationsAPI = {
	getList: getForecastCalculationsList,
	getLookup: getForecastCalculationsLookup,
};
