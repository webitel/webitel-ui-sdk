import { ServiceCatalogsAPI, ServicesAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import CaseServiceFilterValueField from './case-service-filter-value-field.vue';
import CaseServiceFilterValuePreview from './case-service-filter-value-preview.vue';

class CaseServiceFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.CaseService;
	valueInputComponent = CaseServiceFilterValueField;
	valuePreviewComponent = CaseServiceFilterValuePreview;

	searchCatalogs = gateFilterSearch(
		WtObject.ServiceCatalog,
		ServiceCatalogsAPI.getList,
	);

	searchRecords = gateFilterSearch(
		WtObject.ServiceCatalog,
		ServicesAPI.getLookup,
	);
}

export type { CaseServiceFilterConfig };

export const createCaseServiceFilterConfig = (
	params?: FilterConfigBaseParams,
) => new CaseServiceFilterConfig(params);
