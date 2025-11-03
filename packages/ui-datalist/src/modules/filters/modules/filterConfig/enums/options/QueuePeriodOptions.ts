import { FilterEnumOption } from '../../../../classes/Filter';

export const QueuePeriodOptions: Array<FilterEnumOption> = Object.freeze([
  {
    locale: 'filters.period.options.today',
    value: 'today',
  },
  {
    locale: ['filters.period.options.h', { h: 6 }, 2],
    value: '6hour',
  },
  {
    locale: ['filters.period.options.h', { h: 3 }, 2],
    value: '3hour',
  },
  {
    locale: ['filters.period.options.h', { h: 1 }, 1],
    value: '1hour',
  },
  {
    locale: ['filters.period.options.m', { m: 30 }, 2],
    value: '30min',
  },
  {
    locale: ['filters.period.options.m', { m: 15 }, 2],
    value: '15min',
  },
]);
