import CloseReasonGroupsAPI from '../../../../../../../api/clients/caseCloseReasonGroups/closeReasonGroups.js';
import ConditionsAPI from '../../../../../../../api/clients/caseCloseReasons/closeReasons.js';

export const closeReasonsSearchMethod = CloseReasonGroupsAPI.getLookup;
export const closeReasonsConditionsSearchMethod = ConditionsAPI.getLookup;
export const localePath = '';
