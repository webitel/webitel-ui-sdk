import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	WebitelImApiGatewayV1Bot,
	WebitelImApiGatewayV1BotsUpdateBotBody,
	WebitelImApiGatewayV1CreateBotRequest,
} from '../_models';
export declare const // --- title start
	getWebitelImApiGatewayV1Bots: (axiosInstance?: AxiosInstance) => {
		botsCreateBot: (
			webitelImApiGatewayV1CreateBotRequest: WebitelImApiGatewayV1CreateBotRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelImApiGatewayV1Bot>>;
		botsDeleteBot: (
			id: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelImApiGatewayV1Bot>>;
		botsUpdateBot: (
			id: string,
			webitelImApiGatewayV1BotsUpdateBotBody: WebitelImApiGatewayV1BotsUpdateBotBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelImApiGatewayV1Bot>>;
	};
export type BotsCreateBotResult = AxiosResponse<WebitelImApiGatewayV1Bot>;
export type BotsDeleteBotResult = AxiosResponse<WebitelImApiGatewayV1Bot>;
export type BotsUpdateBotResult = AxiosResponse<WebitelImApiGatewayV1Bot>;
