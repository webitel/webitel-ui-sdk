import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CasesInputPriority, CasesInputPriorityBody, CasesLocatePriorityResponse, CasesPriority, CasesPriorityList, CreatePriorityParams, ListPrioritiesParams, LocatePriorityParams, UpdatePriority2Params, UpdatePriorityParams } from '.././_models';
export declare const // --- title start
getPriorities: () => {
    listPriorities: <TData = AxiosResponse<CasesPriorityList, any>>(params?: ListPrioritiesParams, options?: AxiosRequestConfig) => Promise<TData>;
    createPriority: <TData = AxiosResponse<CasesPriority, any>>(casesInputPriorityBody: CasesInputPriorityBody, params?: CreatePriorityParams, options?: AxiosRequestConfig) => Promise<TData>;
    deletePriority: <TData = AxiosResponse<CasesPriority, any>>(id: string, options?: AxiosRequestConfig) => Promise<TData>;
    locatePriority: <TData = AxiosResponse<CasesLocatePriorityResponse, any>>(id: string, params?: LocatePriorityParams, options?: AxiosRequestConfig) => Promise<TData>;
    updatePriority2: <TData = AxiosResponse<CasesPriority, any>>(id: string, casesInputPriority: CasesInputPriority, params?: UpdatePriority2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updatePriority: <TData = AxiosResponse<CasesPriority, any>>(id: string, casesInputPriority: CasesInputPriority, params?: UpdatePriorityParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type ListPrioritiesResult = AxiosResponse<CasesPriorityList>;
export type CreatePriorityResult = AxiosResponse<CasesPriority>;
export type DeletePriorityResult = AxiosResponse<CasesPriority>;
export type LocatePriorityResult = AxiosResponse<CasesLocatePriorityResponse>;
export type UpdatePriority2Result = AxiosResponse<CasesPriority>;
export type UpdatePriorityResult = AxiosResponse<CasesPriority>;
