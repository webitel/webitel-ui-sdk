import CaseStatusesApi from '../../../../../../../api/clients/caseStatuses/caseStatuses.js';
import CaseStatusConditionsAPI from '../../../../../../../api/clients/caseStatusConditions/caseStatusConditions.js';

export const caseStatusesSearchMethod = CaseStatusesApi.getLookup;
export const caseStatusConditionsSearchMethod =
  CaseStatusConditionsAPI.getLookup;
export const localePath = '';
