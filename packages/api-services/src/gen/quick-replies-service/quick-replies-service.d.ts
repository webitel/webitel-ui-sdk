import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { EngineCreateQuickReplyRequest, EngineListQuickReplies, EngineQuickRepliesServicePatchQuickReplyBody, EngineQuickRepliesServiceUpdateQuickReplyBody, EngineQuickReply, SearchQuickRepliesParams } from '../_models';
export declare const // --- title start
getQuickRepliesService: (axiosInstance?: AxiosInstance) => {
    searchQuickReplies: (params?: SearchQuickRepliesParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineListQuickReplies>>;
    createQuickReply: (engineCreateQuickReplyRequest: EngineCreateQuickReplyRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineQuickReply>>;
    deleteQuickReply: (id: number, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineQuickReply>>;
    readQuickReply: (id: number, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineQuickReply>>;
    patchQuickReply: (id: number, engineQuickRepliesServicePatchQuickReplyBody: EngineQuickRepliesServicePatchQuickReplyBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineQuickReply>>;
    updateQuickReply: (id: number, engineQuickRepliesServiceUpdateQuickReplyBody: EngineQuickRepliesServiceUpdateQuickReplyBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineQuickReply>>;
};
export type SearchQuickRepliesResult = AxiosResponse<EngineListQuickReplies>;
export type CreateQuickReplyResult = AxiosResponse<EngineQuickReply>;
export type DeleteQuickReplyResult = AxiosResponse<EngineQuickReply>;
export type ReadQuickReplyResult = AxiosResponse<EngineQuickReply>;
export type PatchQuickReplyResult = AxiosResponse<EngineQuickReply>;
export type UpdateQuickReplyResult = AxiosResponse<EngineQuickReply>;
