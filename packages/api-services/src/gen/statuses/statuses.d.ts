import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	CreateStatusParams,
	ListStatusesParams,
	LocateStatusParams,
	UpdateStatus2Params,
	UpdateStatusParams,
	WebitelCasesInputStatus,
	WebitelCasesInputStatusBody,
	WebitelCasesLocateStatusResponse,
	WebitelCasesStatus,
	WebitelCasesStatusList,
} from '../_models';
export declare const // --- title start
	getStatuses: (axiosInstance?: AxiosInstance) => {
		listStatuses: (
			params?: ListStatusesParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesStatusList>>;
		createStatus: (
			webitelCasesInputStatusBody: WebitelCasesInputStatusBody,
			params?: CreateStatusParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesStatus>>;
		deleteStatus: (
			id: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesStatus>>;
		locateStatus: (
			id: string,
			params?: LocateStatusParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesLocateStatusResponse>>;
		updateStatus2: (
			id: string,
			webitelCasesInputStatus: WebitelCasesInputStatus,
			params?: UpdateStatus2Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesStatus>>;
		updateStatus: (
			id: string,
			webitelCasesInputStatus: WebitelCasesInputStatus,
			params?: UpdateStatusParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesStatus>>;
	};
export type ListStatusesResult = AxiosResponse<WebitelCasesStatusList>;
export type CreateStatusResult = AxiosResponse<WebitelCasesStatus>;
export type DeleteStatusResult = AxiosResponse<WebitelCasesStatus>;
export type LocateStatusResult =
	AxiosResponse<WebitelCasesLocateStatusResponse>;
export type UpdateStatus2Result = AxiosResponse<WebitelCasesStatus>;
export type UpdateStatusResult = AxiosResponse<WebitelCasesStatus>;
