import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { EngineListQueueHook, EngineQueueHook, EngineQueueHookServiceCreateQueueHookBody, EngineQueueHookServicePatchQueueHookBody, EngineQueueHookServiceUpdateQueueHookBody, SearchQueueHookParams } from '../_models';
export declare const // --- title start
getQueueHookService: (axiosInstance?: AxiosInstance) => {
    searchQueueHook: (queueId: number, params?: SearchQueueHookParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineListQueueHook>>;
    createQueueHook: (queueId: number, engineQueueHookServiceCreateQueueHookBody: EngineQueueHookServiceCreateQueueHookBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineQueueHook>>;
    deleteQueueHook: (queueId: number, id: number, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineQueueHook>>;
    readQueueHook: (queueId: number, id: number, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineQueueHook>>;
    patchQueueHook: (queueId: number, id: number, engineQueueHookServicePatchQueueHookBody: EngineQueueHookServicePatchQueueHookBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineQueueHook>>;
    updateQueueHook: (queueId: number, id: number, engineQueueHookServiceUpdateQueueHookBody: EngineQueueHookServiceUpdateQueueHookBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineQueueHook>>;
};
export type SearchQueueHookResult = AxiosResponse<EngineListQueueHook>;
export type CreateQueueHookResult = AxiosResponse<EngineQueueHook>;
export type DeleteQueueHookResult = AxiosResponse<EngineQueueHook>;
export type ReadQueueHookResult = AxiosResponse<EngineQueueHook>;
export type PatchQueueHookResult = AxiosResponse<EngineQueueHook>;
export type UpdateQueueHookResult = AxiosResponse<EngineQueueHook>;
