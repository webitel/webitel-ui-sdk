import { QueuesAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import TagsFilterValueField from './tags-filter-value-field.vue';
import TagsFilterValuePreview from './tags-filter-value-preview.vue';

class QueueTagsFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.QueueTags;
	valueInputComponent = TagsFilterValueField;
	valuePreviewComponent = TagsFilterValuePreview;

	searchRecords = gateFilterSearch(WtObject.Queue, QueuesAPI.getQueuesTags);
}

export const createQueueTagsFilterConfig = (params?: FilterConfigBaseParams) =>
	new QueueTagsFilterConfig(params);
