import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	CasesChatCatalogGetCaseChatHistoryParams,
	WebitelChatChatMessages,
} from '../_models';
export declare const // --- title start
	getCasesChatCatalog: (axiosInstance?: AxiosInstance) => {
		casesChatCatalogGetCaseChatHistory: (
			caseId: string,
			chatId: string,
			params?: CasesChatCatalogGetCaseChatHistoryParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelChatChatMessages>>;
	};
export type CasesChatCatalogGetCaseChatHistoryResult =
	AxiosResponse<WebitelChatChatMessages>;
