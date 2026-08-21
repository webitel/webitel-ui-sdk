import {
	GetQueuesGlobalStateQueryParams,
	getQueueService,
	SetQueuesGlobalStateBody,
} from '@webitel/api-services/gen';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import {
	applyTransform,
	camelToSnake,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type { ApiParams } from '../_shared/types';

/**
 * The queues registry's global enable/disable switcher. It reports and flips
 * the state of every queue matching the table's current filters, so it takes
 * the same filter names the datalist store holds and maps them onto the
 * service's own param names.
 */
const mapFilters = (params: ApiParams) => ({
	q: params.search,
	type: params.queueType,
	teamId: params.team,
	tags: params.tags,
});

const getQueuesGlobalState = async (params: ApiParams = {}) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		GetQueuesGlobalStateQueryParams,
	);

	const transformedParams = applyTransform(params, [
		starToSearch('search'),
		mapFilters,
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response =
			await getQueueService().getQueuesGlobalState(transformedParams);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const setQueuesGlobalState = async ({
	enabled,
	params,
}: {
	enabled: boolean;
	params: ApiParams;
}) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		SetQueuesGlobalStateBody,
	);

	const transformedParams = applyTransform(params, [
		starToSearch('search'),
		mapFilters,
	]);

	const body = applyTransform(
		{
			enabled: !!enabled,
			...transformedParams,
		},
		[
			sanitize(fieldsToSend),
			camelToSnake(),
		],
	);

	try {
		const response = await getQueueService().setQueuesGlobalState(body);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const QueuesStateAPI = {
	getQueuesGlobalState,
	setQueuesGlobalState,
};
