import { UsersAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import CaseAuthorFilterValueField from './case-author-filter-value-field.vue';
import CaseAuthorFilterValuePreview from './case-author-filter-value-preview.vue';

class CaseAuthorFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.CaseAuthor;
	valueInputComponent = CaseAuthorFilterValueField;
	valuePreviewComponent = CaseAuthorFilterValuePreview;

	searchRecords = gateFilterSearch(WtObject.User, UsersAPI.getLookup);
}

export const createCaseAuthorFilterConfig = (params?: FilterConfigBaseParams) =>
	new CaseAuthorFilterConfig(params);
