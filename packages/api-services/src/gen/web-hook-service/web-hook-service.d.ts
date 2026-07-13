import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { EngineCreateWebHookRequest, EngineListWebHook, EngineWebHook, EngineWebHookServicePatchWebHookBody, EngineWebHookServiceUpdateWebHookBody, SearchWebHookParams } from '../_models';
export declare const // --- title start
getWebHookService: (axiosInstance?: AxiosInstance) => {
    searchWebHook: (params?: SearchWebHookParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineListWebHook>>;
    createWebHook: (engineCreateWebHookRequest: EngineCreateWebHookRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineWebHook>>;
    deleteWebHook: (id: number, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineWebHook>>;
    readWebHook: (id: number, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineWebHook>>;
    patchWebHook: (id: number, engineWebHookServicePatchWebHookBody: EngineWebHookServicePatchWebHookBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineWebHook>>;
    updateWebHook: (id: number, engineWebHookServiceUpdateWebHookBody: EngineWebHookServiceUpdateWebHookBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineWebHook>>;
};
export type SearchWebHookResult = AxiosResponse<EngineListWebHook>;
export type CreateWebHookResult = AxiosResponse<EngineWebHook>;
export type DeleteWebHookResult = AxiosResponse<EngineWebHook>;
export type ReadWebHookResult = AxiosResponse<EngineWebHook>;
export type PatchWebHookResult = AxiosResponse<EngineWebHook>;
export type UpdateWebHookResult = AxiosResponse<EngineWebHook>;
