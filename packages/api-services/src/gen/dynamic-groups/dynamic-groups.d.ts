import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	ContactsCreateDynamicGroupRequest,
	ContactsDynamicGroup,
	ContactsDynamicGroupInput,
	ContactsDynamicGroupList,
	ContactsLocateDynamicGroupResponse,
	ListDynamicGroupsParams,
	LocateDynamicGroupParams,
} from '../_models';
export declare const // --- title start
	getDynamicGroups: (axiosInstance?: AxiosInstance) => {
		listDynamicGroups: (
			params?: ListDynamicGroupsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsDynamicGroupList>>;
		createDynamicGroup: (
			contactsCreateDynamicGroupRequest: ContactsCreateDynamicGroupRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsDynamicGroup>>;
		deleteDynamicGroup: (
			id: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsDynamicGroup>>;
		locateDynamicGroup: (
			id: string,
			params?: LocateDynamicGroupParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsLocateDynamicGroupResponse>>;
		updateDynamicGroup2: (
			id: string,
			contactsDynamicGroupInput: ContactsDynamicGroupInput,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsDynamicGroup>>;
		updateDynamicGroup: (
			id: string,
			contactsDynamicGroupInput: ContactsDynamicGroupInput,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsDynamicGroup>>;
	};
export type ListDynamicGroupsResult = AxiosResponse<ContactsDynamicGroupList>;
export type CreateDynamicGroupResult = AxiosResponse<ContactsDynamicGroup>;
export type DeleteDynamicGroupResult = AxiosResponse<ContactsDynamicGroup>;
export type LocateDynamicGroupResult =
	AxiosResponse<ContactsLocateDynamicGroupResponse>;
export type UpdateDynamicGroup2Result = AxiosResponse<ContactsDynamicGroup>;
export type UpdateDynamicGroupResult = AxiosResponse<ContactsDynamicGroup>;
