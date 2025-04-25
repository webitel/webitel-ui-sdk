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
    params: object,
    { filterValue } = {},
  ): Promise<{ items: unknown[]; next?: boolean }> {
    const id =
      params.id?.list /* general logic from dynamic-filter-preview.vue*/ ||
      params.id /* wt-select options loadings */ ||
      filterValue?.list; /* newest and coolest, but not implemented on all filters 🥲 */

    return UsersAPI.getLookup({
      ...params,
      id,
    });
  }
}

export const createContactOwnerFilterConfig = () =>
  new ContactOwnerFilterConfig();
