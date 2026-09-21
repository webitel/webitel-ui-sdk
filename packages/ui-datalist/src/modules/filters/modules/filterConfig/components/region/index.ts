import { RegionsAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { hasFilterReadAccess } from '../../composables/useFilterReadAccess';
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
		if (!hasFilterReadAccess(WtObject.Region)) {
			return Promise.resolve({
				items: [],
			});
		}

		return RegionsAPI.getLookup(params);
	}
}

export const createRegionFilterConfig = (params?: FilterConfigBaseParams) =>
	new RegionFilterConfig(params);
