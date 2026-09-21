import { UsersAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { hasFilterReadAccess } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import AuditorFilterValueField from './auditor-filter-value-field.vue';
import AuditorFilterValuePreview from './auditor-filter-value-preview.vue';

class AuditorFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.Auditor;
	valueInputComponent = AuditorFilterValueField;
	valuePreviewComponent = AuditorFilterValuePreview;

	async searchRecords(params: object): Promise<{
		items: unknown[];
		next?: boolean;
	}> {
		if (!hasFilterReadAccess(WtObject.User)) {
			return {
				items: [],
			};
		}

		return UsersAPI.getLookup(params);
	}
}

export const createAuditorFilterConfig = (params?: FilterConfigBaseParams) =>
	new AuditorFilterConfig(params);
