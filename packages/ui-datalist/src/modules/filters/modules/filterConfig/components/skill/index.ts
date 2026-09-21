import { SkillsAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { hasFilterReadAccess } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import SkillFilterValueField from './skill-filter-value-field.vue';
import SkillFilterValuePreview from './skill-filter-value-preview.vue';

class SkillFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.Skill;
	valueInputComponent = SkillFilterValueField;
	valuePreviewComponent = SkillFilterValuePreview;

	async searchRecords(params: object): Promise<{
		items: unknown[];
		next?: boolean;
	}> {
		if (!hasFilterReadAccess(WtObject.Skill)) {
			return {
				items: [],
			};
		}

		return SkillsAPI.getLookup(params);
	}
}

export const createSkillFilterConfig = (params?: FilterConfigBaseParams) =>
	new SkillFilterConfig(params);
