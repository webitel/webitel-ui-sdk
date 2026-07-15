import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { DeleteQueueParams, EngineCreateQueueRequest, EngineGetQueuesGlobalStateResponse, EngineListQueue, EngineListReportGeneral, EngineListTags, EngineQueue, EngineQueueServicePatchQueueBody, EngineQueueServiceUpdateQueueBody, EngineSetQueuesGlobalStateRequest, EngineSetQueuesGlobalStateResponse, GetQueuesGlobalStateParams, ReadQueueParams, SearchQueueParams, SearchQueueReportGeneralParams, SearchQueueTagsParams } from '../_models';
export declare const // --- title start
getQueueService: (axiosInstance?: AxiosInstance) => {
    searchQueue: (params?: SearchQueueParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineListQueue>>;
    createQueue: (engineCreateQueueRequest: EngineCreateQueueRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineQueue>>;
    searchQueueReportGeneral: (params?: SearchQueueReportGeneralParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineListReportGeneral>>;
    getQueuesGlobalState: (params?: GetQueuesGlobalStateParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineGetQueuesGlobalStateResponse>>;
    setQueuesGlobalState: (engineSetQueuesGlobalStateRequest: EngineSetQueuesGlobalStateRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineSetQueuesGlobalStateResponse>>;
    searchQueueTags: (params?: SearchQueueTagsParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineListTags>>;
    deleteQueue: (id: string, params?: DeleteQueueParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineQueue>>;
    readQueue: (id: string, params?: ReadQueueParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineQueue>>;
    patchQueue: (id: string, engineQueueServicePatchQueueBody: EngineQueueServicePatchQueueBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineQueue>>;
    updateQueue: (id: string, engineQueueServiceUpdateQueueBody: EngineQueueServiceUpdateQueueBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineQueue>>;
};
export type SearchQueueResult = AxiosResponse<EngineListQueue>;
export type CreateQueueResult = AxiosResponse<EngineQueue>;
export type SearchQueueReportGeneralResult = AxiosResponse<EngineListReportGeneral>;
export type GetQueuesGlobalStateResult = AxiosResponse<EngineGetQueuesGlobalStateResponse>;
export type SetQueuesGlobalStateResult = AxiosResponse<EngineSetQueuesGlobalStateResponse>;
export type SearchQueueTagsResult = AxiosResponse<EngineListTags>;
export type DeleteQueueResult = AxiosResponse<EngineQueue>;
export type ReadQueueResult = AxiosResponse<EngineQueue>;
export type PatchQueueResult = AxiosResponse<EngineQueue>;
export type UpdateQueueResult = AxiosResponse<EngineQueue>;
