import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreateSLAConditionParams, ListSLAConditionsParams, LocateSLAConditionParams, UpdateSLACondition2Params, UpdateSLAConditionParams, WebitelCasesInputSLACondition, WebitelCasesLocateSLAConditionResponse, WebitelCasesSLACondition, WebitelCasesSLAConditionList } from '../_models';
export declare const // --- title start
getSlaconditions: (axiosInstance?: AxiosInstance) => {
    createSLACondition: (slaId: string, webitelCasesInputSLACondition: WebitelCasesInputSLACondition, params?: CreateSLAConditionParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesSLACondition>>;
    deleteSLACondition: (slaId: string, id: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesSLACondition>>;
    locateSLACondition: (slaId: string, id: string, params?: LocateSLAConditionParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesLocateSLAConditionResponse>>;
    updateSLACondition2: (slaId: string, id: string, webitelCasesInputSLACondition: WebitelCasesInputSLACondition, params?: UpdateSLACondition2Params, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesSLACondition>>;
    updateSLACondition: (slaId: string, id: string, webitelCasesInputSLACondition: WebitelCasesInputSLACondition, params?: UpdateSLAConditionParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesSLACondition>>;
    listSLAConditions: (slaId: string, params?: ListSLAConditionsParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesSLAConditionList>>;
};
export type CreateSLAConditionResult = AxiosResponse<WebitelCasesSLACondition>;
export type DeleteSLAConditionResult = AxiosResponse<WebitelCasesSLACondition>;
export type LocateSLAConditionResult = AxiosResponse<WebitelCasesLocateSLAConditionResponse>;
export type UpdateSLACondition2Result = AxiosResponse<WebitelCasesSLACondition>;
export type UpdateSLAConditionResult = AxiosResponse<WebitelCasesSLACondition>;
export type ListSLAConditionsResult = AxiosResponse<WebitelCasesSLAConditionList>;
