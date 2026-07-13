import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { AccessStoreToggleDefaultAccessBody, ApiGrantAccessRequestV1, ApiListAccessResponseV1, ApiToggleDefaultAccessResponse, ApiUpdateAccessResponseV1, ListDefaultAccessParams, ListObjectAccessParams } from '../_models';
export declare const // --- title start
getAccessStore: (axiosInstance?: AxiosInstance) => {
    listDefaultAccess: (params?: ListDefaultAccessParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiListAccessResponseV1>>;
    toggleDefaultAccess: (grantor: string, accessStoreToggleDefaultAccessBody: AccessStoreToggleDefaultAccessBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiToggleDefaultAccessResponse>>;
    listObjectAccess: (params?: ListObjectAccessParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiListAccessResponseV1>>;
    toggleObjectAccess: (apiGrantAccessRequestV1: ApiGrantAccessRequestV1[], options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiUpdateAccessResponseV1>>;
};
export type ListDefaultAccessResult = AxiosResponse<ApiListAccessResponseV1>;
export type ToggleDefaultAccessResult = AxiosResponse<ApiToggleDefaultAccessResponse>;
export type ListObjectAccessResult = AxiosResponse<ApiListAccessResponseV1>;
export type ToggleObjectAccessResult = AxiosResponse<ApiUpdateAccessResponseV1>;
