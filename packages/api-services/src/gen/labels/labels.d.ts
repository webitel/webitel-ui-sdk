import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	ContactsInputLabel,
	ContactsLabelList,
	ContactsLabelTags,
	DeleteLabelsParams,
	GetLabelsParams,
	ListLabelsParams,
	MergeLabelsParams,
	ResetLabelsParams,
} from '../_models';
export declare const // --- title start
	getLabels: (axiosInstance?: AxiosInstance) => {
		getLabels: (
			params?: GetLabelsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsLabelTags>>;
		deleteLabels: (
			contactId: string,
			params: DeleteLabelsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsLabelList>>;
		listLabels: (
			contactId: string,
			params?: ListLabelsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsLabelList>>;
		mergeLabels: (
			contactId: string,
			contactsInputLabel: ContactsInputLabel[],
			params?: MergeLabelsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsLabelList>>;
		resetLabels: (
			contactId: string,
			contactsInputLabel: ContactsInputLabel[],
			params?: ResetLabelsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsLabelList>>;
	};
export type GetLabelsResult = AxiosResponse<ContactsLabelTags>;
export type DeleteLabelsResult = AxiosResponse<ContactsLabelList>;
export type ListLabelsResult = AxiosResponse<ContactsLabelList>;
export type MergeLabelsResult = AxiosResponse<ContactsLabelList>;
export type ResetLabelsResult = AxiosResponse<ContactsLabelList>;
