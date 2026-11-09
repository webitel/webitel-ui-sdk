import { UsersAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import ModifiedByFilterValueField from './modified-by-filter-value-field.vue';
import ModifiedByFilterValuePreview from './modified-by-filter-value-preview.vue';

class ModifiedByFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.ModifiedBy;
	valueInputComponent = ModifiedByFilterValueField;
	valuePreviewComponent = ModifiedByFilterValuePreview;

	searchRecords = gateFilterSearch(WtObject.User, UsersAPI.getLookup);
}

export const createModifiedByFilterConfig = (params?: FilterConfigBaseParams) =>
	new ModifiedByFilterConfig(params);
