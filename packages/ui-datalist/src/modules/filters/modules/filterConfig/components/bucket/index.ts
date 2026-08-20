import { BucketsAPI } from '@webitel/api-services/api';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { FilterOption } from '../../enums/FilterOption';
import BucketFilterValueField from './bucket-filter-value-field.vue';
import BucketFilterValuePreview from './bucket-filter-value-preview.vue';

class BucketFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.Bucket;
	valueInputComponent = BucketFilterValueField;
	valuePreviewComponent = BucketFilterValuePreview;

	searchRecords(params: object): Promise<{
		items: unknown[];
		next?: boolean;
	}> {
		return BucketsAPI.getLookup(params);
	}
}

export const createBucketFilterConfig = (params?: FilterConfigBaseParams) =>
	new BucketFilterConfig(params);
