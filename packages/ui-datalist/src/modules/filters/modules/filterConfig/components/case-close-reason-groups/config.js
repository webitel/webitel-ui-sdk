import CaseCloseReasonGroupsAPI from '@webitel/ui-sdk/api/clients/caseCloseReasonGroups/caseCloseReasonGroups';
import CaseCloseReasonsAPI from '@webitel/ui-sdk/api/clients/caseCloseReasons/caseCloseReasons';

export const caseCloseReasonsGroupsSearchMethod =
  CaseCloseReasonGroupsAPI.getLookup;
export const caseCloseReasonsSearchMethod = CaseCloseReasonsAPI.getLookup;
