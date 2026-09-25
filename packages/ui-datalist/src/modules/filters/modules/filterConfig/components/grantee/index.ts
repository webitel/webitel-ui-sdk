import RolesAPI from '@webitel/ui-sdk/api/clients/roles/roles';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import GranteeFilterValueField from './grantee-filter-value-field.vue';
import GranteeFilterValuePreview from './grantee-filter-value-preview.vue';

class GranteeFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.Grantee;
	valueInputComponent = GranteeFilterValueField;
	valuePreviewComponent = GranteeFilterValuePreview;

	searchRecords = gateFilterSearch(WtObject.Role, RolesAPI.getLookup);
}

export const createGranteeFilterConfig = (params?: FilterConfigBaseParams) =>
	new GranteeFilterConfig(params);
