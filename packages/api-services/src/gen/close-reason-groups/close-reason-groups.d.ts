import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreateCloseReasonGroupParams, ListCloseReasonGroupsParams, LocateCloseReasonGroupParams, UpdateCloseReasonGroup2Params, UpdateCloseReasonGroupParams, WebitelCasesCloseReasonGroup, WebitelCasesCloseReasonGroupList, WebitelCasesInputCloseReasonGroup, WebitelCasesInputCloseReasonGroupBody, WebitelCasesLocateCloseReasonGroupResponse } from '../_models';
export declare const // --- title start
getCloseReasonGroups: (axiosInstance?: AxiosInstance) => {
    listCloseReasonGroups: (params?: ListCloseReasonGroupsParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesCloseReasonGroupList>>;
    createCloseReasonGroup: (webitelCasesInputCloseReasonGroupBody: WebitelCasesInputCloseReasonGroupBody, params?: CreateCloseReasonGroupParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesCloseReasonGroup>>;
    deleteCloseReasonGroup: (id: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesCloseReasonGroup>>;
    locateCloseReasonGroup: (id: string, params?: LocateCloseReasonGroupParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesLocateCloseReasonGroupResponse>>;
    updateCloseReasonGroup2: (id: string, webitelCasesInputCloseReasonGroup: WebitelCasesInputCloseReasonGroup, params?: UpdateCloseReasonGroup2Params, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesCloseReasonGroup>>;
    updateCloseReasonGroup: (id: string, webitelCasesInputCloseReasonGroup: WebitelCasesInputCloseReasonGroup, params?: UpdateCloseReasonGroupParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesCloseReasonGroup>>;
};
export type ListCloseReasonGroupsResult = AxiosResponse<WebitelCasesCloseReasonGroupList>;
export type CreateCloseReasonGroupResult = AxiosResponse<WebitelCasesCloseReasonGroup>;
export type DeleteCloseReasonGroupResult = AxiosResponse<WebitelCasesCloseReasonGroup>;
export type LocateCloseReasonGroupResult = AxiosResponse<WebitelCasesLocateCloseReasonGroupResponse>;
export type UpdateCloseReasonGroup2Result = AxiosResponse<WebitelCasesCloseReasonGroup>;
export type UpdateCloseReasonGroupResult = AxiosResponse<WebitelCasesCloseReasonGroup>;
