import {
	CaseCloseReasonGroupsAPI,
	CaseCloseReasonsAPI,
} from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import { gateFilterSearch } from '../../composables/useFilterReadAccess';

export const caseCloseReasonsGroupsSearchMethod = gateFilterSearch(
	WtObject.CloseReasonGroup,
	CaseCloseReasonGroupsAPI.getLookup,
);
export const caseCloseReasonsSearchMethod = gateFilterSearch(
	WtObject.CloseReasonGroup,
	CaseCloseReasonsAPI.getLookup,
);
