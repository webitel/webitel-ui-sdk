import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreateCloseReasonParams, ListCloseReasonsParams, LocateCloseReasonParams, UpdateCloseReason2Params, UpdateCloseReasonParams, WebitelCasesCloseReason, WebitelCasesCloseReasonList, WebitelCasesInputCloseReason, WebitelCasesLocateCloseReasonResponse } from '.././_models';
export declare const // --- title start
getCloseReasons: () => {
    listCloseReasons: <TData = AxiosResponse<WebitelCasesCloseReasonList, any>>(closeReasonGroupId: string, params?: ListCloseReasonsParams, options?: AxiosRequestConfig) => Promise<TData>;
    createCloseReason: <TData = AxiosResponse<WebitelCasesCloseReason, any>>(closeReasonGroupId: string, webitelCasesInputCloseReason: WebitelCasesInputCloseReason, params?: CreateCloseReasonParams, options?: AxiosRequestConfig) => Promise<TData>;
    deleteCloseReason: <TData = AxiosResponse<WebitelCasesCloseReason, any>>(closeReasonGroupId: string, id: string, options?: AxiosRequestConfig) => Promise<TData>;
    locateCloseReason: <TData = AxiosResponse<WebitelCasesLocateCloseReasonResponse, any>>(closeReasonGroupId: string, id: string, params?: LocateCloseReasonParams, options?: AxiosRequestConfig) => Promise<TData>;
    updateCloseReason2: <TData = AxiosResponse<WebitelCasesCloseReason, any>>(closeReasonGroupId: string, id: string, webitelCasesInputCloseReason: WebitelCasesInputCloseReason, params?: UpdateCloseReason2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updateCloseReason: <TData = AxiosResponse<WebitelCasesCloseReason, any>>(closeReasonGroupId: string, id: string, webitelCasesInputCloseReason: WebitelCasesInputCloseReason, params?: UpdateCloseReasonParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type ListCloseReasonsResult = AxiosResponse<WebitelCasesCloseReasonList>;
export type CreateCloseReasonResult = AxiosResponse<WebitelCasesCloseReason>;
export type DeleteCloseReasonResult = AxiosResponse<WebitelCasesCloseReason>;
export type LocateCloseReasonResult = AxiosResponse<WebitelCasesLocateCloseReasonResponse>;
export type UpdateCloseReason2Result = AxiosResponse<WebitelCasesCloseReason>;
export type UpdateCloseReasonResult = AxiosResponse<WebitelCasesCloseReason>;
