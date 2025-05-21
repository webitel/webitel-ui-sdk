import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CasesInputCreateStatusCondition, CasesInputStatusCondition, CasesLocateStatusConditionResponse, CasesStatusCondition, CasesStatusConditionList, CreateStatusConditionParams, ListStatusConditionsParams, LocateStatusConditionParams, UpdateStatusCondition2Params, UpdateStatusConditionParams } from '.././_models';
export declare const // --- title start
getStatusConditions: () => {
    listStatusConditions: <TData = AxiosResponse<CasesStatusConditionList, any>>(statusId: string, params?: ListStatusConditionsParams, options?: AxiosRequestConfig) => Promise<TData>;
    createStatusCondition: <TData = AxiosResponse<CasesStatusCondition, any>>(statusId: string, casesInputCreateStatusCondition: CasesInputCreateStatusCondition, params?: CreateStatusConditionParams, options?: AxiosRequestConfig) => Promise<TData>;
    deleteStatusCondition: <TData = AxiosResponse<CasesStatusCondition, any>>(statusId: string, id: string, options?: AxiosRequestConfig) => Promise<TData>;
    locateStatusCondition: <TData = AxiosResponse<CasesLocateStatusConditionResponse, any>>(statusId: string, id: string, params?: LocateStatusConditionParams, options?: AxiosRequestConfig) => Promise<TData>;
    updateStatusCondition2: <TData = AxiosResponse<CasesStatusCondition, any>>(statusId: string, id: string, casesInputStatusCondition: CasesInputStatusCondition, params?: UpdateStatusCondition2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updateStatusCondition: <TData = AxiosResponse<CasesStatusCondition, any>>(statusId: string, id: string, casesInputStatusCondition: CasesInputStatusCondition, params?: UpdateStatusConditionParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type ListStatusConditionsResult = AxiosResponse<CasesStatusConditionList>;
export type CreateStatusConditionResult = AxiosResponse<CasesStatusCondition>;
export type DeleteStatusConditionResult = AxiosResponse<CasesStatusCondition>;
export type LocateStatusConditionResult = AxiosResponse<CasesLocateStatusConditionResponse>;
export type UpdateStatusCondition2Result = AxiosResponse<CasesStatusCondition>;
export type UpdateStatusConditionResult = AxiosResponse<CasesStatusCondition>;
