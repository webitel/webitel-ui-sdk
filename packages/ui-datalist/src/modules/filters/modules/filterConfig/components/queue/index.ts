import { QueuesAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { hasFilterReadAccess } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import QueueFilterValueField from './queue-filter-value-field.vue';
import QueueFilterValuePreview from './queue-filter-value-preview.vue';

class QueueFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.Queue;
	valueInputComponent = QueueFilterValueField;
	valuePreviewComponent = QueueFilterValuePreview;

	async searchRecords(params: object): Promise<{
		items: unknown[];
		next?: boolean;
	}> {
		if (!hasFilterReadAccess(WtObject.Queue)) {
			return {
				items: [],
			};
		}

		return QueuesAPI.getLookup(params);
	}
}

export const createQueueFilterConfig = (params?: FilterConfigBaseParams) =>
	new QueueFilterConfig(params);
