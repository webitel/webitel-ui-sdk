import { getTimeline } from '@webitel/api-services/gen';
import {
	applyTransform,
	merge,
	notify,
	sanitize,
	snakeToCamel,
} from '../../transformers';

const getList = async (params) => {
	const fieldsToSend = [
		'parentId',
		'dateFrom',
		'dateTo',
		'type',
		'page',
		'size',
	];
	const { parentId, dateFrom, dateTo, type, page, size } = applyTransform(
		params,
		[
			sanitize(fieldsToSend),
		],
	);
	try {
		const response = await getTimeline().getTimelineTimeline(parentId, {
			page: page || 1,
			size: size || 10,
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

const getCounters = async (params) => {
	const defaultObject = {
		callsCount: 0,
		chatsCount: 0,
		emailsCount: 0,
		dateFrom: Date.now(),
		dateTo: Date.now(),
	};
	const { parentId } = applyTransform(params, [
		sanitize([
			'parentId',
		]),
	]);
	try {
		const response = await getTimeline().getTimelineCounterTimeline(parentId);
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

export const ContactTimelineAPI = {
	getList,
	getCounters,
};
