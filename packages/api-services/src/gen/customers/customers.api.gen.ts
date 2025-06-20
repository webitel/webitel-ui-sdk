/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import axios from '@aliasedDeps/api-services/axios';

import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import type {
	ApiGetCustomerResponse,
	ApiLicenseUsageResponse,
	ApiLicenseUsersResponse,
	ApiServerInfoResponse,
	ApiUpdateCustomerResponse,
	CustomersGetCustomer2Params,
	CustomersGetCustomerParams,
	CustomersLicenseUsage2Params,
	CustomersLicenseUsage3Params,
	CustomersLicenseUsageParams,
	CustomersLicenseUsersParams,
	CustomersUpdateCustomerParams,
} from '.././_models';

// --- header start
//

export const // --- title start
	getCustomers =
		// --- title end
		() => {
			// --- header end
			/**
			 * @summary rpc GetCertificate(CertificateUsageRequest) returns (CertificateUsageResponse) {}
			 */
			const customersGetCustomer = <
				TData = AxiosResponse<ApiGetCustomerResponse>,
			>(
				params?: CustomersGetCustomerParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get('/customer', {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			const customersUpdateCustomer = <
				TData = AxiosResponse<ApiUpdateCustomerResponse>,
			>(
				params?: CustomersUpdateCustomerParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.put('/customer', undefined, {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			const customersLicenseUsage = <
				TData = AxiosResponse<ApiLicenseUsageResponse>,
			>(
				customerId: string,
				params?: CustomersLicenseUsageParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get(`/customer/${customerId}/license`, {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			/**
			 * @summary rpc GetCertificate(CertificateUsageRequest) returns (CertificateUsageResponse) {}
			 */
			const customersGetCustomer2 = <
				TData = AxiosResponse<ApiGetCustomerResponse>,
			>(
				id: string,
				params?: CustomersGetCustomer2Params,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get(`/customer/${id}`, {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			const customersLicenseUsage2 = <
				TData = AxiosResponse<ApiLicenseUsageResponse>,
			>(
				params?: CustomersLicenseUsage2Params,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get('/license', {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			const customersLicenseUsage3 = <
				TData = AxiosResponse<ApiLicenseUsageResponse>,
			>(
				params?: CustomersLicenseUsage3Params,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get('/products', {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			const customersLicenseUsers = <
				TData = AxiosResponse<ApiLicenseUsersResponse>,
			>(
				id: string,
				params?: CustomersLicenseUsersParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get(`/products/${id}/users`, {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			const customersServerInfo = <
				TData = AxiosResponse<ApiServerInfoResponse>,
			>(
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get('/srvinfo', options);
			};

			// --- footer start
			return {
				customersGetCustomer,
				customersUpdateCustomer,
				customersLicenseUsage,
				customersGetCustomer2,
				customersLicenseUsage2,
				customersLicenseUsage3,
				customersLicenseUsers,
				customersServerInfo,
			};
		};
export type CustomersGetCustomerResult = AxiosResponse<ApiGetCustomerResponse>;
export type CustomersUpdateCustomerResult =
	AxiosResponse<ApiUpdateCustomerResponse>;
export type CustomersLicenseUsageResult =
	AxiosResponse<ApiLicenseUsageResponse>;
export type CustomersGetCustomer2Result = AxiosResponse<ApiGetCustomerResponse>;
export type CustomersLicenseUsage2Result =
	AxiosResponse<ApiLicenseUsageResponse>;
export type CustomersLicenseUsage3Result =
	AxiosResponse<ApiLicenseUsageResponse>;
export type CustomersLicenseUsersResult =
	AxiosResponse<ApiLicenseUsersResponse>;
export type CustomersServerInfoResult = AxiosResponse<ApiServerInfoResponse>;

// --- footer end
