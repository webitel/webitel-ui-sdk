import StatusesApi from '../../../../../../../api/clients/caseStatus/caseStatus.js';
import StatusConditionsAPI from '../../../../../../../api/clients/caseStatusConditions/caseStatusConditions.js';

export const statusesSearchMethod = StatusesApi.getLookup;
export const statusesConditionsSearchMethod = StatusConditionsAPI.getLookup;
export const localePath = '';
