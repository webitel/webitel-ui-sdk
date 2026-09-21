import { GatewaysAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import { gateFilterSearch } from '../../composables/useFilterReadAccess';

export const searchMethod = gateFilterSearch(
	WtObject.Gateway,
	GatewaysAPI.getLookup,
);
