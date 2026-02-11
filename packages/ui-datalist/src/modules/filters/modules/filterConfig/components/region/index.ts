import { RegionsAPI } from '@webitel/api-services/api';

import { WtSysTypeFilterConfig } from '../../classes/FilterConfig';
import { FilterOption } from '../../enums/FilterOption';
import RegionFilterValueField from './region-filter-value-field.vue';
import RegionFilterValuePreview from './region-filter-value-preview.vue';

class RegionFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.Region;
	valueInputComponent = RegionFilterValueField;
	valuePreviewComponent = RegionFilterValuePreview;
	searchRecords(params: object): Promise<{
		items: unknown[];
		next?: boolean;
	}> {
		return RegionsAPI.getLookup(params);
	}
}

export const createRegionFilterConfig = (params) =>
	new RegionFilterConfig(params);
