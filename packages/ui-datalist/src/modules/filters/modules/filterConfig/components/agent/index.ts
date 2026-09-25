import { AgentsAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import AgentFilterValueField from './agent-filter-value-field.vue';
import AgentFilterValuePreview from './agent-filter-value-preview.vue';

class AgentFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.Agent;
	valueInputComponent = AgentFilterValueField;
	valuePreviewComponent = AgentFilterValuePreview;

	searchRecords = gateFilterSearch(WtObject.Agent, AgentsAPI.getLookup);
}

export const createAgentFilterConfig = (params?: FilterConfigBaseParams) =>
	new AgentFilterConfig(params);
