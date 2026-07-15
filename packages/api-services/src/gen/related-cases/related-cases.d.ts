import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreateRelatedCaseParams, ListRelatedCasesParams, LocateRelatedCaseParams, UpdateRelatedCase2Body, UpdateRelatedCase2Params, UpdateRelatedCaseBody, UpdateRelatedCaseParams, WebitelCasesCreateInputRelatedCase, WebitelCasesRelatedCase, WebitelCasesRelatedCaseList } from '../_models';
export declare const // --- title start
getRelatedCases: (axiosInstance?: AxiosInstance) => {
    updateRelatedCase2: (etag: string, updateRelatedCase2Body: UpdateRelatedCase2Body, params?: UpdateRelatedCase2Params, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesRelatedCase>>;
    updateRelatedCase: (etag: string, updateRelatedCaseBody: UpdateRelatedCaseBody, params?: UpdateRelatedCaseParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesRelatedCase>>;
    listRelatedCases: (primaryCaseEtag: string, params?: ListRelatedCasesParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesRelatedCaseList>>;
    createRelatedCase: (primaryCaseEtag: string, webitelCasesCreateInputRelatedCase: WebitelCasesCreateInputRelatedCase, params?: CreateRelatedCaseParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesRelatedCase>>;
    deleteRelatedCase: (primaryCaseEtag: string, etag: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesRelatedCase>>;
    locateRelatedCase: (primaryCaseEtag: string, etag: string, params?: LocateRelatedCaseParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesRelatedCase>>;
};
export type UpdateRelatedCase2Result = AxiosResponse<WebitelCasesRelatedCase>;
export type UpdateRelatedCaseResult = AxiosResponse<WebitelCasesRelatedCase>;
export type ListRelatedCasesResult = AxiosResponse<WebitelCasesRelatedCaseList>;
export type CreateRelatedCaseResult = AxiosResponse<WebitelCasesRelatedCase>;
export type DeleteRelatedCaseResult = AxiosResponse<WebitelCasesRelatedCase>;
export type LocateRelatedCaseResult = AxiosResponse<WebitelCasesRelatedCase>;
