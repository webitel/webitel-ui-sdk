import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	CreateStatusConditionParams,
	ListStatusConditionsParams,
	LocateStatusConditionParams,
	UpdateStatusCondition2Params,
	UpdateStatusConditionParams,
	WebitelCasesInputCreateStatusCondition,
	WebitelCasesInputStatusCondition,
	WebitelCasesLocateStatusConditionResponse,
	WebitelCasesStatusCondition,
	WebitelCasesStatusConditionList,
} from '../_models';
export declare const // --- title start
	getStatusConditions: (axiosInstance?: AxiosInstance) => {
		listStatusConditions: (
			statusId: string,
			params?: ListStatusConditionsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesStatusConditionList>>;
		createStatusCondition: (
			statusId: string,
			webitelCasesInputCreateStatusCondition: WebitelCasesInputCreateStatusCondition,
			params?: CreateStatusConditionParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesStatusCondition>>;
		deleteStatusCondition: (
			statusId: string,
			id: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesStatusCondition>>;
		locateStatusCondition: (
			statusId: string,
			id: string,
			params?: LocateStatusConditionParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesLocateStatusConditionResponse>>;
		updateStatusCondition2: (
			statusId: string,
			id: string,
			webitelCasesInputStatusCondition: WebitelCasesInputStatusCondition,
			params?: UpdateStatusCondition2Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesStatusCondition>>;
		updateStatusCondition: (
			statusId: string,
			id: string,
			webitelCasesInputStatusCondition: WebitelCasesInputStatusCondition,
			params?: UpdateStatusConditionParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesStatusCondition>>;
	};
export type ListStatusConditionsResult =
	AxiosResponse<WebitelCasesStatusConditionList>;
export type CreateStatusConditionResult =
	AxiosResponse<WebitelCasesStatusCondition>;
export type DeleteStatusConditionResult =
	AxiosResponse<WebitelCasesStatusCondition>;
export type LocateStatusConditionResult =
	AxiosResponse<WebitelCasesLocateStatusConditionResponse>;
export type UpdateStatusCondition2Result =
	AxiosResponse<WebitelCasesStatusCondition>;
export type UpdateStatusConditionResult =
	AxiosResponse<WebitelCasesStatusCondition>;
