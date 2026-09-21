import {
	FilterConfig,
	type FilterConfigBaseParams,
	type IDateRangeFilterConfig,
} from '../../../classes/FilterConfig';
import DateTimeOptionsFilterValueField from './date-time-options/date-time-options-filter-value-field.vue';
import DateTimeOptionsFilterValuePreview from './date-time-options/date-time-options-filter-value-preview.vue';

class DateRangeFilterConfig
	extends FilterConfig
	implements IDateRangeFilterConfig
{
	readonly hidePresets = true;

	constructor(params: FilterConfigBaseParams) {
		super({
			...params,
			valueInputComponent: DateTimeOptionsFilterValueField,
			valuePreviewComponent: DateTimeOptionsFilterValuePreview,
		});
	}
}

export type { DateRangeFilterConfig };

export const createDateRangeFilterConfig = (params: FilterConfigBaseParams) =>
	new DateRangeFilterConfig(params);
