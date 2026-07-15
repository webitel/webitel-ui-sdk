import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { AgentChatServiceGetAgentChatsCounterParams, AgentChatServiceGetAgentChatsParams, WebitelChatGetAgentChatsCounterResponse, WebitelChatGetAgentChatsResponse, WebitelChatMarkChatProcessedResponse } from '../_models';
export declare const // --- title start
getAgentChatService: (axiosInstance?: AxiosInstance) => {
    agentChatServiceGetAgentChats: (params?: AgentChatServiceGetAgentChatsParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelChatGetAgentChatsResponse>>;
    agentChatServiceGetAgentChatsCounter: (params?: AgentChatServiceGetAgentChatsCounterParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelChatGetAgentChatsCounterResponse>>;
    agentChatServiceMarkChatProcessed: (chatId: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelChatMarkChatProcessedResponse>>;
};
export type AgentChatServiceGetAgentChatsResult = AxiosResponse<WebitelChatGetAgentChatsResponse>;
export type AgentChatServiceGetAgentChatsCounterResult = AxiosResponse<WebitelChatGetAgentChatsCounterResponse>;
export type AgentChatServiceMarkChatProcessedResult = AxiosResponse<WebitelChatMarkChatProcessedResponse>;
