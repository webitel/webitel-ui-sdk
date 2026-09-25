import { ContactsAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import CaseReporterFilterValueField from './case-reporter-filter-value-field.vue';
import CaseReporterFilterValuePreview from './case-reporter-filter-value-preview.vue';

class CaseReporterFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.CaseReporter;
	valueInputComponent = CaseReporterFilterValueField;
	valuePreviewComponent = CaseReporterFilterValuePreview;

	searchRecords = gateFilterSearch(WtObject.Contact, ContactsAPI.getLookup);
}

export const createCaseReporterFilterConfig = (
	params?: FilterConfigBaseParams,
) => new CaseReporterFilterConfig(params);
