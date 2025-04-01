import CaseStatusConditionsAPI from '@webitel/ui-sdk/api/clients/caseStatusConditions/caseStatusConditions';
import CaseStatusesApi from '@webitel/ui-sdk/api/clients/caseStatuses/caseStatuses';

export const caseStatusesSearchMethod = CaseStatusesApi.getLookup;
export const caseStatusConditionsSearchMethod =
  CaseStatusConditionsAPI.getLookup;
export const localePath = '';
