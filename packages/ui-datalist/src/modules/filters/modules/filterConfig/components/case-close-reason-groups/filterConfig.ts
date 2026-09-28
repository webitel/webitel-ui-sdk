import {
	CaseCloseReasonGroupsAPI,
	CaseCloseReasonsAPI,
} from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	type FilterConfigSearchRequestParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import CaseCloseReasonGroupsFilterValueField from './case-close-reason-groups-filter-value-field.vue';
import CaseCloseReasonGroupsFilterValuePreview from './case-close-reason-groups-filter-value-preview.vue';

class CaseCloseReasonGroupsFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.CaseCloseReasonGroups;
	valueInputComponent = CaseCloseReasonGroupsFilterValueField;
	valuePreviewComponent = CaseCloseReasonGroupsFilterValuePreview;

	searchGroups = gateFilterSearch(
		WtObject.CloseReasonGroup,
		CaseCloseReasonGroupsAPI.getLookup,
	);
	searchConditions = gateFilterSearch(
		WtObject.CloseReasonGroup,
		CaseCloseReasonsAPI.getLookup,
	);

	async searchRecords({ id: value, ...rest }: FilterConfigSearchRequestParams) {
		return this.searchConditions({
			parentId: value?.selection,
			id: value?.conditions,
			...rest,
		});
	}
}

export type { CaseCloseReasonGroupsFilterConfig };

export const createCaseCloseReasonGroupsFilterConfig = (
	params?: FilterConfigBaseParams,
) => new CaseCloseReasonGroupsFilterConfig(params);
