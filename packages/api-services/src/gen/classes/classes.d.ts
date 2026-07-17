import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiReadClassResponse, ApiSearchClassesResponse, ApiUpdateClassResponse, ClassesUpdateClassBody, ReadClassParams, SearchClassesParams } from '../_models';
export declare const // --- title start
getClasses: (axiosInstance?: AxiosInstance) => {
    searchClasses: (params?: SearchClassesParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiSearchClassesResponse>>;
    updateClass2: (classesUpdateClassBody: ClassesUpdateClassBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiUpdateClassResponse>>;
    updateClass: (classesUpdateClassBody: ClassesUpdateClassBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiUpdateClassResponse>>;
    readClass: (id: string, params?: ReadClassParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiReadClassResponse>>;
};
export type SearchClassesResult = AxiosResponse<ApiSearchClassesResponse>;
export type UpdateClass2Result = AxiosResponse<ApiUpdateClassResponse>;
export type UpdateClassResult = AxiosResponse<ApiUpdateClassResponse>;
export type ReadClassResult = AxiosResponse<ApiReadClassResponse>;
