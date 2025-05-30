import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreateSLAParams, ListSLAsParams, LocateSLAParams, UpdateSLA2Params, UpdateSLAParams, WebitelCasesInputSLA, WebitelCasesInputSLABody, WebitelCasesLocateSLAResponse, WebitelCasesSLA, WebitelCasesSLAList } from '.././_models';
export declare const // --- title start
getSlas: () => {
    listSLAs: <TData = AxiosResponse<WebitelCasesSLAList, any>>(params?: ListSLAsParams, options?: AxiosRequestConfig) => Promise<TData>;
    createSLA: <TData = AxiosResponse<WebitelCasesSLA, any>>(webitelCasesInputSLABody: WebitelCasesInputSLABody, params?: CreateSLAParams, options?: AxiosRequestConfig) => Promise<TData>;
    deleteSLA: <TData = AxiosResponse<WebitelCasesSLA, any>>(id: string, options?: AxiosRequestConfig) => Promise<TData>;
    locateSLA: <TData = AxiosResponse<WebitelCasesLocateSLAResponse, any>>(id: string, params?: LocateSLAParams, options?: AxiosRequestConfig) => Promise<TData>;
    updateSLA2: <TData = AxiosResponse<WebitelCasesSLA, any>>(id: string, webitelCasesInputSLA: WebitelCasesInputSLA, params?: UpdateSLA2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updateSLA: <TData = AxiosResponse<WebitelCasesSLA, any>>(id: string, webitelCasesInputSLA: WebitelCasesInputSLA, params?: UpdateSLAParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type ListSLAsResult = AxiosResponse<WebitelCasesSLAList>;
export type CreateSLAResult = AxiosResponse<WebitelCasesSLA>;
export type DeleteSLAResult = AxiosResponse<WebitelCasesSLA>;
export type LocateSLAResult = AxiosResponse<WebitelCasesLocateSLAResponse>;
export type UpdateSLA2Result = AxiosResponse<WebitelCasesSLA>;
export type UpdateSLAResult = AxiosResponse<WebitelCasesSLA>;
