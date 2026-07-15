import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	ContactsEmailAddress,
	ContactsEmailList,
	ContactsInputEmailAddress,
	DeleteEmailParams,
	DeleteEmailsParams,
	ListEmailsParams,
	LocateEmailParams,
	MergeEmailsParams,
	ResetEmailsParams,
	UpdateEmail2Body,
	UpdateEmail2Params,
	UpdateEmailBody,
	UpdateEmailParams,
} from '../_models';
export declare const // --- title start
	getEmails: (axiosInstance?: AxiosInstance) => {
		deleteEmails: (
			contactId: string,
			params: DeleteEmailsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsEmailList>>;
		listEmails: (
			contactId: string,
			params?: ListEmailsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsEmailList>>;
		mergeEmails: (
			contactId: string,
			contactsInputEmailAddress: ContactsInputEmailAddress[],
			params?: MergeEmailsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsEmailList>>;
		resetEmails: (
			contactId: string,
			contactsInputEmailAddress: ContactsInputEmailAddress[],
			params?: ResetEmailsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsEmailList>>;
		deleteEmail: (
			contactId: string,
			etag: string,
			params?: DeleteEmailParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsEmailAddress>>;
		locateEmail: (
			contactId: string,
			etag: string,
			params?: LocateEmailParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsEmailAddress>>;
		updateEmail2: (
			contactId: string,
			etag: string,
			updateEmail2Body: UpdateEmail2Body,
			params?: UpdateEmail2Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsEmailList>>;
		updateEmail: (
			contactId: string,
			etag: string,
			updateEmailBody: UpdateEmailBody,
			params?: UpdateEmailParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsEmailList>>;
	};
export type DeleteEmailsResult = AxiosResponse<ContactsEmailList>;
export type ListEmailsResult = AxiosResponse<ContactsEmailList>;
export type MergeEmailsResult = AxiosResponse<ContactsEmailList>;
export type ResetEmailsResult = AxiosResponse<ContactsEmailList>;
export type DeleteEmailResult = AxiosResponse<ContactsEmailAddress>;
export type LocateEmailResult = AxiosResponse<ContactsEmailAddress>;
export type UpdateEmail2Result = AxiosResponse<ContactsEmailList>;
export type UpdateEmailResult = AxiosResponse<ContactsEmailList>;
