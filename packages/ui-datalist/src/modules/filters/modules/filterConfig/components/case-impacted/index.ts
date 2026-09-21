import { ContactsAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import CaseImpactedFilterValueField from './case-impacted-filter-value-field.vue';
import CaseImpactedFilterValuePreview from './case-impacted-filter-value-preview.vue';

class CaseImpactedFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.CaseImpacted;
	valueInputComponent = CaseImpactedFilterValueField;
	valuePreviewComponent = CaseImpactedFilterValuePreview;

	searchRecords = gateFilterSearch(WtObject.Contact, ContactsAPI.getLookup);
}

export const createCaseImpactedFilterConfig = (
	params?: FilterConfigBaseParams,
) => new CaseImpactedFilterConfig(params);
