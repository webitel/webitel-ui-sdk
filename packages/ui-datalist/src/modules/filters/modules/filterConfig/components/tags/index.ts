import { QueuesAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { hasFilterReadAccess } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import TagsFilterValueField from './tags-filter-value-field.vue';
import TagsFilterValuePreview from './tags-filter-value-preview.vue';

class QueueTagsFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.QueueTags;
	valueInputComponent = TagsFilterValueField;
	valuePreviewComponent = TagsFilterValuePreview;

	async searchRecords(params: object): Promise<{
		items: unknown[];
		next?: boolean;
	}> {
		if (!hasFilterReadAccess(WtObject.Queue)) {
			return {
				items: [],
			};
		}

		return QueuesAPI.getQueuesTags(params);
	}
}

export const createQueueTagsFilterConfig = (params?: FilterConfigBaseParams) =>
	new QueueTagsFilterConfig(params);
