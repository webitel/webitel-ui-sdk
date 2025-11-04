import TeamsAPI from '@webitel/ui-sdk/api/clients/teams/teams';

import { IWtSysTypeFilterConfig,WtSysTypeFilterConfig } from '../../classes/FilterConfig';
import { FilterOption } from '../../enums/FilterOption';
import TeamFilterValueField from './team-filter-value-field.vue';
import TeamFilterValuePreview from './team-filter-value-preview.vue';

class TeamFilterConfig extends WtSysTypeFilterConfig {
  readonly name = FilterOption.Team;
  valueInputComponent = TeamFilterValueField;
  valuePreviewComponent = TeamFilterValuePreview;
  showNameFilter?: boolean;

  constructor(params: { showNameFilter?: boolean } = {}) {
    super(params);
    if ('showNameFilter' in params) {
      this.showNameFilter = params.showNameFilter;
    }
  }

  searchRecords(
    params: object
  ): Promise<{ items: unknown[]; next?: boolean }> {
    return TeamsAPI.getLookup(params);
  }
}

export const createTeamFilterConfig = (params) =>
  new TeamFilterConfig(params);

export interface ITeamFilterConfig extends IWtSysTypeFilterConfig {
  showNameFilter?: boolean;
}
