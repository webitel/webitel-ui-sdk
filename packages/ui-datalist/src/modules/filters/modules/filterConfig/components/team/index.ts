import { TeamsAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import TeamFilterValueField from './team-filter-value-field.vue';
import TeamFilterValuePreview from './team-filter-value-preview.vue';

class TeamFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.Team;
	valueInputComponent = TeamFilterValueField;
	valuePreviewComponent = TeamFilterValuePreview;

	searchRecords = gateFilterSearch(WtObject.Team, TeamsAPI.getLookup);
}

export const createTeamFilterConfig = (params?: FilterConfigBaseParams) =>
	new TeamFilterConfig(params);
