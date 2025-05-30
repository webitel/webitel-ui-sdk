import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreateStatusParams, ListStatusesParams, LocateStatusParams, UpdateStatus2Params, UpdateStatusParams, WebitelCasesInputStatus, WebitelCasesInputStatusBody, WebitelCasesLocateStatusResponse, WebitelCasesStatus, WebitelCasesStatusList } from '.././_models';
export declare const // --- title start
getStatuses: () => {
    listStatuses: <TData = AxiosResponse<WebitelCasesStatusList, any>>(params?: ListStatusesParams, options?: AxiosRequestConfig) => Promise<TData>;
    createStatus: <TData = AxiosResponse<WebitelCasesStatus, any>>(webitelCasesInputStatusBody: WebitelCasesInputStatusBody, params?: CreateStatusParams, options?: AxiosRequestConfig) => Promise<TData>;
    deleteStatus: <TData = AxiosResponse<WebitelCasesStatus, any>>(id: string, options?: AxiosRequestConfig) => Promise<TData>;
    locateStatus: <TData = AxiosResponse<WebitelCasesLocateStatusResponse, any>>(id: string, params?: LocateStatusParams, options?: AxiosRequestConfig) => Promise<TData>;
    updateStatus2: <TData = AxiosResponse<WebitelCasesStatus, any>>(id: string, webitelCasesInputStatus: WebitelCasesInputStatus, params?: UpdateStatus2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updateStatus: <TData = AxiosResponse<WebitelCasesStatus, any>>(id: string, webitelCasesInputStatus: WebitelCasesInputStatus, params?: UpdateStatusParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type ListStatusesResult = AxiosResponse<WebitelCasesStatusList>;
export type CreateStatusResult = AxiosResponse<WebitelCasesStatus>;
export type DeleteStatusResult = AxiosResponse<WebitelCasesStatus>;
export type LocateStatusResult = AxiosResponse<WebitelCasesLocateStatusResponse>;
export type UpdateStatus2Result = AxiosResponse<WebitelCasesStatus>;
export type UpdateStatusResult = AxiosResponse<WebitelCasesStatus>;
