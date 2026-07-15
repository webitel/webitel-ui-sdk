import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiGetCustomerResponse, ApiLicenseUsageResponse, ApiLicenseUsersResponse, ApiServerInfoResponse, ApiUpdateCustomerResponse, GetCustomer2Params, GetCustomerParams, LicenseUsage2Params, LicenseUsage3Params, LicenseUsageParams, LicenseUsersParams, UpdateCustomerParams } from '../_models';
export declare const // --- title start
getCustomers: (axiosInstance?: AxiosInstance) => {
    getCustomer: (params?: GetCustomerParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiGetCustomerResponse>>;
    updateCustomer: (params?: UpdateCustomerParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiUpdateCustomerResponse>>;
    licenseUsage: (customerId: string, params?: LicenseUsageParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiLicenseUsageResponse>>;
    getCustomer2: (id: string, params?: GetCustomer2Params, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiGetCustomerResponse>>;
    licenseUsage2: (params?: LicenseUsage2Params, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiLicenseUsageResponse>>;
    licenseUsage3: (params?: LicenseUsage3Params, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiLicenseUsageResponse>>;
    licenseUsers: (id: string, params?: LicenseUsersParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiLicenseUsersResponse>>;
    serverInfo: (options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiServerInfoResponse>>;
};
export type GetCustomerResult = AxiosResponse<ApiGetCustomerResponse>;
export type UpdateCustomerResult = AxiosResponse<ApiUpdateCustomerResponse>;
export type LicenseUsageResult = AxiosResponse<ApiLicenseUsageResponse>;
export type GetCustomer2Result = AxiosResponse<ApiGetCustomerResponse>;
export type LicenseUsage2Result = AxiosResponse<ApiLicenseUsageResponse>;
export type LicenseUsage3Result = AxiosResponse<ApiLicenseUsageResponse>;
export type LicenseUsersResult = AxiosResponse<ApiLicenseUsersResponse>;
export type ServerInfoResult = AxiosResponse<ApiServerInfoResponse>;
