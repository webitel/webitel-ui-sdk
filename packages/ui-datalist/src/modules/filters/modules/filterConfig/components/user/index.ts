import { UsersAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import UserFilterValueField from './user-filter-value-field.vue';
import UserFilterValuePreview from './user-filter-value-preview.vue';

class UserFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.User;
	valueInputComponent = UserFilterValueField;
	valuePreviewComponent = UserFilterValuePreview;

	searchRecords = gateFilterSearch(WtObject.User, UsersAPI.getLookup);
}

export const createUserFilterConfig = (params?: FilterConfigBaseParams) =>
	new UserFilterConfig(params);
