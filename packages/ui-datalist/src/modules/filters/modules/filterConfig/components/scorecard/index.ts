import { AuditFormsAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import ScorecardFilterValueField from './scorecard-filter-value-field.vue';
import ScorecardFilterValuePreview from './scorecard-filter-value-preview.vue';

class ScorecardFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.Scorecard;
	valueInputComponent = ScorecardFilterValueField;
	valuePreviewComponent = ScorecardFilterValuePreview;

	searchRecords = gateFilterSearch(WtObject.AuditForm, AuditFormsAPI.getLookup);
}

export const createScorecardFilterConfig = (params?: FilterConfigBaseParams) =>
	new ScorecardFilterConfig(params);
