import { contactGroups } from '@webitel/ui-sdk/api/clients/index';

import { WtSysTypeFilterConfig, IWtSysTypeFilterConfig } from '../../classes/FilterConfig';
import { FilterOption } from '../../enums/FilterOption';
import ContactGroupFilterValueField from './contact-group-filter-value-field.vue';
import ContactGroupFilterValuePreview from './contact-group-filter-value-preview.vue';

class ContactGroupFilterConfig extends WtSysTypeFilterConfig {
  readonly name = FilterOption.ContactGroup;
  valueInputComponent = ContactGroupFilterValueField;
  valuePreviewComponent = ContactGroupFilterValuePreview;
  hideUnassigned?: boolean;
  noValidation?: boolean;
  hideLabel?: boolean;

  constructor(params: { hideUnassigned?: boolean, noValidation?: boolean, hideLabel?: boolean  } = {}) {
    super(params);
    if ('hideUnassigned' in params) {
      this.hideUnassigned = params.hideUnassigned;
    }
    if('noValidation' in params) {
      this.noValidation = params.noValidation;
    }
    if('hideLabel' in params) {
      this.hideLabel = params.hideLabel;
    }
  }

  searchRecords(
    params: object,
    { filterValue } = {},
  ): Promise<{ items: unknown[]; next?: boolean }> {
    const id = params.id?.list?.length ? params.id?.list : (params.id || filterValue?.list);
      // params.id?.list /* general logic from dynamic-filter-preview.vue*/
      // params.id /* wt-select options loadings */
      // filterValue?.list; /* newest and coolest, but not implemented on all filters 🥲 */

    return contactGroups.getLookup({
      ...params,
      id,
      type: 'STATIC',
    });
  }
}

export const createContactGroupFilterConfig = (params) =>
  new ContactGroupFilterConfig(params);

export interface IContactGroupFilterConfig extends IWtSysTypeFilterConfig {
  hideUnassigned?: boolean;
  noValidation?: boolean;
  hideLabel?: boolean;
}
