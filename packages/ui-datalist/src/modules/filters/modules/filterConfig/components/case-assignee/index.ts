import { contacts as ContactsAPI } from '@webitel/ui-sdk/api/clients/index';

import { WtSysTypeFilterConfig } from '../../classes/FilterConfig';
import { FilterOption } from '../../enums/FilterOption';
import CaseAssigneeFilterValueField from './case-assignee-filter-value-field.vue';
import CaseAssigneeFilterValuePreview from './case-assignee-filter-value-preview.vue';

export class CaseAssigneeFilterConfig extends WtSysTypeFilterConfig {
  readonly name = FilterOption.CaseAssignee;
  valueInputComponent = CaseAssigneeFilterValueField;
  valuePreviewComponent = CaseAssigneeFilterValuePreview;

  searchRecords(
    params: object,
    { filterValue } = {},
  ): Promise<{ items: unknown[]; next?: boolean }> {
    const id = params.id?.list || params.id || filterValue?.list;

    return ContactsAPI.getLookup({
      ...params,
      id,
    });
  }
}

export const makeCaseAssigneeFilterConfig = () =>
  new CaseAssigneeFilterConfig();
