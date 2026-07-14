import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { EngineSearchSchemaVersionResponse, SearchSchemaVersionParams } from '../_models';
export declare const // --- title start
getSchemaVersionService: (axiosInstance?: AxiosInstance) => {
    searchSchemaVersion: (schemaId: string, params?: SearchSchemaVersionParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineSearchSchemaVersionResponse>>;
};
export type SearchSchemaVersionResult = AxiosResponse<EngineSearchSchemaVersionResponse>;
