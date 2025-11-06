import { queues as QueuesAPI } from '@webitel/ui-sdk/api/clients/index';

import { WtSysTypeFilterConfig } from '../../classes/FilterConfig';
import { FilterOption } from '../../enums/FilterOption';
import QueueFilterValueField from './queue-filter-value-field.vue';
import QueueFilterValuePreview from './queue-filter-value-preview.vue';

class QueueFilterConfig extends WtSysTypeFilterConfig {
  readonly name = FilterOption.Queue;
  valueInputComponent = QueueFilterValueField;
  valuePreviewComponent = QueueFilterValuePreview;

  searchRecords(
    params: object
  ): Promise<{ items: unknown[]; next?: boolean }> {
    return QueuesAPI.getLookup(params);
  }
}

export const createQueueFilterConfig = (params) =>
  new QueueFilterConfig(params);
