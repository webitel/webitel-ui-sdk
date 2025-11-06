import { SkillsAPI } from '@webitel/api-services/api';

import { WtSysTypeFilterConfig } from '../../classes/FilterConfig';
import { FilterOption } from '../../enums/FilterOption';
import SkillFilterValueField from './skill-filter-value-field.vue';
import SkillFilterValuePreview from './skill-filter-value-preview.vue';

class SkillFilterConfig extends WtSysTypeFilterConfig {
  readonly name = FilterOption.Skill;
  valueInputComponent = SkillFilterValueField;
  valuePreviewComponent = SkillFilterValuePreview;

  searchRecords(
    params: object
  ): Promise<{ items: unknown[]; next?: boolean }> {
    return SkillsAPI.getLookup(params);
  }
}

export const createSkillFilterConfig = (params) =>
  new SkillFilterConfig(params);
