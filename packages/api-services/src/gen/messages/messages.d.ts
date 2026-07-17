import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	CatalogGetCustomersParams,
	CatalogGetDialogsParams,
	CatalogGetHistory2Params,
	CatalogGetHistoryParams,
	CatalogGetMembersParams,
	WebitelChatBroadcastMessageRequest,
	WebitelChatBroadcastMessageResponse,
	WebitelChatChatCustomers,
	WebitelChatChatDialogs,
	WebitelChatChatMembers,
	WebitelChatChatMessages,
} from '../_models';
export declare const // --- title start
	getMessages: (axiosInstance?: AxiosInstance) => {
		messagesServiceBroadcastMessage: (
			webitelChatBroadcastMessageRequest: WebitelChatBroadcastMessageRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelChatBroadcastMessageResponse>>;
		catalogGetCustomers: (
			params?: CatalogGetCustomersParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelChatChatCustomers>>;
		catalogGetDialogs: (
			params?: CatalogGetDialogsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelChatChatDialogs>>;
		catalogGetMembers: (
			chatId: string,
			params?: CatalogGetMembersParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelChatChatMembers>>;
		catalogGetHistory: (
			chatId: string,
			params?: CatalogGetHistoryParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelChatChatMessages>>;
		catalogGetHistory2: (
			params?: CatalogGetHistory2Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelChatChatMessages>>;
	};
export type MessagesServiceBroadcastMessageResult =
	AxiosResponse<WebitelChatBroadcastMessageResponse>;
export type CatalogGetCustomersResult = AxiosResponse<WebitelChatChatCustomers>;
export type CatalogGetDialogsResult = AxiosResponse<WebitelChatChatDialogs>;
export type CatalogGetMembersResult = AxiosResponse<WebitelChatChatMembers>;
export type CatalogGetHistoryResult = AxiosResponse<WebitelChatChatMessages>;
export type CatalogGetHistory2Result = AxiosResponse<WebitelChatChatMessages>;
