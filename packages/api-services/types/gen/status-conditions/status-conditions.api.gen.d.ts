import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreateStatusConditionParams, ListStatusConditionsParams, LocateStatusConditionParams, UpdateStatusCondition2Params, UpdateStatusConditionParams, WebitelCasesInputCreateStatusCondition, WebitelCasesInputStatusCondition, WebitelCasesLocateStatusConditionResponse, WebitelCasesStatusCondition, WebitelCasesStatusConditionList } from '.././_models';
export declare const // --- title start
getStatusConditions: () => {
    listStatusConditions: <TData = AxiosResponse<WebitelCasesStatusConditionList, any>>(statusId: string, params?: ListStatusConditionsParams, options?: AxiosRequestConfig) => Promise<TData>;
    createStatusCondition: <TData = AxiosResponse<WebitelCasesStatusCondition, any>>(statusId: string, webitelCasesInputCreateStatusCondition: WebitelCasesInputCreateStatusCondition, params?: CreateStatusConditionParams, options?: AxiosRequestConfig) => Promise<TData>;
    deleteStatusCondition: <TData = AxiosResponse<WebitelCasesStatusCondition, any>>(statusId: string, id: string, options?: AxiosRequestConfig) => Promise<TData>;
    locateStatusCondition: <TData = AxiosResponse<WebitelCasesLocateStatusConditionResponse, any>>(statusId: string, id: string, params?: LocateStatusConditionParams, options?: AxiosRequestConfig) => Promise<TData>;
    updateStatusCondition2: <TData = AxiosResponse<WebitelCasesStatusCondition, any>>(statusId: string, id: string, webitelCasesInputStatusCondition: WebitelCasesInputStatusCondition, params?: UpdateStatusCondition2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updateStatusCondition: <TData = AxiosResponse<WebitelCasesStatusCondition, any>>(statusId: string, id: string, webitelCasesInputStatusCondition: WebitelCasesInputStatusCondition, params?: UpdateStatusConditionParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type ListStatusConditionsResult = AxiosResponse<WebitelCasesStatusConditionList>;
export type CreateStatusConditionResult = AxiosResponse<WebitelCasesStatusCondition>;
export type DeleteStatusConditionResult = AxiosResponse<WebitelCasesStatusCondition>;
export type LocateStatusConditionResult = AxiosResponse<WebitelCasesLocateStatusConditionResponse>;
export type UpdateStatusCondition2Result = AxiosResponse<WebitelCasesStatusCondition>;
export type UpdateStatusConditionResult = AxiosResponse<WebitelCasesStatusCondition>;
