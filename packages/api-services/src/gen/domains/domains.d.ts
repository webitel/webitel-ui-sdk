import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	ApiCreateDomainRequest,
	ApiCreateDomainResponse,
	ApiDeleteDomainResponse,
	ApiReadDomainResponse,
	ApiSearchDomainsResponse,
	ApiUpdateDomainResponse,
	DeleteDomain2Params,
	DeleteDomainParams,
	DomainsUpdateDomainBody,
	ReadDomain2Params,
	ReadDomainParams,
	SearchDomainsParams,
} from '../_models';
export declare const // --- title start
	getDomains: (axiosInstance?: AxiosInstance) => {
		deleteDomain: (
			params?: DeleteDomainParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiDeleteDomainResponse>>;
		readDomain: (
			params?: ReadDomainParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiReadDomainResponse>>;
		searchDomains: (
			params?: SearchDomainsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiSearchDomainsResponse>>;
		createDomain: (
			apiCreateDomainRequest: ApiCreateDomainRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiCreateDomainResponse>>;
		deleteDomain2: (
			dc: string,
			params?: DeleteDomain2Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiDeleteDomainResponse>>;
		readDomain2: (
			dc: string,
			params?: ReadDomain2Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiReadDomainResponse>>;
		updateDomain2: (
			domainsUpdateDomainBody: DomainsUpdateDomainBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiUpdateDomainResponse>>;
		updateDomain: (
			domainsUpdateDomainBody: DomainsUpdateDomainBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiUpdateDomainResponse>>;
	};
export type DeleteDomainResult = AxiosResponse<ApiDeleteDomainResponse>;
export type ReadDomainResult = AxiosResponse<ApiReadDomainResponse>;
export type SearchDomainsResult = AxiosResponse<ApiSearchDomainsResponse>;
export type CreateDomainResult = AxiosResponse<ApiCreateDomainResponse>;
export type DeleteDomain2Result = AxiosResponse<ApiDeleteDomainResponse>;
export type ReadDomain2Result = AxiosResponse<ApiReadDomainResponse>;
export type UpdateDomain2Result = AxiosResponse<ApiUpdateDomainResponse>;
export type UpdateDomainResult = AxiosResponse<ApiUpdateDomainResponse>;
