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

  // @author @Lera24
    // [WTEl-6410](https://webitel.atlassian.net/browse/WTEL-6410)
  //   For label preview component no need to call the API, so we return filterValue back to the searchRecords method and display it

    if (filterValue) return { items: filterValue }

    return contactLabels.getLookup(params);
  }
}

export const createContactLabelFilterConfig = (params) =>
  new ContactLabelFilterConfig(params);
