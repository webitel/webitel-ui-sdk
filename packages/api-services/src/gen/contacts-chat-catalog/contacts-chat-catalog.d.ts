import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	ContactsChatCatalogGetContactChatHistory2Params,
	ContactsChatCatalogGetContactChatHistoryParams,
	WebitelChatGetContactChatHistoryResponse,
} from '../_models';
export declare const // --- title start
	getContactsChatCatalog: (axiosInstance?: AxiosInstance) => {
		contactsChatCatalogGetContactChatHistory2: (
			contactId: string,
			params?: ContactsChatCatalogGetContactChatHistory2Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelChatGetContactChatHistoryResponse>>;
		contactsChatCatalogGetContactChatHistory: (
			contactId: string,
			chatId: string,
			params?: ContactsChatCatalogGetContactChatHistoryParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelChatGetContactChatHistoryResponse>>;
	};
export type ContactsChatCatalogGetContactChatHistory2Result =
	AxiosResponse<WebitelChatGetContactChatHistoryResponse>;
export type ContactsChatCatalogGetContactChatHistoryResult =
	AxiosResponse<WebitelChatGetContactChatHistoryResponse>;
