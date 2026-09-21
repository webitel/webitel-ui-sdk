import {
	CaseStatusConditionsAPI,
	CaseStatusesAPI as CaseStatusesApi,
} from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import { gateFilterSearch } from '../../composables/useFilterReadAccess';

export const caseStatusesSearchMethod = gateFilterSearch(
	WtObject.Status,
	CaseStatusesApi.getLookup,
);
export const caseStatusConditionsSearchMethod = gateFilterSearch(
	WtObject.Status,
	CaseStatusConditionsAPI.getLookup,
);
