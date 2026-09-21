import { CaseSourcesAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import CaseSourceFilterValueField from './case-source-filter-value-field.vue';
import CaseSourceFilterValuePreview from './case-source-filter-value-preview.vue';

class CaseSourceFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.CaseSource;
	valueInputComponent = CaseSourceFilterValueField;
	valuePreviewComponent = CaseSourceFilterValuePreview;

	searchRecords = gateFilterSearch(WtObject.Source, CaseSourcesAPI.getLookup);
}

export const createCaseSourceFilterConfig = (params?: FilterConfigBaseParams) =>
	new CaseSourceFilterConfig(params);
