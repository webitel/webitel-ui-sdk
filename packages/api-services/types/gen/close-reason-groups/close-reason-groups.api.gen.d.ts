import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreateCloseReasonGroupParams, ListCloseReasonGroupsParams, LocateCloseReasonGroupParams, UpdateCloseReasonGroup2Params, UpdateCloseReasonGroupParams, WebitelCasesCloseReasonGroup, WebitelCasesCloseReasonGroupList, WebitelCasesInputCloseReasonGroup, WebitelCasesInputCloseReasonGroupBody, WebitelCasesLocateCloseReasonGroupResponse } from '.././_models';
export declare const // --- title start
getCloseReasonGroups: () => {
    listCloseReasonGroups: <TData = AxiosResponse<WebitelCasesCloseReasonGroupList, any>>(params?: ListCloseReasonGroupsParams, options?: AxiosRequestConfig) => Promise<TData>;
    createCloseReasonGroup: <TData = AxiosResponse<WebitelCasesCloseReasonGroup, any>>(webitelCasesInputCloseReasonGroupBody: WebitelCasesInputCloseReasonGroupBody, params?: CreateCloseReasonGroupParams, options?: AxiosRequestConfig) => Promise<TData>;
    deleteCloseReasonGroup: <TData = AxiosResponse<WebitelCasesCloseReasonGroup, any>>(id: string, options?: AxiosRequestConfig) => Promise<TData>;
    locateCloseReasonGroup: <TData = AxiosResponse<WebitelCasesLocateCloseReasonGroupResponse, any>>(id: string, params?: LocateCloseReasonGroupParams, options?: AxiosRequestConfig) => Promise<TData>;
    updateCloseReasonGroup2: <TData = AxiosResponse<WebitelCasesCloseReasonGroup, any>>(id: string, webitelCasesInputCloseReasonGroup: WebitelCasesInputCloseReasonGroup, params?: UpdateCloseReasonGroup2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updateCloseReasonGroup: <TData = AxiosResponse<WebitelCasesCloseReasonGroup, any>>(id: string, webitelCasesInputCloseReasonGroup: WebitelCasesInputCloseReasonGroup, params?: UpdateCloseReasonGroupParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type ListCloseReasonGroupsResult = AxiosResponse<WebitelCasesCloseReasonGroupList>;
export type CreateCloseReasonGroupResult = AxiosResponse<WebitelCasesCloseReasonGroup>;
export type DeleteCloseReasonGroupResult = AxiosResponse<WebitelCasesCloseReasonGroup>;
export type LocateCloseReasonGroupResult = AxiosResponse<WebitelCasesLocateCloseReasonGroupResponse>;
export type UpdateCloseReasonGroup2Result = AxiosResponse<WebitelCasesCloseReasonGroup>;
export type UpdateCloseReasonGroupResult = AxiosResponse<WebitelCasesCloseReasonGroup>;
