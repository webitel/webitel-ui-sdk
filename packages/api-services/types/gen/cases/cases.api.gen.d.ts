import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CasesCase, CasesCaseList, CasesInputCreateCase, CreateCaseParams, DeleteCaseParams, LocateCaseParams, SearchCases2Params, SearchCasesParams, UpdateCase2Body, UpdateCase2Params, UpdateCaseBody, UpdateCaseParams } from '.././_models';
export declare const // --- title start
getCases: () => {
    searchCases: <TData = AxiosResponse<CasesCaseList, any>>(params?: SearchCasesParams, options?: AxiosRequestConfig) => Promise<TData>;
    createCase: <TData = AxiosResponse<CasesCase, any>>(casesInputCreateCase: CasesInputCreateCase, params?: CreateCaseParams, options?: AxiosRequestConfig) => Promise<TData>;
    deleteCase: <TData = AxiosResponse<CasesCase, any>>(etag: string, params?: DeleteCaseParams, options?: AxiosRequestConfig) => Promise<TData>;
    locateCase: <TData = AxiosResponse<CasesCase, any>>(etag: string, params?: LocateCaseParams, options?: AxiosRequestConfig) => Promise<TData>;
    updateCase2: <TData = AxiosResponse<CasesCase, any>>(updateCase2Body: UpdateCase2Body, params?: UpdateCase2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updateCase: <TData = AxiosResponse<CasesCase, any>>(updateCaseBody: UpdateCaseBody, params?: UpdateCaseParams, options?: AxiosRequestConfig) => Promise<TData>;
    searchCases2: <TData = AxiosResponse<CasesCaseList, any>>(contactId: string, params?: SearchCases2Params, options?: AxiosRequestConfig) => Promise<TData>;
};
export type SearchCasesResult = AxiosResponse<CasesCaseList>;
export type CreateCaseResult = AxiosResponse<CasesCase>;
export type DeleteCaseResult = AxiosResponse<CasesCase>;
export type LocateCaseResult = AxiosResponse<CasesCase>;
export type UpdateCase2Result = AxiosResponse<CasesCase>;
export type UpdateCaseResult = AxiosResponse<CasesCase>;
export type SearchCases2Result = AxiosResponse<CasesCaseList>;
