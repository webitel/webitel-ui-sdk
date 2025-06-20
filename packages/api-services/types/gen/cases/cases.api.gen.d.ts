import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreateCaseParams, DeleteCaseParams, LocateCaseParams, SearchCases2Params, SearchCasesParams, UpdateCase2Body, UpdateCase2Params, UpdateCaseBody, UpdateCaseParams, WebitelCasesCase, WebitelCasesCaseList, WebitelCasesInputCreateCase, WebitelCasesUpdateCaseResponse } from '.././_models';
export declare const // --- title start
getCases: () => {
    searchCases: <TData = AxiosResponse<WebitelCasesCaseList, any>>(params?: SearchCasesParams, options?: AxiosRequestConfig) => Promise<TData>;
    createCase: <TData = AxiosResponse<WebitelCasesCase, any>>(webitelCasesInputCreateCase: WebitelCasesInputCreateCase, params?: CreateCaseParams, options?: AxiosRequestConfig) => Promise<TData>;
    deleteCase: <TData = AxiosResponse<WebitelCasesCase, any>>(etag: string, params?: DeleteCaseParams, options?: AxiosRequestConfig) => Promise<TData>;
    locateCase: <TData = AxiosResponse<WebitelCasesCase, any>>(etag: string, params?: LocateCaseParams, options?: AxiosRequestConfig) => Promise<TData>;
    updateCase2: <TData = AxiosResponse<WebitelCasesUpdateCaseResponse, any>>(updateCase2Body: UpdateCase2Body, params?: UpdateCase2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updateCase: <TData = AxiosResponse<WebitelCasesUpdateCaseResponse, any>>(updateCaseBody: UpdateCaseBody, params?: UpdateCaseParams, options?: AxiosRequestConfig) => Promise<TData>;
    searchCases2: <TData = AxiosResponse<WebitelCasesCaseList, any>>(contactId: string, params?: SearchCases2Params, options?: AxiosRequestConfig) => Promise<TData>;
};
export type SearchCasesResult = AxiosResponse<WebitelCasesCaseList>;
export type CreateCaseResult = AxiosResponse<WebitelCasesCase>;
export type DeleteCaseResult = AxiosResponse<WebitelCasesCase>;
export type LocateCaseResult = AxiosResponse<WebitelCasesCase>;
export type UpdateCase2Result = AxiosResponse<WebitelCasesUpdateCaseResponse>;
export type UpdateCaseResult = AxiosResponse<WebitelCasesUpdateCaseResponse>;
export type SearchCases2Result = AxiosResponse<WebitelCasesCaseList>;
