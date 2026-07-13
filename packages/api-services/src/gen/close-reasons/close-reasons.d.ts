import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreateCloseReasonParams, ListCloseReasonsParams, LocateCloseReasonParams, UpdateCloseReason2Params, UpdateCloseReasonParams, WebitelCasesCloseReason, WebitelCasesCloseReasonList, WebitelCasesInputCloseReason, WebitelCasesLocateCloseReasonResponse } from '../_models';
export declare const // --- title start
getCloseReasons: (axiosInstance?: AxiosInstance) => {
    listCloseReasons: (closeReasonGroupId: string, params?: ListCloseReasonsParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesCloseReasonList>>;
    createCloseReason: (closeReasonGroupId: string, webitelCasesInputCloseReason: WebitelCasesInputCloseReason, params?: CreateCloseReasonParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesCloseReason>>;
    deleteCloseReason: (closeReasonGroupId: string, id: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesCloseReason>>;
    locateCloseReason: (closeReasonGroupId: string, id: string, params?: LocateCloseReasonParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesLocateCloseReasonResponse>>;
    updateCloseReason2: (closeReasonGroupId: string, id: string, webitelCasesInputCloseReason: WebitelCasesInputCloseReason, params?: UpdateCloseReason2Params, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesCloseReason>>;
    updateCloseReason: (closeReasonGroupId: string, id: string, webitelCasesInputCloseReason: WebitelCasesInputCloseReason, params?: UpdateCloseReasonParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesCloseReason>>;
};
export type ListCloseReasonsResult = AxiosResponse<WebitelCasesCloseReasonList>;
export type CreateCloseReasonResult = AxiosResponse<WebitelCasesCloseReason>;
export type DeleteCloseReasonResult = AxiosResponse<WebitelCasesCloseReason>;
export type LocateCloseReasonResult = AxiosResponse<WebitelCasesLocateCloseReasonResponse>;
export type UpdateCloseReason2Result = AxiosResponse<WebitelCasesCloseReason>;
export type UpdateCloseReasonResult = AxiosResponse<WebitelCasesCloseReason>;
