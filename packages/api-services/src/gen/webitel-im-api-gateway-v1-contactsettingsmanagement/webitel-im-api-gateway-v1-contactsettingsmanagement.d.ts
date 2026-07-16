import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	ContactSettingsManagementGetParams,
	ContactSettingsManagementUpdateParams,
	WebitelImApiGatewayV1GetContactSettingsResponse,
	WebitelImApiGatewayV1UpdateContactSettingsResponse,
} from '../_models';
export declare const // --- title start
	getWebitelImApiGatewayV1Contactsettingsmanagement: (
		axiosInstance?: AxiosInstance,
	) => {
		contactSettingsManagementGet: (
			params?: ContactSettingsManagementGetParams,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImApiGatewayV1GetContactSettingsResponse>
		>;
		contactSettingsManagementUpdate: (
			params?: ContactSettingsManagementUpdateParams,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImApiGatewayV1UpdateContactSettingsResponse>
		>;
	};
export type ContactSettingsManagementGetResult =
	AxiosResponse<WebitelImApiGatewayV1GetContactSettingsResponse>;
export type ContactSettingsManagementUpdateResult =
	AxiosResponse<WebitelImApiGatewayV1UpdateContactSettingsResponse>;
