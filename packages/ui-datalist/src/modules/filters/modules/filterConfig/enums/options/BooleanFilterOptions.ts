/*
values are strings instead of booleans because restoration from url query
returns string for any type of value [DEV-3924]
 */
import { FilterEnumOption } from '../../../../classes/Filter';

export const BooleanOptions: Array<FilterEnumOption> = [
  {
    locale: 'vocabulary.yes',
    value: 'true',
  },
  {
    locale: 'vocabulary.no',
    value: 'false',
  },
] as const;
export type BooleanFilterModelValue = boolean;
