import {
	CaseStatusConditionsAPI,
	CaseStatusesAPI as CaseStatusesApi,
} from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	type FilterConfigSearchRequestParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import CaseStatusFilterValueField from './case-status-filter-value-field.vue';
import CaseStatusFilterValuePreview from './case-status-filter-value-preview.vue';

class CaseStatusFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.CaseStatus;
	valueInputComponent = CaseStatusFilterValueField;
	valuePreviewComponent = CaseStatusFilterValuePreview;

	searchStatuses = gateFilterSearch(WtObject.Status, CaseStatusesApi.getLookup);
	searchConditions = gateFilterSearch(
		WtObject.Status,
		CaseStatusConditionsAPI.getLookup,
	);

	async searchRecords(params: FilterConfigSearchRequestParams) {
		const value = params.id;
		return this.searchConditions({
			parentId: value?.selection,
			id: value?.conditions,
		});
	}
}

export type { CaseStatusFilterConfig };

export const createCaseStatusFilterConfig = (params?: FilterConfigBaseParams) =>
	new CaseStatusFilterConfig(params);
