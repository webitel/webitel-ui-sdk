import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreateSLAParams, ListSLAsParams, LocateSLAParams, UpdateSLA2Params, UpdateSLAParams, WebitelCasesInputSLA, WebitelCasesInputSLABody, WebitelCasesLocateSLAResponse, WebitelCasesSLA, WebitelCasesSLAList } from '../_models';
export declare const // --- title start
getSlas: (axiosInstance?: AxiosInstance) => {
    listSLAs: (params?: ListSLAsParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesSLAList>>;
    createSLA: (webitelCasesInputSLABody: WebitelCasesInputSLABody, params?: CreateSLAParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesSLA>>;
    deleteSLA: (id: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesSLA>>;
    locateSLA: (id: string, params?: LocateSLAParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesLocateSLAResponse>>;
    updateSLA2: (id: string, webitelCasesInputSLA: WebitelCasesInputSLA, params?: UpdateSLA2Params, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesSLA>>;
    updateSLA: (id: string, webitelCasesInputSLA: WebitelCasesInputSLA, params?: UpdateSLAParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesSLA>>;
};
export type ListSLAsResult = AxiosResponse<WebitelCasesSLAList>;
export type CreateSLAResult = AxiosResponse<WebitelCasesSLA>;
export type DeleteSLAResult = AxiosResponse<WebitelCasesSLA>;
export type LocateSLAResult = AxiosResponse<WebitelCasesLocateSLAResponse>;
export type UpdateSLA2Result = AxiosResponse<WebitelCasesSLA>;
export type UpdateSLAResult = AxiosResponse<WebitelCasesSLA>;
