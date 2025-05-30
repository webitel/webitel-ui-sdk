import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreatePriorityParams, ListPrioritiesParams, LocatePriorityParams, UpdatePriority2Params, UpdatePriorityParams, WebitelCasesInputPriority, WebitelCasesInputPriorityBody, WebitelCasesLocatePriorityResponse, WebitelCasesPriority, WebitelCasesPriorityList } from '.././_models';
export declare const // --- title start
getPriorities: () => {
    listPriorities: <TData = AxiosResponse<WebitelCasesPriorityList, any>>(params?: ListPrioritiesParams, options?: AxiosRequestConfig) => Promise<TData>;
    createPriority: <TData = AxiosResponse<WebitelCasesPriority, any>>(webitelCasesInputPriorityBody: WebitelCasesInputPriorityBody, params?: CreatePriorityParams, options?: AxiosRequestConfig) => Promise<TData>;
    deletePriority: <TData = AxiosResponse<WebitelCasesPriority, any>>(id: string, options?: AxiosRequestConfig) => Promise<TData>;
    locatePriority: <TData = AxiosResponse<WebitelCasesLocatePriorityResponse, any>>(id: string, params?: LocatePriorityParams, options?: AxiosRequestConfig) => Promise<TData>;
    updatePriority2: <TData = AxiosResponse<WebitelCasesPriority, any>>(id: string, webitelCasesInputPriority: WebitelCasesInputPriority, params?: UpdatePriority2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updatePriority: <TData = AxiosResponse<WebitelCasesPriority, any>>(id: string, webitelCasesInputPriority: WebitelCasesInputPriority, params?: UpdatePriorityParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type ListPrioritiesResult = AxiosResponse<WebitelCasesPriorityList>;
export type CreatePriorityResult = AxiosResponse<WebitelCasesPriority>;
export type DeletePriorityResult = AxiosResponse<WebitelCasesPriority>;
export type LocatePriorityResult = AxiosResponse<WebitelCasesLocatePriorityResponse>;
export type UpdatePriority2Result = AxiosResponse<WebitelCasesPriority>;
export type UpdatePriorityResult = AxiosResponse<WebitelCasesPriority>;
