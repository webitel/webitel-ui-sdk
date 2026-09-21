import { SlasAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import CaseSlaFilterValueField from './case-sla-filter-value-field.vue';
import CaseSlaFilterValuePreview from './case-sla-filter-value-preview.vue';

class CaseSlaFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.CaseSla;
	valueInputComponent = CaseSlaFilterValueField;
	valuePreviewComponent = CaseSlaFilterValuePreview;

	searchRecords = gateFilterSearch(WtObject.Slas, SlasAPI.getLookup);
}

export const createCaseSlaFilterConfig = (params?: FilterConfigBaseParams) =>
	new CaseSlaFilterConfig(params);
