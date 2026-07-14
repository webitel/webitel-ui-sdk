import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	ContactsContactGroup,
	ContactsContactGroupList,
	ContactsInputContactGroup,
	DeleteContactGroupParams,
	DeleteContactGroupsParams,
	ListContactGroupsParams,
	LocateContactGroupParams,
	MergeContactGroupsParams,
	ResetContactGroupsParams,
	UpdateContactGroup2Body,
	UpdateContactGroup2Params,
	UpdateContactGroupBody,
	UpdateContactGroupParams,
} from '../_models';
export declare const // --- title start
	getContactGroups: (axiosInstance?: AxiosInstance) => {
		deleteContactGroups: (
			contactId: string,
			params: DeleteContactGroupsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsContactGroupList>>;
		listContactGroups: (
			contactId: string,
			params?: ListContactGroupsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsContactGroupList>>;
		mergeContactGroups: (
			contactId: string,
			contactsInputContactGroup: ContactsInputContactGroup[],
			params?: MergeContactGroupsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsContactGroupList>>;
		resetContactGroups: (
			contactId: string,
			contactsInputContactGroup: ContactsInputContactGroup[],
			params?: ResetContactGroupsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsContactGroupList>>;
		deleteContactGroup: (
			contactId: string,
			etag: string,
			params?: DeleteContactGroupParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsContactGroup>>;
		locateContactGroup: (
			contactId: string,
			etag: string,
			params?: LocateContactGroupParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsContactGroup>>;
		updateContactGroup2: (
			contactId: string,
			etag: string,
			updateContactGroup2Body: UpdateContactGroup2Body,
			params?: UpdateContactGroup2Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsContactGroupList>>;
		updateContactGroup: (
			contactId: string,
			etag: string,
			updateContactGroupBody: UpdateContactGroupBody,
			params?: UpdateContactGroupParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsContactGroupList>>;
	};
export type DeleteContactGroupsResult = AxiosResponse<ContactsContactGroupList>;
export type ListContactGroupsResult = AxiosResponse<ContactsContactGroupList>;
export type MergeContactGroupsResult = AxiosResponse<ContactsContactGroupList>;
export type ResetContactGroupsResult = AxiosResponse<ContactsContactGroupList>;
export type DeleteContactGroupResult = AxiosResponse<ContactsContactGroup>;
export type LocateContactGroupResult = AxiosResponse<ContactsContactGroup>;
export type UpdateContactGroup2Result = AxiosResponse<ContactsContactGroupList>;
export type UpdateContactGroupResult = AxiosResponse<ContactsContactGroupList>;
