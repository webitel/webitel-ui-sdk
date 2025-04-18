import { contacts as ContactsAPI } from '@webitel/ui-sdk/api/clients/index';

import { WtSysTypeFilterConfig } from '../../classes/FilterConfig';
import { FilterOption } from '../../enums/FilterOption';
import CaseAssigneeFilterValueField from './case-assignee-filter-value-field.vue';
import CaseAssigneeFilterValuePreview from './case-assignee-filter-value-preview.vue';

export class CaseAssigneeFilterConfig extends WtSysTypeFilterConfig {
  readonly name = FilterOption.CaseAssignee;
  valueInputComponent = CaseAssigneeFilterValueField;
  valuePreviewComponent = CaseAssigneeFilterValuePreview;

  searchRecords(params, { filterValue }) {
    return ContactsAPI.getLookup({
      ...params,
      id: filterValue.list,
    });
  }
}

export const makeCaseAssigneeFilterConfig = () =>
  new CaseAssigneeFilterConfig();
