import { getCalendarService } from '@webitel/api-services/gen';
import deepCopy from 'deep-copy';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import { generatePermissionsApi } from '../_shared/generatePermissionsApi';
import type {
	AddItemParams,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	UpdateItemParams,
} from '../_shared/types';

const baseUrl = '/calendars';

const getCalendarList = async (params: ApiParams) => {
	const { page, size, q, sort, fields, id } = applyTransform(params, [
		merge(getDefaultGetParams()),
		(params) => ({
			...params,
			q: params?.q || params?.search,
		}),
		starToSearch('q'),
	]);

	try {
		const response = await getCalendarService().searchCalendar({
			page,
			size,
			q,
			sort,
			fields,
			id,
		});
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

const getCalendar = async ({ itemId: id }: GetItemParams) => {
	const itemResponseHandler = (item: ApiParams) => {
		const copy = deepCopy(item);
		const defaultSingleObject = {
			name: '',
			timezone: {},
			description: '',
			startAt: Date.now(),
			endAt: Date.now(),
			expires: !!(copy.startAt || copy.endAt),
			accepts: [],
			excepts: [],
			specials: [],
		};

		copy.accepts = (copy.accepts || []).map((accept: ApiParams) => ({
			day: accept.day || 0,
			disabled: accept.disabled || false,
			start: accept.startTimeOfDay || 0,
			end: accept.endTimeOfDay || 0,
		}));
		if (copy.specials) {
			copy.specials = copy.specials.map((special: ApiParams) => ({
				day: special.day || 0,
				disabled: special.disabled || false,
				start: special.startTimeOfDay || 0,
				end: special.endTimeOfDay || 0,
			}));
		}
		if (copy.excepts) {
			copy.excepts = copy.excepts.map((except: ApiParams) => ({
				name: except.name || '',
				date: except.date || 0,
				repeat: except.repeat || false,
				working: except.working || false,
				workStart: except.workStart || null,
				workStop: except.workStop || null,
			}));
		}
		return {
			...defaultSingleObject,
			...copy,
		};
	};

	try {
		const response = await getCalendarService().readCalendar(String(id));
		return applyTransform(response.data, [
			snakeToCamel(),
			itemResponseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const fieldsToSend = [
	'name',
	'description',
	'timezone',
	'startAt',
	'endAt',
	'day',
	'accepts',
	'excepts',
	'specials',
	'startTimeOfDay',
	'endTimeOfDay',
	'disabled',
	'date',
	'repeat',
	'working',
	'workStart',
	'workStop',
];

const preRequestHandler = (item: ApiParams) => {
	const copy = deepCopy(item);
	if (copy.timezone) {
		copy.timezone.offset = undefined;
	}
	if (!copy.expires) {
		copy.startAt = undefined;
		copy.endAt = undefined;
	}

	copy.accepts = (copy.accepts || []).map((accept: ApiParams) => ({
		day: accept.day,
		disabled: accept.disabled,
		startTimeOfDay: accept.start,
		endTimeOfDay: accept.end,
	}));

	copy.specials = (copy.specials || []).map((special: ApiParams) => ({
		day: special.day,
		disabled: special.disabled,
		startTimeOfDay: special.start,
		endTimeOfDay: special.end,
	}));
	return copy;
};

const addCalendar = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getCalendarService().createCalendar(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateCalendar = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getCalendarService().updateCalendar(
			String(id),
			item,
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

const deleteCalendar = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getCalendarService().deleteCalendar(String(id));
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getCalendarsLookup = (params: Parameters<typeof getCalendarList>[0]) =>
	getCalendarList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

const getTimezonesLookup = async (params: ApiParams) => {
	const { page, size, q, sort, fields, id } = applyTransform(params, [
		merge(getDefaultGetParams()),
		(params) => ({
			...params,
			q: params?.q || params?.search,
		}),
		starToSearch('q'),
	]);

	try {
		const response = await getCalendarService().searchTimezones({
			page,
			size,
			q,
			sort,
			fields,
			id,
		});
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

export const CalendarsAPI = {
	getList: getCalendarList,
	get: getCalendar,
	add: addCalendar,
	update: updateCalendar,
	delete: deleteCalendar,
	getLookup: getCalendarsLookup,
	getTimezonesLookup,

	...generatePermissionsApi(baseUrl),
};
