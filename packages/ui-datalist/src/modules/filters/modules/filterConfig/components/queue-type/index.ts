import { WtSysTypeFilterConfig } from '../../classes/FilterConfig';
import { FilterOption } from '../../enums/FilterOption';
import QueueTypeFilterValuePreview from './queue-type-filter-value-preview.vue';
import QueueTypeFilterValueField from './queue-type-filter-value-field.vue';

class QueueTypeFilterConfig extends WtSysTypeFilterConfig {
  readonly name = FilterOption.QueueType;
  valueInputComponent = QueueTypeFilterValueField;
  valuePreviewComponent = QueueTypeFilterValuePreview;
  showNameFilter?: boolean;

  constructor(params: { showNameFilter?: boolean } = {}) {
    super(params);
    if ('showNameFilter' in params) {
      this.showNameFilter = params.showNameFilter;
    }
  }
}

export const createQueueTypeFilterConfig =
  (params) => new QueueTypeFilterConfig(params);

export interface IQueueTypeFilterConfig extends WtSysTypeFilterConfig {
  showNameFilter?: boolean;
}
