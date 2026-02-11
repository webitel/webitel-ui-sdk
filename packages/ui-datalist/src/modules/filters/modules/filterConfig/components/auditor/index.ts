import { UsersAPI } from '@webitel/api-services/api';

import { WtSysTypeFilterConfig } from '../../classes/FilterConfig';
import { FilterOption } from '../../enums/FilterOption';
import AuditorFilterValueField from './auditor-filter-value-field.vue';
import AuditorFilterValuePreview from './auditor-filter-value-preview.vue';

class AuditorFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.Auditor;
	valueInputComponent = AuditorFilterValueField;
	valuePreviewComponent = AuditorFilterValuePreview;

	searchRecords(params: object): Promise<{
		items: unknown[];
		next?: boolean;
	}> {
		return UsersAPI.getLookup(params);
	}
}

export const createAuditorFilterConfig = (params) =>
	new AuditorFilterConfig(params);
