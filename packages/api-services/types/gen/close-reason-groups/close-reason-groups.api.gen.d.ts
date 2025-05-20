import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CasesCloseReasonGroup, CasesCloseReasonGroupList, CasesInputCloseReasonGroup, CasesInputCloseReasonGroupBody, CasesLocateCloseReasonGroupResponse, CreateCloseReasonGroupParams, ListCloseReasonGroupsParams, LocateCloseReasonGroupParams, UpdateCloseReasonGroup2Params, UpdateCloseReasonGroupParams } from '.././_models';
export declare const // --- title start
getCloseReasonGroups: () => {
    listCloseReasonGroups: <TData = AxiosResponse<CasesCloseReasonGroupList, any>>(params?: ListCloseReasonGroupsParams, options?: AxiosRequestConfig) => Promise<TData>;
    createCloseReasonGroup: <TData = AxiosResponse<CasesCloseReasonGroup, any>>(casesInputCloseReasonGroupBody: CasesInputCloseReasonGroupBody, params?: CreateCloseReasonGroupParams, options?: AxiosRequestConfig) => Promise<TData>;
    deleteCloseReasonGroup: <TData = AxiosResponse<CasesCloseReasonGroup, any>>(id: string, options?: AxiosRequestConfig) => Promise<TData>;
    locateCloseReasonGroup: <TData = AxiosResponse<CasesLocateCloseReasonGroupResponse, any>>(id: string, params?: LocateCloseReasonGroupParams, options?: AxiosRequestConfig) => Promise<TData>;
    updateCloseReasonGroup2: <TData = AxiosResponse<CasesCloseReasonGroup, any>>(id: string, casesInputCloseReasonGroup: CasesInputCloseReasonGroup, params?: UpdateCloseReasonGroup2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updateCloseReasonGroup: <TData = AxiosResponse<CasesCloseReasonGroup, any>>(id: string, casesInputCloseReasonGroup: CasesInputCloseReasonGroup, params?: UpdateCloseReasonGroupParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type ListCloseReasonGroupsResult = AxiosResponse<CasesCloseReasonGroupList>;
export type CreateCloseReasonGroupResult = AxiosResponse<CasesCloseReasonGroup>;
export type DeleteCloseReasonGroupResult = AxiosResponse<CasesCloseReasonGroup>;
export type LocateCloseReasonGroupResult = AxiosResponse<CasesLocateCloseReasonGroupResponse>;
export type UpdateCloseReasonGroup2Result = AxiosResponse<CasesCloseReasonGroup>;
export type UpdateCloseReasonGroupResult = AxiosResponse<CasesCloseReasonGroup>;
