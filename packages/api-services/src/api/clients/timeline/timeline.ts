import {
	GetTimelineQueryParams,
	GetTimelineTimelineQueryParams,
	getCaseTimeline,
	getTimeline,
} from '@webitel/api-services/gen';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';

import { getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	merge,
	notify,
	sanitize,
	snakeToCamel,
} from '../../transformers';
import type { ApiId, ApiParams } from '../_shared/types';

type TimelineEntity = 'case' | 'contact';

const clients = {
	case: {
		getTimeline: (parentId, params) =>
			getCaseTimeline().getTimeline(parentId, params),
		getTimelineCounter: (parentId) =>
			getCaseTimeline().getTimelineCounter(parentId),
		queryParamsSchema: GetTimelineQueryParams,
	},
	contact: {
		getTimeline: (parentId, params) =>
			getTimeline().getTimelineTimeline(parentId, params),
		getTimelineCounter: (parentId) =>
			getTimeline().getTimelineCounterTimeline(parentId),
		queryParamsSchema: GetTimelineTimelineQueryParams,
	},
} satisfies Record<
	TimelineEntity,
	{
		getTimeline: (
			parentId: string,
			params: ApiParams,
		) => Promise<{
			data: unknown;
		}>;
		getTimelineCounter: (parentId: string) => Promise<{
			data: unknown;
		}>;
		queryParamsSchema: unknown;
	}
>;

const getList = async ({
	entity,
	parentId,
	...rest
}: {
	entity: TimelineEntity;
	parentId: ApiId;
} & ApiParams) => {
	const { getTimeline, queryParamsSchema } = clients[entity];
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(queryParamsSchema);

	const { dateFrom, dateTo, type, page, size } = applyTransform(rest, [
		merge(getDefaultGetParams()),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await getTimeline(String(parentId), {
			page,
			size,
			dateFrom,
			dateTo,
			type,
		});
		// `days` can be a large, deeply-nested tree — merge() would recursively
		// clone the whole thing via deepmerge just to add unused `items`/`next`
		// defaults, which risks a stack overflow on large histories.
		const data = applyTransform(response.data, [
			snakeToCamel(),
		]);
		return {
			days: data.days ?? [],
			next: data.next ?? false,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getCounters = async ({
	entity,
	parentId,
}: {
	entity: TimelineEntity;
	parentId: ApiId;
}) => {
	const { getTimelineCounter } = clients[entity];
	const defaultObject = {
		callsCount: 0,
		chatsCount: 0,
		emailsCount: 0,
		dateFrom: Date.now(),
		dateTo: Date.now(),
	};
	try {
		const response = await getTimelineCounter(String(parentId));
		return applyTransform(response.data, [
			snakeToCamel(),
			merge(defaultObject),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const TimelineAPI = {
	getList,
	getCounters,
};
