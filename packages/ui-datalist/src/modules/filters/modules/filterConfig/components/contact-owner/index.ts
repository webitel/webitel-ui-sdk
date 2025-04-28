import { users as UsersAPI } from '@webitel/ui-sdk/api/clients/index';

import { WtSysTypeFilterConfig } from '../../classes/FilterConfig';
import { FilterOption } from '../../enums/FilterOption';
import ContactOwnerFilterValueField from './contact-owner-filter-value-field.vue';
import ContactOwnerFilterValuePreview from './contact-owner-filter-value-preview.vue';

class ContactOwnerFilterConfig extends WtSysTypeFilterConfig {
  readonly name = FilterOption.ContactOwner;
  valueInputComponent = ContactOwnerFilterValueField;
  valuePreviewComponent = ContactOwnerFilterValuePreview;

  searchRecords(
    params: object
  ): Promise<{ items: unknown[]; next?: boolean }> {
    return UsersAPI.getLookup(params);
  }
}

export const createContactOwnerFilterConfig = (params) =>
  new ContactOwnerFilterConfig(params);
