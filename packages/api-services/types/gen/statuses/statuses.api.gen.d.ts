import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CasesInputStatus, CasesInputStatusBody, CasesLocateStatusResponse, CasesStatusList, CreateStatusParams, ListStatusesParams, LocateStatusParams, UpdateStatus2Params, UpdateStatusParams, WebitelcasesStatus } from '.././_models';
export declare const // --- title start
getStatuses: () => {
    listStatuses: <TData = AxiosResponse<CasesStatusList, any>>(params?: ListStatusesParams, options?: AxiosRequestConfig) => Promise<TData>;
    createStatus: <TData = AxiosResponse<WebitelcasesStatus, any>>(casesInputStatusBody: CasesInputStatusBody, params?: CreateStatusParams, options?: AxiosRequestConfig) => Promise<TData>;
    deleteStatus: <TData = AxiosResponse<WebitelcasesStatus, any>>(id: string, options?: AxiosRequestConfig) => Promise<TData>;
    locateStatus: <TData = AxiosResponse<CasesLocateStatusResponse, any>>(id: string, params?: LocateStatusParams, options?: AxiosRequestConfig) => Promise<TData>;
    updateStatus2: <TData = AxiosResponse<WebitelcasesStatus, any>>(id: string, casesInputStatus: CasesInputStatus, params?: UpdateStatus2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updateStatus: <TData = AxiosResponse<WebitelcasesStatus, any>>(id: string, casesInputStatus: CasesInputStatus, params?: UpdateStatusParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type ListStatusesResult = AxiosResponse<CasesStatusList>;
export type CreateStatusResult = AxiosResponse<WebitelcasesStatus>;
export type DeleteStatusResult = AxiosResponse<WebitelcasesStatus>;
export type LocateStatusResult = AxiosResponse<CasesLocateStatusResponse>;
export type UpdateStatus2Result = AxiosResponse<WebitelcasesStatus>;
export type UpdateStatusResult = AxiosResponse<WebitelcasesStatus>;
