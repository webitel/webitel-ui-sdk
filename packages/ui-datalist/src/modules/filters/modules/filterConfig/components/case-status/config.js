import {
	CaseStatusConditionsAPI,
	CaseStatusesAPI as CaseStatusesApi,
} from '@webitel/api-services/api';

export const caseStatusesSearchMethod = CaseStatusesApi.getLookup;
export const caseStatusConditionsSearchMethod =
	CaseStatusConditionsAPI.getLookup;
