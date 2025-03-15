import CaseStatusConditionsAPI from '../../../../../../../api/clients/caseStatusConditions/caseStatusConditions.js';
import CaseStatusesApi from '../../../../../../../api/clients/caseStatuses/caseStatuses.js';

export const caseStatusesSearchMethod = CaseStatusesApi.getLookup;
export const caseStatusConditionsSearchMethod =
  CaseStatusConditionsAPI.getLookup;
export const localePath = '';
