export type * from './classes/FilterConfig';
export * from './types/DynamicFilterPreviewComponent';
export * from './types/FilterConfigDefinition';

import { createFilterConfig } from './classes/createFilterConfig';
import { createDateRangeFilterConfig } from './components/_shared/date-time-filter/filterConfig';

export { createDateRangeFilterConfig, createFilterConfig };
