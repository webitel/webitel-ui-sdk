import { labels as contactLabels } from '@webitel/ui-sdk/api/clients/index';

import { WtSysTypeFilterConfig } from '../../classes/FilterConfig';
import { FilterOption } from '../../enums/FilterOption';
import ContactLabelFilterValueField from './contact-label-filter-value-field.vue';
import ContactLabelFilterValuePreview from './contact-label-filter-value-preview.vue';

class ContactLabelFilterConfig extends WtSysTypeFilterConfig {
  readonly name = FilterOption.ContactLabel;
  valueInputComponent = ContactLabelFilterValueField;
  valuePreviewComponent = ContactLabelFilterValuePreview;

  searchRecords(
    params: object,
    { filterValue } = {},
  ): Promise<{ items: unknown[]; next?: boolean }> {
    if (params.filterValue) return filterValue;

    return contactLabels.getLookup(params);
  }
}

export const createContactLabelFilterConfig = () =>
  new ContactLabelFilterConfig();
