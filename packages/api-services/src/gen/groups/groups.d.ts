import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	ContactsAddContactsToGroupRequest,
	ContactsContactList,
	ContactsCreateGroupRequest,
	ContactsGroup,
	ContactsGroupList,
	ContactsInputGroup,
	ContactsLocateGroupResponse,
	ListGroupsParams,
	LocateGroupParams,
	RemoveContactsFromGroupParams,
} from '../_models';
export declare const // --- title start
	getGroups: (axiosInstance?: AxiosInstance) => {
		listGroups: (
			params?: ListGroupsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsGroupList>>;
		createGroup: (
			contactsCreateGroupRequest: ContactsCreateGroupRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsGroup>>;
		addContactsToGroups: (
			contactsAddContactsToGroupRequest: ContactsAddContactsToGroupRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsContactList>>;
		removeContactsFromGroup: (
			groupId: string,
			params?: RemoveContactsFromGroupParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsContactList>>;
		deleteGroup: (
			id: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsGroup>>;
		locateGroup: (
			id: string,
			params?: LocateGroupParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsLocateGroupResponse>>;
		updateGroup2: (
			id: string,
			contactsInputGroup: ContactsInputGroup,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsGroup>>;
		updateGroup: (
			id: string,
			contactsInputGroup: ContactsInputGroup,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsGroup>>;
	};
export type ListGroupsResult = AxiosResponse<ContactsGroupList>;
export type CreateGroupResult = AxiosResponse<ContactsGroup>;
export type AddContactsToGroupsResult = AxiosResponse<ContactsContactList>;
export type RemoveContactsFromGroupResult = AxiosResponse<ContactsContactList>;
export type DeleteGroupResult = AxiosResponse<ContactsGroup>;
export type LocateGroupResult = AxiosResponse<ContactsLocateGroupResponse>;
export type UpdateGroup2Result = AxiosResponse<ContactsGroup>;
export type UpdateGroupResult = AxiosResponse<ContactsGroup>;
