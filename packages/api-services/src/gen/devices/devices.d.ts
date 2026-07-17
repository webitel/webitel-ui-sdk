import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	ApiCreateDeviceResponse,
	ApiDeleteDeviceResponse,
	ApiDevice,
	ApiDeviceAuditResponse,
	ApiListRegistrationsResponse,
	ApiReadDeviceResponse,
	ApiSearchDeviceResponse,
	ApiUpdateDeviceResponse,
	DeleteDevice2Params,
	DeleteDeviceParams,
	ListRegistrationsParams,
	ReadDeviceParams,
	SearchDeviceAuditParams,
	SearchDeviceParams,
	UpdateDevice2Body,
	UpdateDevice2Params,
	UpdateDeviceBody,
	UpdateDeviceParams,
} from '../_models';
export declare const // --- title start
	getDevices: (axiosInstance?: AxiosInstance) => {
		deleteDevice2: (
			deleteDevice2Body: string[],
			params?: DeleteDevice2Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiDeleteDeviceResponse>>;
		searchDevice: (
			params?: SearchDeviceParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiSearchDeviceResponse>>;
		createDevice: (
			apiDevice: ApiDevice,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiCreateDeviceResponse>>;
		updateDevice2: (
			updateDevice2Body: UpdateDevice2Body,
			params?: UpdateDevice2Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiUpdateDeviceResponse>>;
		updateDevice: (
			updateDeviceBody: UpdateDeviceBody,
			params?: UpdateDeviceParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiUpdateDeviceResponse>>;
		listRegistrations: (
			params?: ListRegistrationsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiListRegistrationsResponse>>;
		searchDeviceAudit: (
			params?: SearchDeviceAuditParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiDeviceAuditResponse>>;
		deleteDevice: (
			id: string,
			params?: DeleteDeviceParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiDeleteDeviceResponse>>;
		readDevice: (
			id: string,
			params?: ReadDeviceParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiReadDeviceResponse>>;
	};
export type DeleteDevice2Result = AxiosResponse<ApiDeleteDeviceResponse>;
export type SearchDeviceResult = AxiosResponse<ApiSearchDeviceResponse>;
export type CreateDeviceResult = AxiosResponse<ApiCreateDeviceResponse>;
export type UpdateDevice2Result = AxiosResponse<ApiUpdateDeviceResponse>;
export type UpdateDeviceResult = AxiosResponse<ApiUpdateDeviceResponse>;
export type ListRegistrationsResult =
	AxiosResponse<ApiListRegistrationsResponse>;
export type SearchDeviceAuditResult = AxiosResponse<ApiDeviceAuditResponse>;
export type DeleteDeviceResult = AxiosResponse<ApiDeleteDeviceResponse>;
export type ReadDeviceResult = AxiosResponse<ApiReadDeviceResponse>;
