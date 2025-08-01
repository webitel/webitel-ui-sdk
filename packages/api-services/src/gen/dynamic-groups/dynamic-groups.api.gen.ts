/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import axios from '@aliasedDeps/api-services/axios';

import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import type {
	DynamicGroupsListDynamicGroupsParams,
	DynamicGroupsLocateDynamicGroupParams,
	WebitelContactsCreateDynamicGroupRequest,
	WebitelContactsDynamicGroup,
	WebitelContactsDynamicGroupInput,
	WebitelContactsDynamicGroupList,
	WebitelContactsLocateDynamicGroupResponse,
} from '.././_models';

// --- header start
//

export const // --- title start
	getDynamicGroups =
		// --- title end
		() => {
			// --- header end
			/**
			 * @summary Retrieve a list of dynamic groups or search dynamic groups
			 */
			const dynamicGroupsListDynamicGroups = <
				TData = AxiosResponse<WebitelContactsDynamicGroupList>,
			>(
				params?: DynamicGroupsListDynamicGroupsParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get('/contacts/groups/dynamic', {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			/**
			 * @summary Create a new dynamic group
			 */
			const dynamicGroupsCreateDynamicGroup = <
				TData = AxiosResponse<WebitelContactsDynamicGroup>,
			>(
				webitelContactsCreateDynamicGroupRequest: WebitelContactsCreateDynamicGroupRequest,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.post(
					'/contacts/groups/dynamic',
					webitelContactsCreateDynamicGroupRequest,
					options,
				);
			};
			/**
			 * @summary Delete a dynamic group
			 */
			const dynamicGroupsDeleteDynamicGroup = <
				TData = AxiosResponse<WebitelContactsDynamicGroup>,
			>(
				id: string,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.delete(`/contacts/groups/${id}/dynamic`, options);
			};
			/**
			 * @summary Locate a dynamic group by ID
			 */
			const dynamicGroupsLocateDynamicGroup = <
				TData = AxiosResponse<WebitelContactsLocateDynamicGroupResponse>,
			>(
				id: string,
				params?: DynamicGroupsLocateDynamicGroupParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get(`/contacts/groups/${id}/dynamic`, {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			/**
			 * @summary Update an existing dynamic group
			 */
			const dynamicGroupsUpdateDynamicGroup2 = <
				TData = AxiosResponse<WebitelContactsDynamicGroup>,
			>(
				id: string,
				webitelContactsDynamicGroupInput: WebitelContactsDynamicGroupInput,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.patch(
					`/contacts/groups/${id}/dynamic`,
					webitelContactsDynamicGroupInput,
					options,
				);
			};
			/**
			 * @summary Update an existing dynamic group
			 */
			const dynamicGroupsUpdateDynamicGroup = <
				TData = AxiosResponse<WebitelContactsDynamicGroup>,
			>(
				id: string,
				webitelContactsDynamicGroupInput: WebitelContactsDynamicGroupInput,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.put(
					`/contacts/groups/${id}/dynamic`,
					webitelContactsDynamicGroupInput,
					options,
				);
			};

			// --- footer start
			return {
				dynamicGroupsListDynamicGroups,
				dynamicGroupsCreateDynamicGroup,
				dynamicGroupsDeleteDynamicGroup,
				dynamicGroupsLocateDynamicGroup,
				dynamicGroupsUpdateDynamicGroup2,
				dynamicGroupsUpdateDynamicGroup,
			};
		};
export type DynamicGroupsListDynamicGroupsResult =
	AxiosResponse<WebitelContactsDynamicGroupList>;
export type DynamicGroupsCreateDynamicGroupResult =
	AxiosResponse<WebitelContactsDynamicGroup>;
export type DynamicGroupsDeleteDynamicGroupResult =
	AxiosResponse<WebitelContactsDynamicGroup>;
export type DynamicGroupsLocateDynamicGroupResult =
	AxiosResponse<WebitelContactsLocateDynamicGroupResponse>;
export type DynamicGroupsUpdateDynamicGroup2Result =
	AxiosResponse<WebitelContactsDynamicGroup>;
export type DynamicGroupsUpdateDynamicGroupResult =
	AxiosResponse<WebitelContactsDynamicGroup>;

// --- footer end
