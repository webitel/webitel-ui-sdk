import { RegionsAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import RegionFilterValueField from './region-filter-value-field.vue';
import RegionFilterValuePreview from './region-filter-value-preview.vue';

class RegionFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.Region;
	valueInputComponent = RegionFilterValueField;
	valuePreviewComponent = RegionFilterValuePreview;
	searchRecords = gateFilterSearch(WtObject.Region, RegionsAPI.getLookup);
}

export const createRegionFilterConfig = (params?: FilterConfigBaseParams) =>
	new RegionFilterConfig(params);
