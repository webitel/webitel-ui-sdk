import { BucketsAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { hasFilterReadAccess } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import BucketFilterValueField from './bucket-filter-value-field.vue';
import BucketFilterValuePreview from './bucket-filter-value-preview.vue';

class BucketFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.Bucket;
	valueInputComponent = BucketFilterValueField;
	valuePreviewComponent = BucketFilterValuePreview;

	async searchRecords(params: object): Promise<{
		items: unknown[];
		next?: boolean;
	}> {
		if (!hasFilterReadAccess(WtObject.Bucket)) {
			return {
				items: [],
			};
		}

		return BucketsAPI.getLookup(params);
	}
}

export const createBucketFilterConfig = (params?: FilterConfigBaseParams) =>
	new BucketFilterConfig(params);
