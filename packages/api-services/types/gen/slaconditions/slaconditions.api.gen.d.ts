import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CasesInputSLACondition, CasesLocateSLAConditionResponse, CasesSLACondition, CasesSLAConditionList, CreateSLAConditionParams, ListSLAConditionsParams, LocateSLAConditionParams, UpdateSLACondition2Params, UpdateSLAConditionParams } from '.././_models';
export declare const // --- title start
getSlaconditions: () => {
    createSLACondition: <TData = AxiosResponse<CasesSLACondition, any>>(slaId: string, casesInputSLACondition: CasesInputSLACondition, params?: CreateSLAConditionParams, options?: AxiosRequestConfig) => Promise<TData>;
    deleteSLACondition: <TData = AxiosResponse<CasesSLACondition, any>>(slaId: string, id: string, options?: AxiosRequestConfig) => Promise<TData>;
    locateSLACondition: <TData = AxiosResponse<CasesLocateSLAConditionResponse, any>>(slaId: string, id: string, params?: LocateSLAConditionParams, options?: AxiosRequestConfig) => Promise<TData>;
    updateSLACondition2: <TData = AxiosResponse<CasesSLACondition, any>>(slaId: string, id: string, casesInputSLACondition: CasesInputSLACondition, params?: UpdateSLACondition2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updateSLACondition: <TData = AxiosResponse<CasesSLACondition, any>>(slaId: string, id: string, casesInputSLACondition: CasesInputSLACondition, params?: UpdateSLAConditionParams, options?: AxiosRequestConfig) => Promise<TData>;
    listSLAConditions: <TData = AxiosResponse<CasesSLAConditionList, any>>(slaId: string, params?: ListSLAConditionsParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type CreateSLAConditionResult = AxiosResponse<CasesSLACondition>;
export type DeleteSLAConditionResult = AxiosResponse<CasesSLACondition>;
export type LocateSLAConditionResult = AxiosResponse<CasesLocateSLAConditionResponse>;
export type UpdateSLACondition2Result = AxiosResponse<CasesSLACondition>;
export type UpdateSLAConditionResult = AxiosResponse<CasesSLACondition>;
export type ListSLAConditionsResult = AxiosResponse<CasesSLAConditionList>;
