import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { FtsSearchResponse, SearchParams } from '../_models';
export declare const // --- title start
getFtsservice: (axiosInstance?: AxiosInstance) => {
    search: (params?: SearchParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<FtsSearchResponse>>;
};
export type SearchResult = AxiosResponse<FtsSearchResponse>;
