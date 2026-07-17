import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	MessageHistorySearchLeftThreadsMessagesHistoryParams,
	MessageHistorySearchThreadMessagesHistoryParams,
	WebitelImApiGatewayV1SearchMessageHistoryResponse,
} from '../_models';
export declare const // --- title start
	getWebitelImApiGatewayV1Messagehistory: (axiosInstance?: AxiosInstance) => {
		messageHistorySearchLeftThreadsMessagesHistory: (
			threadId: string,
			params?: MessageHistorySearchLeftThreadsMessagesHistoryParams,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImApiGatewayV1SearchMessageHistoryResponse>
		>;
		messageHistorySearchThreadMessagesHistory: (
			threadId: string,
			params?: MessageHistorySearchThreadMessagesHistoryParams,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImApiGatewayV1SearchMessageHistoryResponse>
		>;
	};
export type MessageHistorySearchLeftThreadsMessagesHistoryResult =
	AxiosResponse<WebitelImApiGatewayV1SearchMessageHistoryResponse>;
export type MessageHistorySearchThreadMessagesHistoryResult =
	AxiosResponse<WebitelImApiGatewayV1SearchMessageHistoryResponse>;
