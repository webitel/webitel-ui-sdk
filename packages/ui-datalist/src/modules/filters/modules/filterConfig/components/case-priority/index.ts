import { CasePrioritiesAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import CasePriorityFilterValueField from './case-priority-filter-value-field.vue';
import CasePriorityFilterValuePreview from './case-priority-filter-value-preview.vue';

class CasePriorityFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.CasePriority;
	valueInputComponent = CasePriorityFilterValueField;
	valuePreviewComponent = CasePriorityFilterValuePreview;

	searchRecords = gateFilterSearch(
		WtObject.Priorities,
		CasePrioritiesAPI.getLookup,
	);
}

export const createCasePriorityFilterConfig = (
	params?: FilterConfigBaseParams,
) => new CasePriorityFilterConfig(params);
