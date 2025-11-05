import { AgentsAPI } from '@webitel/api-services/api';

import { WtSysTypeFilterConfig } from '../../classes/FilterConfig';
import { FilterOption } from '../../enums/FilterOption';
import SupervisorFilterValueField from './supervisor-filter-value-field.vue';
import SupervisorFilterValuePreview from './supervisor-filter-value-preview.vue';

class SupervisorFilterConfig extends WtSysTypeFilterConfig {
  readonly name = FilterOption.Supervisor;
  valueInputComponent = SupervisorFilterValueField;
  valuePreviewComponent = SupervisorFilterValuePreview;

  searchRecords(
    params: object
  ): Promise<{ items: unknown[]; next?: boolean }> {
    return AgentsAPI.getSupervisorOptions(params);
  }
}

export const createSupervisorFilterConfig = (params) =>
  new SupervisorFilterConfig(params);
