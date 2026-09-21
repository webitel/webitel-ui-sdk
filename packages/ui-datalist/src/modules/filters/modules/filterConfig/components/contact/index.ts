import { ContactsAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import ContactFilterValueField from './contact-filter-value-field.vue';
import ContactFilterValuePreview from './contact-filter-value-preview.vue';

class ContactFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.Contact;
	valueInputComponent = ContactFilterValueField;
	valuePreviewComponent = ContactFilterValuePreview;

	searchRecords = gateFilterSearch(WtObject.Contact, ContactsAPI.getLookup);
}

export const createContactFilterConfig = (params?: FilterConfigBaseParams) =>
	new ContactFilterConfig(params);
