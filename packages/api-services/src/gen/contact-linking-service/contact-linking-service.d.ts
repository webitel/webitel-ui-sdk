import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ContactLinkingServiceCreateContactFromConversationParams, ContactLinkingServiceLinkContactToClientParams, WebitelChatEmptyResponse, WebitelChatLookup } from '../_models';
export declare const // --- title start
getContactLinkingService: (axiosInstance?: AxiosInstance) => {
    contactLinkingServiceCreateContactFromConversation: (conversationId: string, params?: ContactLinkingServiceCreateContactFromConversationParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelChatLookup>>;
    contactLinkingServiceLinkContactToClient: (conversationId: string, params?: ContactLinkingServiceLinkContactToClientParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelChatEmptyResponse>>;
};
export type ContactLinkingServiceCreateContactFromConversationResult = AxiosResponse<WebitelChatLookup>;
export type ContactLinkingServiceLinkContactToClientResult = AxiosResponse<WebitelChatEmptyResponse>;
