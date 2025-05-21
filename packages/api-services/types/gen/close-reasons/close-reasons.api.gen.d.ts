import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CasesCloseReason, CasesCloseReasonList, CasesInputCloseReason, CasesLocateCloseReasonResponse, CreateCloseReasonParams, ListCloseReasonsParams, LocateCloseReasonParams, UpdateCloseReason2Params, UpdateCloseReasonParams } from '.././_models';
export declare const // --- title start
getCloseReasons: () => {
    listCloseReasons: <TData = AxiosResponse<CasesCloseReasonList, any>>(closeReasonGroupId: string, params?: ListCloseReasonsParams, options?: AxiosRequestConfig) => Promise<TData>;
    createCloseReason: <TData = AxiosResponse<CasesCloseReason, any>>(closeReasonGroupId: string, casesInputCloseReason: CasesInputCloseReason, params?: CreateCloseReasonParams, options?: AxiosRequestConfig) => Promise<TData>;
    deleteCloseReason: <TData = AxiosResponse<CasesCloseReason, any>>(closeReasonGroupId: string, id: string, options?: AxiosRequestConfig) => Promise<TData>;
    locateCloseReason: <TData = AxiosResponse<CasesLocateCloseReasonResponse, any>>(closeReasonGroupId: string, id: string, params?: LocateCloseReasonParams, options?: AxiosRequestConfig) => Promise<TData>;
    updateCloseReason2: <TData = AxiosResponse<CasesCloseReason, any>>(closeReasonGroupId: string, id: string, casesInputCloseReason: CasesInputCloseReason, params?: UpdateCloseReason2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updateCloseReason: <TData = AxiosResponse<CasesCloseReason, any>>(closeReasonGroupId: string, id: string, casesInputCloseReason: CasesInputCloseReason, params?: UpdateCloseReasonParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type ListCloseReasonsResult = AxiosResponse<CasesCloseReasonList>;
export type CreateCloseReasonResult = AxiosResponse<CasesCloseReason>;
export type DeleteCloseReasonResult = AxiosResponse<CasesCloseReason>;
export type LocateCloseReasonResult = AxiosResponse<CasesLocateCloseReasonResponse>;
export type UpdateCloseReason2Result = AxiosResponse<CasesCloseReason>;
export type UpdateCloseReasonResult = AxiosResponse<CasesCloseReason>;
