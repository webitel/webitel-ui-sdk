import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreateRelatedCaseParams, ListRelatedCasesParams, LocateRelatedCaseParams, UpdateRelatedCase2Body, UpdateRelatedCase2Params, UpdateRelatedCaseBody, UpdateRelatedCaseParams, WebitelCasesCreateInputRelatedCase, WebitelCasesRelatedCase, WebitelCasesRelatedCaseList } from '.././_models';
export declare const // --- title start
getRelatedCases: () => {
    updateRelatedCase2: <TData = AxiosResponse<WebitelCasesRelatedCase, any>>(etag: string, updateRelatedCase2Body: UpdateRelatedCase2Body, params?: UpdateRelatedCase2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updateRelatedCase: <TData = AxiosResponse<WebitelCasesRelatedCase, any>>(etag: string, updateRelatedCaseBody: UpdateRelatedCaseBody, params?: UpdateRelatedCaseParams, options?: AxiosRequestConfig) => Promise<TData>;
    listRelatedCases: <TData = AxiosResponse<WebitelCasesRelatedCaseList, any>>(primaryCaseEtag: string, params?: ListRelatedCasesParams, options?: AxiosRequestConfig) => Promise<TData>;
    createRelatedCase: <TData = AxiosResponse<WebitelCasesRelatedCase, any>>(primaryCaseEtag: string, webitelCasesCreateInputRelatedCase: WebitelCasesCreateInputRelatedCase, params?: CreateRelatedCaseParams, options?: AxiosRequestConfig) => Promise<TData>;
    deleteRelatedCase: <TData = AxiosResponse<WebitelCasesRelatedCase, any>>(primaryCaseEtag: string, etag: string, options?: AxiosRequestConfig) => Promise<TData>;
    locateRelatedCase: <TData = AxiosResponse<WebitelCasesRelatedCase, any>>(primaryCaseEtag: string, etag: string, params?: LocateRelatedCaseParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type UpdateRelatedCase2Result = AxiosResponse<WebitelCasesRelatedCase>;
export type UpdateRelatedCaseResult = AxiosResponse<WebitelCasesRelatedCase>;
export type ListRelatedCasesResult = AxiosResponse<WebitelCasesRelatedCaseList>;
export type CreateRelatedCaseResult = AxiosResponse<WebitelCasesRelatedCase>;
export type DeleteRelatedCaseResult = AxiosResponse<WebitelCasesRelatedCase>;
export type LocateRelatedCaseResult = AxiosResponse<WebitelCasesRelatedCase>;
