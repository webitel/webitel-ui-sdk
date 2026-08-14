import {
	endOfMonth,
	endOfToday,
	endOfWeek,
	startOfMonth,
	startOfToday,
	startOfWeek,
} from 'date-fns';

import { RelativeDatetimeValue } from '../../enums';

export type RelativeDatetimeRoundOption =
	| 'start'
	| 'end'; /* for "from" or "to" */

export type NormalizeDatetimeValueParam =
	| RelativeDatetimeValue
	| number
	| string
	| null
	| undefined;

export type NormalizeDatetimeOptions = {
	round?: RelativeDatetimeRoundOption;
};

export const isRelativeDatetimeValue = (
	value: unknown,
): value is RelativeDatetimeValue => {
	return (
		typeof value === 'string' &&
		(Object.values(RelativeDatetimeValue) as string[]).includes(value)
	);
};

const convertRelativeDatetimeToTimestamp = (
	relativeValue: RelativeDatetimeValue,
	options?: NormalizeDatetimeOptions,
): number => {
	if (options?.round === 'end') {
		switch (relativeValue) {
			case RelativeDatetimeValue.Today:
				return endOfToday().getTime();
			case RelativeDatetimeValue.ThisWeek:
				return endOfWeek(Date.now(), {
					weekStartsOn: 1,
				}).getTime();
			case RelativeDatetimeValue.ThisMonth:
				return endOfMonth(Date.now()).getTime();
			default:
				return Date.now();
		}
	}
	switch (relativeValue) {
		case RelativeDatetimeValue.Today:
			return startOfToday().getTime();
		case RelativeDatetimeValue.ThisWeek:
			return startOfWeek(Date.now(), {
				weekStartsOn: 1,
			}).getTime();
		case RelativeDatetimeValue.ThisMonth:
			return startOfMonth(Date.now()).getTime();
		default:
			return Date.now();
	}
};

export const normalizeToTimestamp = (
	value?: NormalizeDatetimeValueParam,
	options: NormalizeDatetimeOptions = {},
): number => {
	if (value == null) {
		return 0;
	}
	if (typeof value === 'number') {
		return value;
	}
	if (isRelativeDatetimeValue(value)) {
		return convertRelativeDatetimeToTimestamp(value, options);
	}
	if (typeof value === 'string') {
		if (+value) {
			return +value;
		}
		return 0;
	}
	return Date.now();
};

export type DatetimeRangeValue = {
	from?: NormalizeDatetimeValueParam;
	to?: NormalizeDatetimeValueParam;
};

export const isDatetimeRangeValue = (
	value: unknown,
): value is DatetimeRangeValue =>
	typeof value === 'object' &&
	value !== null &&
	('from' in value || 'to' in value);

export const normalizeDatetimeRange = (
	value?: NormalizeDatetimeValueParam | DatetimeRangeValue,
): DatetimeRangeValue | undefined => {
	if (value == null || value === '') {
		return undefined;
	}
	if (isDatetimeRangeValue(value)) {
		return {
			from:
				value.from == null || value.from === ''
					? undefined
					: normalizeToTimestamp(value.from, {
							round: 'start',
						}),
			to:
				value.to == null || value.to === ''
					? undefined
					: normalizeToTimestamp(value.to, {
							round: 'end',
						}),
		};
	}
	return {
		from: normalizeToTimestamp(value, {
			round: 'start',
		}),
		to: normalizeToTimestamp(value, {
			round: 'end',
		}),
	};
};
