import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { EngineChatPlan, EngineCreateChatPlanRequest, EngineListChatPlan, EngineRoutingChatPlanServicePatchChatPlanBody, EngineRoutingChatPlanServiceUpdateChatPlanBody, SearchChatPlanParams } from '../_models';
export declare const // --- title start
getRoutingChatPlanService: (axiosInstance?: AxiosInstance) => {
    searchChatPlan: (params?: SearchChatPlanParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineListChatPlan>>;
    createChatPlan: (engineCreateChatPlanRequest: EngineCreateChatPlanRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineChatPlan>>;
    deleteChatPlan: (id: number, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineChatPlan>>;
    readChatPlan: (id: number, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineChatPlan>>;
    patchChatPlan: (id: number, engineRoutingChatPlanServicePatchChatPlanBody: EngineRoutingChatPlanServicePatchChatPlanBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineChatPlan>>;
    updateChatPlan: (id: number, engineRoutingChatPlanServiceUpdateChatPlanBody: EngineRoutingChatPlanServiceUpdateChatPlanBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineChatPlan>>;
};
export type SearchChatPlanResult = AxiosResponse<EngineListChatPlan>;
export type CreateChatPlanResult = AxiosResponse<EngineChatPlan>;
export type DeleteChatPlanResult = AxiosResponse<EngineChatPlan>;
export type ReadChatPlanResult = AxiosResponse<EngineChatPlan>;
export type PatchChatPlanResult = AxiosResponse<EngineChatPlan>;
export type UpdateChatPlanResult = AxiosResponse<EngineChatPlan>;
