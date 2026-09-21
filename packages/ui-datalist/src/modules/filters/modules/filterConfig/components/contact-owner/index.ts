import { UsersAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import ContactOwnerFilterValueField from './contact-owner-filter-value-field.vue';
import ContactOwnerFilterValuePreview from './contact-owner-filter-value-preview.vue';

class ContactOwnerFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.ContactOwner;
	valueInputComponent = ContactOwnerFilterValueField;
	valuePreviewComponent = ContactOwnerFilterValuePreview;

	searchRecords = gateFilterSearch(WtObject.User, UsersAPI.getLookup);
}

export const createContactOwnerFilterConfig = (
	params?: FilterConfigBaseParams,
) => new ContactOwnerFilterConfig(params);
