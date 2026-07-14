import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreatePriorityParams, ListPrioritiesParams, LocatePriorityParams, UpdatePriority2Params, UpdatePriorityParams, WebitelCasesInputPriority, WebitelCasesInputPriorityBody, WebitelCasesLocatePriorityResponse, WebitelCasesPriority, WebitelCasesPriorityList } from '../_models';
export declare const // --- title start
getPriorities: (axiosInstance?: AxiosInstance) => {
    listPriorities: (params?: ListPrioritiesParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesPriorityList>>;
    createPriority: (webitelCasesInputPriorityBody: WebitelCasesInputPriorityBody, params?: CreatePriorityParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesPriority>>;
    deletePriority: (id: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesPriority>>;
    locatePriority: (id: string, params?: LocatePriorityParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesLocatePriorityResponse>>;
    updatePriority2: (id: string, webitelCasesInputPriority: WebitelCasesInputPriority, params?: UpdatePriority2Params, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesPriority>>;
    updatePriority: (id: string, webitelCasesInputPriority: WebitelCasesInputPriority, params?: UpdatePriorityParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesPriority>>;
};
export type ListPrioritiesResult = AxiosResponse<WebitelCasesPriorityList>;
export type CreatePriorityResult = AxiosResponse<WebitelCasesPriority>;
export type DeletePriorityResult = AxiosResponse<WebitelCasesPriority>;
export type LocatePriorityResult = AxiosResponse<WebitelCasesLocatePriorityResponse>;
export type UpdatePriority2Result = AxiosResponse<WebitelCasesPriority>;
export type UpdatePriorityResult = AxiosResponse<WebitelCasesPriority>;
