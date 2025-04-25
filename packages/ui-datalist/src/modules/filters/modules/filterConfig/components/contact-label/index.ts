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
    const id =
      params.id?.list /* general logic from dynamic-filter-preview.vue*/ ||
      params.id /* wt-select options loadings */ ||
      filterValue?.list; /* newest and coolest, but not implemented on all filters 🥲 */

    return contactLabels.getLookup({
      ...params,
      id,
    });
  }
}

export const createContactLabelFilterConfig = () =>
  new ContactLabelFilterConfig();
