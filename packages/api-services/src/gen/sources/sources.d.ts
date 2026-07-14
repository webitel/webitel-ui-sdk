import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	CreateSourceParams,
	ListSourcesParams,
	LocateSourceParams,
	UpdateSource2Params,
	UpdateSourceParams,
	WebitelCasesInputSource,
	WebitelCasesLocateSourceResponse,
	WebitelCasesSource,
	WebitelCasesSourceList,
} from '../_models';
export declare const // --- title start
	getSources: (axiosInstance?: AxiosInstance) => {
		listSources: (
			params?: ListSourcesParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesSourceList>>;
		createSource: (
			webitelCasesInputSource: WebitelCasesInputSource,
			params?: CreateSourceParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesSource>>;
		deleteSource: (
			id: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesSource>>;
		locateSource: (
			id: string,
			params?: LocateSourceParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesLocateSourceResponse>>;
		updateSource2: (
			id: string,
			webitelCasesInputSource: WebitelCasesInputSource,
			params?: UpdateSource2Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesSource>>;
		updateSource: (
			id: string,
			webitelCasesInputSource: WebitelCasesInputSource,
			params?: UpdateSourceParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesSource>>;
	};
export type ListSourcesResult = AxiosResponse<WebitelCasesSourceList>;
export type CreateSourceResult = AxiosResponse<WebitelCasesSource>;
export type DeleteSourceResult = AxiosResponse<WebitelCasesSource>;
export type LocateSourceResult =
	AxiosResponse<WebitelCasesLocateSourceResponse>;
export type UpdateSource2Result = AxiosResponse<WebitelCasesSource>;
export type UpdateSourceResult = AxiosResponse<WebitelCasesSource>;
