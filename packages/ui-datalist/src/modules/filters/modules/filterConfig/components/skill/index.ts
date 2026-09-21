import { SkillsAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import SkillFilterValueField from './skill-filter-value-field.vue';
import SkillFilterValuePreview from './skill-filter-value-preview.vue';

class SkillFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.Skill;
	valueInputComponent = SkillFilterValueField;
	valuePreviewComponent = SkillFilterValuePreview;

	searchRecords = gateFilterSearch(WtObject.Skill, SkillsAPI.getLookup);
}

export const createSkillFilterConfig = (params?: FilterConfigBaseParams) =>
	new SkillFilterConfig(params);
