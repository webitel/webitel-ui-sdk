import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	ContactsInputPhoneNumber,
	ContactsPhoneList,
	ContactsPhoneNumber,
	DeletePhoneParams,
	DeletePhonesParams,
	ListPhonesParams,
	LocatePhoneParams,
	MergePhonesParams,
	ResetPhonesParams,
	UpdatePhone2Body,
	UpdatePhone2Params,
	UpdatePhoneBody,
	UpdatePhoneParams,
} from '../_models';
export declare const // --- title start
	getPhones: (axiosInstance?: AxiosInstance) => {
		deletePhones: (
			contactId: string,
			params: DeletePhonesParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsPhoneList>>;
		listPhones: (
			contactId: string,
			params?: ListPhonesParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsPhoneList>>;
		mergePhones: (
			contactId: string,
			contactsInputPhoneNumber: ContactsInputPhoneNumber[],
			params?: MergePhonesParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsPhoneList>>;
		resetPhones: (
			contactId: string,
			contactsInputPhoneNumber: ContactsInputPhoneNumber[],
			params?: ResetPhonesParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsPhoneList>>;
		deletePhone: (
			contactId: string,
			etag: string,
			params?: DeletePhoneParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsPhoneNumber>>;
		locatePhone: (
			contactId: string,
			etag: string,
			params?: LocatePhoneParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsPhoneNumber>>;
		updatePhone2: (
			contactId: string,
			etag: string,
			updatePhone2Body: UpdatePhone2Body,
			params?: UpdatePhone2Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsPhoneList>>;
		updatePhone: (
			contactId: string,
			etag: string,
			updatePhoneBody: UpdatePhoneBody,
			params?: UpdatePhoneParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsPhoneList>>;
	};
export type DeletePhonesResult = AxiosResponse<ContactsPhoneList>;
export type ListPhonesResult = AxiosResponse<ContactsPhoneList>;
export type MergePhonesResult = AxiosResponse<ContactsPhoneList>;
export type ResetPhonesResult = AxiosResponse<ContactsPhoneList>;
export type DeletePhoneResult = AxiosResponse<ContactsPhoneNumber>;
export type LocatePhoneResult = AxiosResponse<ContactsPhoneNumber>;
export type UpdatePhone2Result = AxiosResponse<ContactsPhoneList>;
export type UpdatePhoneResult = AxiosResponse<ContactsPhoneList>;
