import { ChangelogsAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import ObjectFilterValueField from './object-filter-value-field.vue';
import ObjectFilterValuePreview from './object-filter-value-preview.vue';

class ObjectFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.Object;
	valueInputComponent = ObjectFilterValueField;
	valuePreviewComponent = ObjectFilterValuePreview;

	searchRecords = gateFilterSearch(
		WtObject.ChangeLog,
		(params: Record<string, unknown>) =>
			ChangelogsAPI.getObjectsList({
				...params,
				includeExisting: true,
			}),
	);
}

export const createObjectFilterConfig = (params?: FilterConfigBaseParams) =>
	new ObjectFilterConfig(params);
