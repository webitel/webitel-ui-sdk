import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CasesCreateInputRelatedCase, CasesRelatedCase, CasesRelatedCaseList, CreateRelatedCaseParams, ListRelatedCasesParams, LocateRelatedCaseParams, UpdateRelatedCase2Body, UpdateRelatedCase2Params, UpdateRelatedCaseBody, UpdateRelatedCaseParams } from '.././_models';
export declare const // --- title start
getRelatedCases: () => {
    updateRelatedCase2: <TData = AxiosResponse<CasesRelatedCase, any>>(etag: string, updateRelatedCase2Body: UpdateRelatedCase2Body, params?: UpdateRelatedCase2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updateRelatedCase: <TData = AxiosResponse<CasesRelatedCase, any>>(etag: string, updateRelatedCaseBody: UpdateRelatedCaseBody, params?: UpdateRelatedCaseParams, options?: AxiosRequestConfig) => Promise<TData>;
    listRelatedCases: <TData = AxiosResponse<CasesRelatedCaseList, any>>(primaryCaseEtag: string, params?: ListRelatedCasesParams, options?: AxiosRequestConfig) => Promise<TData>;
    createRelatedCase: <TData = AxiosResponse<CasesRelatedCase, any>>(primaryCaseEtag: string, casesCreateInputRelatedCase: CasesCreateInputRelatedCase, params?: CreateRelatedCaseParams, options?: AxiosRequestConfig) => Promise<TData>;
    deleteRelatedCase: <TData = AxiosResponse<CasesRelatedCase, any>>(primaryCaseEtag: string, etag: string, options?: AxiosRequestConfig) => Promise<TData>;
    locateRelatedCase: <TData = AxiosResponse<CasesRelatedCase, any>>(primaryCaseEtag: string, etag: string, params?: LocateRelatedCaseParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type UpdateRelatedCase2Result = AxiosResponse<CasesRelatedCase>;
export type UpdateRelatedCaseResult = AxiosResponse<CasesRelatedCase>;
export type ListRelatedCasesResult = AxiosResponse<CasesRelatedCaseList>;
export type CreateRelatedCaseResult = AxiosResponse<CasesRelatedCase>;
export type DeleteRelatedCaseResult = AxiosResponse<CasesRelatedCase>;
export type LocateRelatedCaseResult = AxiosResponse<CasesRelatedCase>;
