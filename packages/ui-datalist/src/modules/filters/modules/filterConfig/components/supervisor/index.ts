import { AgentsAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import SupervisorFilterValueField from './supervisor-filter-value-field.vue';
import SupervisorFilterValuePreview from './supervisor-filter-value-preview.vue';

class SupervisorFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.Supervisor;
	valueInputComponent = SupervisorFilterValueField;
	valuePreviewComponent = SupervisorFilterValuePreview;

	searchRecords = gateFilterSearch(
		WtObject.Agent,
		AgentsAPI.getSupervisorOptions,
	);
}

export const createSupervisorFilterConfig = (params?: FilterConfigBaseParams) =>
	new SupervisorFilterConfig(params);
