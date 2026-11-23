import { UsersAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import SkippedByFilterValueField from './skipped-by-filter-value-field.vue';
import SkippedByFilterValuePreview from './skipped-by-filter-value-preview.vue';

class SkippedByFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.SkippedBy;
	valueInputComponent = SkippedByFilterValueField;
	valuePreviewComponent = SkippedByFilterValuePreview;

	searchRecords = gateFilterSearch(WtObject.User, UsersAPI.getLookup);
}

export const createSkippedByFilterConfig = (params?: FilterConfigBaseParams) =>
	new SkippedByFilterConfig(params);
