import { SLAConditionsAPI, SlasAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import { gateFilterSearch } from '../../composables/useFilterReadAccess';

export const slasConditionsSearchMethod = gateFilterSearch(
	WtObject.Slas,
	SLAConditionsAPI.getLookup,
);
export const slasSearchMethod = gateFilterSearch(
	WtObject.Slas,
	SlasAPI.getLookup,
);
