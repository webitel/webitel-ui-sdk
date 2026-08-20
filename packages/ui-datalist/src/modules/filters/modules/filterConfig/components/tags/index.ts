import { QueuesAPI } from '@webitel/api-services/api';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { FilterOption } from '../../enums/FilterOption';
import TagsFilterValueField from './tags-filter-value-field.vue';
import TagsFilterValuePreview from './tags-filter-value-preview.vue';

class QueueTagsFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.QueueTags;
	valueInputComponent = TagsFilterValueField;
	valuePreviewComponent = TagsFilterValuePreview;

	searchRecords(params: object): Promise<{
		items: unknown[];
		next?: boolean;
	}> {
		return QueuesAPI.getQueuesTags(params);
	}
}

export const createQueueTagsFilterConfig = (params?: FilterConfigBaseParams) =>
	new QueueTagsFilterConfig(params);
