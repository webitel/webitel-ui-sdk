import { UsersAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import AuditorFilterValueField from './auditor-filter-value-field.vue';
import AuditorFilterValuePreview from './auditor-filter-value-preview.vue';

class AuditorFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.Auditor;
	valueInputComponent = AuditorFilterValueField;
	valuePreviewComponent = AuditorFilterValuePreview;

	searchRecords = gateFilterSearch(WtObject.User, UsersAPI.getLookup);
}

export const createAuditorFilterConfig = (params?: FilterConfigBaseParams) =>
	new AuditorFilterConfig(params);
