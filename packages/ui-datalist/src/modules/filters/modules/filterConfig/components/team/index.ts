import TeamsAPI from '@webitel/ui-sdk/api/clients/teams/teams';

import { WtSysTypeFilterConfig } from '../../classes/FilterConfig';
import { FilterOption } from '../../enums/FilterOption';
import TeamFilterValueField from './team-filter-value-field.vue';
import TeamFilterValuePreview from './team-filter-value-preview.vue';

class TeamFilterConfig extends WtSysTypeFilterConfig {
  readonly name = FilterOption.Team;
  valueInputComponent = TeamFilterValueField;
  valuePreviewComponent = TeamFilterValuePreview;

  searchRecords(
    params: object
  ): Promise<{ items: unknown[]; next?: boolean }> {
    return TeamsAPI.getLookup(params);
  }
}

export const createTeamFilterConfig = (params) =>
  new TeamFilterConfig(params);
