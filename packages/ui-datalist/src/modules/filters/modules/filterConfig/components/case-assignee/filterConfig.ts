import { contacts as ContactsAPI } from '@webitel/ui-sdk/api/clients/index';

import { WtSysTypeFilterConfig } from '../../classes/FilterConfig';
import { FilterOption } from '../../enums/FilterOption';
import CaseAssigneeFilterValueField from './case-assignee-filter-value-field.vue';
import CaseAssigneeFilterValuePreview from './case-assignee-filter-value-preview.vue';

class CaseAssigneeFilterConfig extends WtSysTypeFilterConfig {
  readonly name = FilterOption.CaseAssignee;
  valueInputComponent = CaseAssigneeFilterValueField;
  valuePreviewComponent = CaseAssigneeFilterValuePreview;

  searchRecords(
    params: object,
    { filterValue } = {},
  ): Promise<{ items: unknown[]; next?: boolean }> {
    const id =
      params.id?.list /* general logic from dynamic-filter-preview.vue*/ ||
      params.id /* wt-select options loadings */ ||
      filterValue?.list; /* newest and coolest, but not implemented on all filters 🥲 */

    return ContactsAPI.getLookup({
      ...params,
      id,
    });
  }
}

export type { CaseAssigneeFilterConfig };

export const createCaseAssigneeFilterConfig = (params) =>
  new CaseAssigneeFilterConfig(params);
