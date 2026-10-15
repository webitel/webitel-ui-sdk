import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { forecastCalculationSchema } from '@webitel/api-services/validations';
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
import type {
	AddItemParams,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	UpdateItemParams,
} from '../_shared/types';

const fieldsToSend = getShallowFieldsToSendFromZodSchema(
	forecastCalculationSchema,
);

/**
 * [Claude] arguments are procedure placeholders (`$__teamId()`, user tags) —
 * their text must reach the backend as typed, without case conversion.
 */
const skipCaseKeys = [
	'args',
];

/**
 * [Claude] WFM services wrap both request and response payloads in an `item` envelope.
 */
const itemResponseHandler = (response: ApiParams) => ({
	...response.item,
});

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
			snakeToCamel(skipCaseKeys),
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

const getForecastCalculation = async ({ itemId: id }: GetItemParams) => {
	try {
		const response =
			await getForecastCalculationService().forecastCalculationServiceReadForecastCalculation(
				String(id),
			);
		return applyTransform(response.data, [
			snakeToCamel(skipCaseKeys),
			itemResponseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addForecastCalculation = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitizeToWire(fieldsToSend),
		camelToSnake(skipCaseKeys),
	]);
	try {
		const response =
			await getForecastCalculationService().forecastCalculationServiceCreateForecastCalculation(
				{
					item,
				},
			);
		return applyTransform(response.data, [
			snakeToCamel(skipCaseKeys),
			itemResponseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateForecastCalculation = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitizeToWire(fieldsToSend),
		camelToSnake(skipCaseKeys),
	]);
	try {
		const response =
			await getForecastCalculationService().forecastCalculationServiceUpdateForecastCalculation(
				String(id),
				{
					item,
				},
			);
		return applyTransform(response.data, [
			snakeToCamel(skipCaseKeys),
			itemResponseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteForecastCalculation = async ({ id }: DeleteItemParams) => {
	try {
		const response =
			await getForecastCalculationService().forecastCalculationServiceDeleteForecastCalculation(
				String(id),
			);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

interface ExecuteForecastCalculationParams {
	itemId: string | number;
	teamId: string | number;
	/** [Claude] period bounds, epoch milliseconds */
	from: string | number;
	to: string | number;
}

/**
 * [Claude] runs the saved procedure for a team and period.
 */
const executeForecastCalculation = async ({
	itemId,
	teamId,
	from,
	to,
}: ExecuteForecastCalculationParams) => {
	try {
		const response =
			await getForecastCalculationService().forecastCalculationServiceExecuteForecastCalculation(
				String(itemId),
				{
					team_id: String(teamId),
					'forecast_data.from': String(from),
					'forecast_data.to': String(to),
				},
			);
		const { items = [] } = response.data;
		return {
			items,
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
	get: getForecastCalculation,
	add: addForecastCalculation,
	update: updateForecastCalculation,
	delete: deleteForecastCalculation,
	execute: executeForecastCalculation,
	getLookup: getForecastCalculationsLookup,
};
