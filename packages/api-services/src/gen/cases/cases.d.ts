import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreateCaseParams, DeleteCaseParams, ExportCases200, ExportCasesParams, LocateCaseParams, SearchCases2Params, SearchCasesParams, UpdateCase2Body, UpdateCase2Params, UpdateCaseBody, UpdateCaseParams, WebitelCasesCase, WebitelCasesCaseList, WebitelCasesInputCreateCase, WebitelCasesUpdateCaseResponse } from '../_models';
export declare const // --- title start
getCases: (axiosInstance?: AxiosInstance) => {
    searchCases: (params?: SearchCasesParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesCaseList>>;
    createCase: (webitelCasesInputCreateCase: WebitelCasesInputCreateCase, params?: CreateCaseParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesCase>>;
    exportCases: (params?: ExportCasesParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ExportCases200>>;
    deleteCase: (etag: string, params?: DeleteCaseParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesCase>>;
    locateCase: (etag: string, params?: LocateCaseParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesCase>>;
    updateCase2: (updateCase2Body: UpdateCase2Body, params?: UpdateCase2Params, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesUpdateCaseResponse>>;
    updateCase: (updateCaseBody: UpdateCaseBody, params?: UpdateCaseParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesUpdateCaseResponse>>;
    searchCases2: (contactId: string, params?: SearchCases2Params, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesCaseList>>;
};
export type SearchCasesResult = AxiosResponse<WebitelCasesCaseList>;
export type CreateCaseResult = AxiosResponse<WebitelCasesCase>;
export type ExportCasesResult = AxiosResponse<ExportCases200>;
export type DeleteCaseResult = AxiosResponse<WebitelCasesCase>;
export type LocateCaseResult = AxiosResponse<WebitelCasesCase>;
export type UpdateCase2Result = AxiosResponse<WebitelCasesUpdateCaseResponse>;
export type UpdateCaseResult = AxiosResponse<WebitelCasesUpdateCaseResponse>;
export type SearchCases2Result = AxiosResponse<WebitelCasesCaseList>;
