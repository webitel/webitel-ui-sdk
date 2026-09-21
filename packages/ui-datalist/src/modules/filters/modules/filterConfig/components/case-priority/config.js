import { CasePrioritiesAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import { gateFilterSearch } from '../../composables/useFilterReadAccess';

export const searchMethod = gateFilterSearch(
	WtObject.Priorities,
	CasePrioritiesAPI.getLookup,
);
