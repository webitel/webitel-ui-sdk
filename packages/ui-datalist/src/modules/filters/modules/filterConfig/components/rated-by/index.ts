import { UsersAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import RatedByFilterValueField from './rated-by-filter-value-field.vue';
import RatedByFilterValuePreview from './rated-by-filter-value-preview.vue';

class RatedByFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.RatedBy;
	valueInputComponent = RatedByFilterValueField;
	valuePreviewComponent = RatedByFilterValuePreview;

	searchRecords = gateFilterSearch(WtObject.User, UsersAPI.getLookup);
}

export const createRatedByFilterConfig = (params?: FilterConfigBaseParams) =>
	new RatedByFilterConfig(params);
