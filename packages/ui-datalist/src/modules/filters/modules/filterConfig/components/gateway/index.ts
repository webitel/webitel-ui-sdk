import { GatewaysAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import {
	type FilterConfigBaseParams,
	type FilterConfigSearchRequestParams,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { gateFilterSearch } from '../../composables/useFilterReadAccess';
import { FilterOption } from '../../enums/FilterOption';
import GatewayFilterValueField from './gateway-filter-value-field.vue';
import GatewayFilterValuePreview from './gateway-filter-value-preview.vue';

class GatewayFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.Gateway;
	valueInputComponent = GatewayFilterValueField;
	valuePreviewComponent = GatewayFilterValuePreview;

	searchRecords = gateFilterSearch(
		WtObject.Gateway,
		(params: FilterConfigSearchRequestParams) =>
			params.search
				? GatewaysAPI.getLookup({
						name: params.search,
					})
				: GatewaysAPI.getLookup(params),
	);
}

export const createGatewayFilterConfig = (params?: FilterConfigBaseParams) =>
	new GatewayFilterConfig(params);
