import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import {
	GetTimelineQueryParams,
	GetTimelineTimelineQueryParams,
	getCaseTimeline,
	getTimeline,
} from '../../../gen-wire';
import type { ContactsTimelineEventType } from '../../../gen-wire/_models';

import { getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	merge,
	notify,
	sanitizeToWire,
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
		getTimelineItemInfo: (parentId, type, id) =>
			getCaseTimeline().getTimelineItemInfo(parentId, type, id),
		queryParamsSchema: GetTimelineQueryParams,
	},
	contact: {
		getTimeline: (parentId, params) =>
			getTimeline().getTimelineTimeline(parentId, params),
		getTimelineCounter: (parentId) =>
			getTimeline().getTimelineCounterTimeline(parentId),
		getTimelineItemInfo: (parentId, type, id) =>
			getTimeline().getTimelineItemInfoTimeline(parentId, type, id),
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
		getTimelineItemInfo: (
			parentId: string,
			type: ContactsTimelineEventType,
			id: string,
		) => Promise<{
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
		sanitizeToWire(fieldsToSend),
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
			days: data?.days ?? [],
			next: data?.next ?? false,
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

const getInfo = async ({
	entity,
	parentId,
	type,
	id,
}: {
	entity: TimelineEntity;
	parentId: ApiId;
	type: ContactsTimelineEventType;
	id: ApiId;
}) => {
	const { getTimelineItemInfo } = clients[entity];
	try {
		const response = await getTimelineItemInfo(
			String(parentId),
			type,
			String(id),
		);
		return applyTransform(response.data, [
			snakeToCamel(),
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
	getInfo,
};
