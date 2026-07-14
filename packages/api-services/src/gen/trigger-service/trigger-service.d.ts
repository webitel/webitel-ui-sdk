import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { EngineCreateTriggerRequest, EngineListTrigger, EngineListTriggerJob, EngineTrigger, EngineTriggerJob, EngineTriggerServiceCreateTriggerJobBody, EngineTriggerServicePatchTriggerBody, EngineTriggerServiceUpdateTriggerBody, SearchTriggerJobParams, SearchTriggerParams } from '../_models';
export declare const // --- title start
getTriggerService: (axiosInstance?: AxiosInstance) => {
    searchTrigger: (params?: SearchTriggerParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineListTrigger>>;
    createTrigger: (engineCreateTriggerRequest: EngineCreateTriggerRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineTrigger>>;
    deleteTrigger: (id: number, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineTrigger>>;
    readTrigger: (id: number, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineTrigger>>;
    patchTrigger: (id: number, engineTriggerServicePatchTriggerBody: EngineTriggerServicePatchTriggerBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineTrigger>>;
    updateTrigger: (id: number, engineTriggerServiceUpdateTriggerBody: EngineTriggerServiceUpdateTriggerBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineTrigger>>;
    searchTriggerJob: (triggerId: number, params?: SearchTriggerJobParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineListTriggerJob>>;
    createTriggerJob: (triggerId: number, engineTriggerServiceCreateTriggerJobBody: EngineTriggerServiceCreateTriggerJobBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineTriggerJob>>;
};
export type SearchTriggerResult = AxiosResponse<EngineListTrigger>;
export type CreateTriggerResult = AxiosResponse<EngineTrigger>;
export type DeleteTriggerResult = AxiosResponse<EngineTrigger>;
export type ReadTriggerResult = AxiosResponse<EngineTrigger>;
export type PatchTriggerResult = AxiosResponse<EngineTrigger>;
export type UpdateTriggerResult = AxiosResponse<EngineTrigger>;
export type SearchTriggerJobResult = AxiosResponse<EngineListTriggerJob>;
export type CreateTriggerJobResult = AxiosResponse<EngineTriggerJob>;
