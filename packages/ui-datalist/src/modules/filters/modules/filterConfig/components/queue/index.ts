import { QueuesAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import QueueFilterValueField from './queue-filter-value-field.vue';
import QueueFilterValuePreview from './queue-filter-value-preview.vue';

class QueueFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.Queue;
	valueInputComponent = QueueFilterValueField;
	valuePreviewComponent = QueueFilterValuePreview;

	searchRecords = gateFilterSearch(WtObject.Queue, QueuesAPI.getLookup);
}

export const createQueueFilterConfig = (params?: FilterConfigBaseParams) =>
	new QueueFilterConfig(params);
