import { SLAConditionsAPI, SlasAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	type FilterConfigSearchRequestParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import CaseSlaConditionFilterValueField from './case-sla-condition-filter-value-field.vue';
import CaseSlaConditionFilterValuePreview from './case-sla-condition-filter-value-preview.vue';

class CaseSlaConditionFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.CaseSlaCondition;
	valueInputComponent = CaseSlaConditionFilterValueField;
	valuePreviewComponent = CaseSlaConditionFilterValuePreview;

	searchSlas = gateFilterSearch(WtObject.Slas, SlasAPI.getLookup);
	searchConditions = gateFilterSearch(
		WtObject.Slas,
		SLAConditionsAPI.getLookup,
	);

	async searchRecords({ id: value, ...rest }: FilterConfigSearchRequestParams) {
		return this.searchConditions({
			parentId: value?.selection,
			id: value?.conditions,
			...rest,
		});
	}
}

export type { CaseSlaConditionFilterConfig };

export const createCaseSlaConditionFilterConfig = (
	params?: FilterConfigBaseParams,
) => new CaseSlaConditionFilterConfig(params);
