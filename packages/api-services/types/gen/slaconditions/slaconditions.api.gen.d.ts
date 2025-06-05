import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreateSLAConditionParams, ListSLAConditionsParams, LocateSLAConditionParams, UpdateSLACondition2Params, UpdateSLAConditionParams, WebitelCasesInputSLACondition, WebitelCasesLocateSLAConditionResponse, WebitelCasesSLACondition, WebitelCasesSLAConditionList } from '.././_models';
export declare const // --- title start
getSlaconditions: () => {
    createSLACondition: <TData = AxiosResponse<WebitelCasesSLACondition, any>>(slaId: string, webitelCasesInputSLACondition: WebitelCasesInputSLACondition, params?: CreateSLAConditionParams, options?: AxiosRequestConfig) => Promise<TData>;
    deleteSLACondition: <TData = AxiosResponse<WebitelCasesSLACondition, any>>(slaId: string, id: string, options?: AxiosRequestConfig) => Promise<TData>;
    locateSLACondition: <TData = AxiosResponse<WebitelCasesLocateSLAConditionResponse, any>>(slaId: string, id: string, params?: LocateSLAConditionParams, options?: AxiosRequestConfig) => Promise<TData>;
    updateSLACondition2: <TData = AxiosResponse<WebitelCasesSLACondition, any>>(slaId: string, id: string, webitelCasesInputSLACondition: WebitelCasesInputSLACondition, params?: UpdateSLACondition2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updateSLACondition: <TData = AxiosResponse<WebitelCasesSLACondition, any>>(slaId: string, id: string, webitelCasesInputSLACondition: WebitelCasesInputSLACondition, params?: UpdateSLAConditionParams, options?: AxiosRequestConfig) => Promise<TData>;
    listSLAConditions: <TData = AxiosResponse<WebitelCasesSLAConditionList, any>>(slaId: string, params?: ListSLAConditionsParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type CreateSLAConditionResult = AxiosResponse<WebitelCasesSLACondition>;
export type DeleteSLAConditionResult = AxiosResponse<WebitelCasesSLACondition>;
export type LocateSLAConditionResult = AxiosResponse<WebitelCasesLocateSLAConditionResponse>;
export type UpdateSLACondition2Result = AxiosResponse<WebitelCasesSLACondition>;
export type UpdateSLAConditionResult = AxiosResponse<WebitelCasesSLACondition>;
export type ListSLAConditionsResult = AxiosResponse<WebitelCasesSLAConditionList>;
