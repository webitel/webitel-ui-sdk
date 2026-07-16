import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	ThreadManagementGetParams,
	ThreadManagementSearchLeftParams,
	ThreadManagementSearchParams,
	ThreadManagementSearchVariablesParams,
	WebitelImApiGatewayV1AddMemberResponse,
	WebitelImApiGatewayV1RemoveMemberResponse,
	WebitelImApiGatewayV1SearchLeftResponse,
	WebitelImApiGatewayV1SearchThreadResponse,
	WebitelImApiGatewayV1SearchVariablesResponse,
	WebitelImApiGatewayV1Thread,
	WebitelImApiGatewayV1ThreadManagementAddMemberBody,
	WebitelImApiGatewayV1ThreadManagementCreateRequest,
	WebitelImApiGatewayV1ThreadManagementCreateResponse,
	WebitelImApiGatewayV1ThreadManagementFlushVariablesBody,
	WebitelImApiGatewayV1ThreadManagementSetVariablesBody,
	WebitelImApiGatewayV1ThreadManagementTransferBody,
	WebitelImApiGatewayV1ThreadVariables,
	WebitelImApiGatewayV1TransferResponse,
} from '../_models';
export declare const // --- title start
	getWebitelImApiGatewayV1Threadmanagement: (axiosInstance?: AxiosInstance) => {
		threadManagementSearch: (
			params?: ThreadManagementSearchParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelImApiGatewayV1SearchThreadResponse>>;
		threadManagementCreate: (
			webitelImApiGatewayV1ThreadManagementCreateRequest: WebitelImApiGatewayV1ThreadManagementCreateRequest,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImApiGatewayV1ThreadManagementCreateResponse>
		>;
		threadManagementSearchLeft: (
			params?: ThreadManagementSearchLeftParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelImApiGatewayV1SearchLeftResponse>>;
		threadManagementGet: (
			id: string,
			params?: ThreadManagementGetParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelImApiGatewayV1Thread>>;
		threadManagementAddMember: (
			threadId: string,
			webitelImApiGatewayV1ThreadManagementAddMemberBody: WebitelImApiGatewayV1ThreadManagementAddMemberBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelImApiGatewayV1AddMemberResponse>>;
		threadManagementRemoveMember: (
			threadId: string,
			memberId: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelImApiGatewayV1RemoveMemberResponse>>;
		threadManagementTransfer: (
			threadId: string,
			webitelImApiGatewayV1ThreadManagementTransferBody: WebitelImApiGatewayV1ThreadManagementTransferBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelImApiGatewayV1TransferResponse>>;
		threadManagementLocateVariables: (
			threadId: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelImApiGatewayV1ThreadVariables>>;
		threadManagementSetVariables: (
			threadId: string,
			webitelImApiGatewayV1ThreadManagementSetVariablesBody: WebitelImApiGatewayV1ThreadManagementSetVariablesBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelImApiGatewayV1ThreadVariables>>;
		threadManagementFlushVariables: (
			threadId: string,
			webitelImApiGatewayV1ThreadManagementFlushVariablesBody: WebitelImApiGatewayV1ThreadManagementFlushVariablesBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelImApiGatewayV1ThreadVariables>>;
		threadManagementSearchVariables: (
			params?: ThreadManagementSearchVariablesParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelImApiGatewayV1SearchVariablesResponse>>;
	};
export type ThreadManagementSearchResult =
	AxiosResponse<WebitelImApiGatewayV1SearchThreadResponse>;
export type ThreadManagementCreateResult =
	AxiosResponse<WebitelImApiGatewayV1ThreadManagementCreateResponse>;
export type ThreadManagementSearchLeftResult =
	AxiosResponse<WebitelImApiGatewayV1SearchLeftResponse>;
export type ThreadManagementGetResult =
	AxiosResponse<WebitelImApiGatewayV1Thread>;
export type ThreadManagementAddMemberResult =
	AxiosResponse<WebitelImApiGatewayV1AddMemberResponse>;
export type ThreadManagementRemoveMemberResult =
	AxiosResponse<WebitelImApiGatewayV1RemoveMemberResponse>;
export type ThreadManagementTransferResult =
	AxiosResponse<WebitelImApiGatewayV1TransferResponse>;
export type ThreadManagementLocateVariablesResult =
	AxiosResponse<WebitelImApiGatewayV1ThreadVariables>;
export type ThreadManagementSetVariablesResult =
	AxiosResponse<WebitelImApiGatewayV1ThreadVariables>;
export type ThreadManagementFlushVariablesResult =
	AxiosResponse<WebitelImApiGatewayV1ThreadVariables>;
export type ThreadManagementSearchVariablesResult =
	AxiosResponse<WebitelImApiGatewayV1SearchVariablesResponse>;
