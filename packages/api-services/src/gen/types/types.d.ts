import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { DataStructList, ProtoDataStruct, SearchTypesParams } from '../_models';
export declare const // --- title start
getTypes: (axiosInstance?: AxiosInstance) => {
    searchTypes: (params?: SearchTypesParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<DataStructList>>;
    locate: (path: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<ProtoDataStruct>>;
};
export type SearchTypesResult = AxiosResponse<DataStructList>;
export type LocateResult = AxiosResponse<ProtoDataStruct>;
