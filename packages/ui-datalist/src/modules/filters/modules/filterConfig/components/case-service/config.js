import { ServiceCatalogsAPI, ServicesAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import { gateFilterSearch } from '../../composables/useFilterReadAccess';

export const searchMethod = gateFilterSearch(
	WtObject.ServiceCatalog,
	ServiceCatalogsAPI.getList,
);
export const servicesSearchMethod = gateFilterSearch(
	WtObject.ServiceCatalog,
	ServicesAPI.getLookup,
);
