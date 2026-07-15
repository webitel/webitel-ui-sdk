import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	MessageReadParams,
	WebitelImApiGatewayV1InteractiveCallbackResponse,
	WebitelImApiGatewayV1MessageSendInteractiveCallbackBody,
	WebitelImApiGatewayV1ReadMessageResponse,
	WebitelImApiGatewayV1SendContactRequest,
	WebitelImApiGatewayV1SendDocumentRequest,
	WebitelImApiGatewayV1SendDocumentResponse,
	WebitelImApiGatewayV1SendInteractiveMessageRequest,
	WebitelImApiGatewayV1SendLocationRequest,
	WebitelImApiGatewayV1SendMessageResponse,
	WebitelImApiGatewayV1SendTextRequest,
	WebitelImApiGatewayV1SendTextResponse,
} from '../_models';
export declare const // --- title start
	getWebitelImApiGatewayV1Message: (axiosInstance?: AxiosInstance) => {
		messageSendContact: (
			webitelImApiGatewayV1SendContactRequest: WebitelImApiGatewayV1SendContactRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelImApiGatewayV1SendMessageResponse>>;
		messageSendDocument: (
			webitelImApiGatewayV1SendDocumentRequest: WebitelImApiGatewayV1SendDocumentRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelImApiGatewayV1SendDocumentResponse>>;
		messageSendInteractive: (
			webitelImApiGatewayV1SendInteractiveMessageRequest: WebitelImApiGatewayV1SendInteractiveMessageRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelImApiGatewayV1SendMessageResponse>>;
		messageSendInteractiveCallback: (
			inReplyTo: string,
			webitelImApiGatewayV1MessageSendInteractiveCallbackBody: WebitelImApiGatewayV1MessageSendInteractiveCallbackBody,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImApiGatewayV1InteractiveCallbackResponse>
		>;
		messageSendLocation: (
			webitelImApiGatewayV1SendLocationRequest: WebitelImApiGatewayV1SendLocationRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelImApiGatewayV1SendMessageResponse>>;
		messageSendText: (
			webitelImApiGatewayV1SendTextRequest: WebitelImApiGatewayV1SendTextRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelImApiGatewayV1SendTextResponse>>;
		messageRead: (
			id: string,
			params?: MessageReadParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelImApiGatewayV1ReadMessageResponse>>;
	};
export type MessageSendContactResult =
	AxiosResponse<WebitelImApiGatewayV1SendMessageResponse>;
export type MessageSendDocumentResult =
	AxiosResponse<WebitelImApiGatewayV1SendDocumentResponse>;
export type MessageSendInteractiveResult =
	AxiosResponse<WebitelImApiGatewayV1SendMessageResponse>;
export type MessageSendInteractiveCallbackResult =
	AxiosResponse<WebitelImApiGatewayV1InteractiveCallbackResponse>;
export type MessageSendLocationResult =
	AxiosResponse<WebitelImApiGatewayV1SendMessageResponse>;
export type MessageSendTextResult =
	AxiosResponse<WebitelImApiGatewayV1SendTextResponse>;
export type MessageReadResult =
	AxiosResponse<WebitelImApiGatewayV1ReadMessageResponse>;
