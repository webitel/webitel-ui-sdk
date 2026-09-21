import { BucketsAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import BucketFilterValueField from './bucket-filter-value-field.vue';
import BucketFilterValuePreview from './bucket-filter-value-preview.vue';

class BucketFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.Bucket;
	valueInputComponent = BucketFilterValueField;
	valuePreviewComponent = BucketFilterValuePreview;

	searchRecords = gateFilterSearch(WtObject.Bucket, BucketsAPI.getLookup);
}

export const createBucketFilterConfig = (params?: FilterConfigBaseParams) =>
	new BucketFilterConfig(params);
