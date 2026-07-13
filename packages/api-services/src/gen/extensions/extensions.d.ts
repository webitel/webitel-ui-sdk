import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { DataInputExtension, DataStructList, DeleteType2Params, DeleteTypeExtensionsParams, ProtoDataStruct, SearchTypeExtensionsParams } from '../_models';
export declare const // --- title start
getExtensions: (axiosInstance?: AxiosInstance) => {
    deleteType2: (params?: DeleteType2Params, options?: AxiosRequestConfig) => Promise<AxiosResponse<DataStructList>>;
    searchTypeExtensions: (params?: SearchTypeExtensionsParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<DataStructList>>;
    deleteTypeExtensions: (repo: string[], params?: DeleteTypeExtensionsParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<DataStructList>>;
    locateTypeExtensions: (repo: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<ProtoDataStruct>>;
    createTypeExtensions: (repo: string, dataInputExtension: DataInputExtension, options?: AxiosRequestConfig) => Promise<AxiosResponse<ProtoDataStruct>>;
    updateTypeExtensions: (repo: string, dataInputExtension: DataInputExtension, options?: AxiosRequestConfig) => Promise<AxiosResponse<ProtoDataStruct>>;
};
export type DeleteType2Result = AxiosResponse<DataStructList>;
export type SearchTypeExtensionsResult = AxiosResponse<DataStructList>;
export type DeleteTypeExtensionsResult = AxiosResponse<DataStructList>;
export type LocateTypeExtensionsResult = AxiosResponse<ProtoDataStruct>;
export type CreateTypeExtensionsResult = AxiosResponse<ProtoDataStruct>;
export type UpdateTypeExtensionsResult = AxiosResponse<ProtoDataStruct>;
