import {
  endOfMonth,
  endOfToday,
  endOfWeek,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from 'date-fns';

import { RelativeDatetimeValue } from '../enums';

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

export const isRelativeDatetimeValue = (value: string): boolean => {
  return Object.values(RelativeDatetimeValue).includes(value);
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
        return endOfWeek(Date.now()).getTime();
      case RelativeDatetimeValue.ThisMonth:
        return endOfMonth(Date.now()).getTime();
      default:
        return Date.now();
    }
  } else {
    switch (relativeValue) {
      case RelativeDatetimeValue.Today:
        return startOfToday().getTime();
      case RelativeDatetimeValue.ThisWeek:
        return startOfWeek(Date.now()).getTime();
      case RelativeDatetimeValue.ThisMonth:
        return startOfMonth(Date.now()).getTime();
      default:
        return Date.now();
    }
  }
};

export const normalizeToTimestamp = (
  value?: NormalizeDatetimeValueParam,
  options: NormalizeDatetimeOptions = {},
): number => {
  if (value == null) {
    return 0;
  } else if (typeof value === 'number') {
    return value;
  } else if (isRelativeDatetimeValue(value)) {
    return convertRelativeDatetimeToTimestamp(value, options);
  } else if (typeof value === 'string') {
    if (+value) {
      return +value;
    }
  } else {
    return Date.now();
  }
};
