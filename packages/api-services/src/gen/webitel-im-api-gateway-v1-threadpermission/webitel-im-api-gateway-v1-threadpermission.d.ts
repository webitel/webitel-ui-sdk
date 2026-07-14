import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	ThreadPermissionUpdateParams,
	WebitelImApiGatewayV1GetThreadPermissionsResponse,
	WebitelImApiGatewayV1UpdateThreadPermissionsResponse,
} from '../_models';
export declare const // --- title start
	getWebitelImApiGatewayV1Threadpermission: (axiosInstance?: AxiosInstance) => {
		threadPermissionGet: (
			threadId: string,
			memberId: string,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImApiGatewayV1GetThreadPermissionsResponse>
		>;
		threadPermissionUpdate: (
			threadId: string,
			memberId: string,
			params?: ThreadPermissionUpdateParams,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImApiGatewayV1UpdateThreadPermissionsResponse>
		>;
	};
export type ThreadPermissionGetResult =
	AxiosResponse<WebitelImApiGatewayV1GetThreadPermissionsResponse>;
export type ThreadPermissionUpdateResult =
	AxiosResponse<WebitelImApiGatewayV1UpdateThreadPermissionsResponse>;
