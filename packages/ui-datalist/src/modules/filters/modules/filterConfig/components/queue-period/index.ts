import { WtSysTypeFilterConfig } from '../../classes/FilterConfig';
import { FilterOption } from '../../enums/FilterOption';
import QueuePeriodFilterValuePreview from './queue-period-filter-value-preview.vue';
import QueuePeriodFilterValueField from './queue-period-filter-value-field.vue';

class QueuePeriodFilterConfig extends WtSysTypeFilterConfig {
  readonly name = FilterOption.QueuePeriod;
  valueInputComponent = QueuePeriodFilterValueField;
  valuePreviewComponent = QueuePeriodFilterValuePreview;
  showNameFilter?: boolean;

  constructor(params: { showNameFilter?: boolean } = {}) {
    super(params);
    if ('showNameFilter' in params) {
      this.showNameFilter = params.showNameFilter;
    }
  }
}

export const createQueuePeriodFilterConfig =
  (params) => new QueuePeriodFilterConfig(params);

export interface IQueuePeriodFilterConfig extends WtSysTypeFilterConfig {
  showNameFilter?: boolean;
}
