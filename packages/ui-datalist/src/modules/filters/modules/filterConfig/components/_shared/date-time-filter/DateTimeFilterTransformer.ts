import { normalizeToTimestamp } from '@webitel/ui-sdk/scripts';

import { IFilter } from '../../../../../types/Filters.types';
import { FilterTransformer } from '../../../modules/filterTransformer/classes/FilterTransformer';

export type DateTimeRangeFilterTransformedValue = {
  from?: number; // timestamp
  to?: number; // timestamp
};

export class DateTimeFilterTransformer extends FilterTransformer {
  transformToApi(filter: IFilter): DateTimeRangeFilterTransformedValue {
    const rawValue = filter.value;
    return normalizeToTimestamp(rawValue);
  }
}
