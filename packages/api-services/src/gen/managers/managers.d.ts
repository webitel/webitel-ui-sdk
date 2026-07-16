import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	ContactsInputManager,
	ContactsManager,
	ContactsManagerList,
	DeleteManagerParams,
	DeleteManagersParams,
	ListManagersParams,
	LocateManagerParams,
	MergeManagersParams,
	ResetManagersParams,
	UpdateManager2Body,
	UpdateManager2Params,
	UpdateManagerBody,
	UpdateManagerParams,
} from '../_models';
export declare const // --- title start
	getManagers: (axiosInstance?: AxiosInstance) => {
		deleteManagers: (
			contactId: string,
			params: DeleteManagersParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsManager[]>>;
		listManagers: (
			contactId: string,
			params?: ListManagersParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsManagerList>>;
		mergeManagers: (
			contactId: string,
			contactsInputManager: ContactsInputManager[],
			params?: MergeManagersParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsManagerList>>;
		resetManagers: (
			contactId: string,
			contactsInputManager: ContactsInputManager[],
			params?: ResetManagersParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsManagerList>>;
		deleteManager: (
			contactId: string,
			etag: string,
			params?: DeleteManagerParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsManager>>;
		locateManager: (
			contactId: string,
			etag: string,
			params?: LocateManagerParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsManager>>;
		updateManager2: (
			contactId: string,
			etag: string,
			updateManager2Body: UpdateManager2Body,
			params?: UpdateManager2Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsManagerList>>;
		updateManager: (
			contactId: string,
			etag: string,
			updateManagerBody: UpdateManagerBody,
			params?: UpdateManagerParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsManagerList>>;
	};
export type DeleteManagersResult = AxiosResponse<ContactsManager[]>;
export type ListManagersResult = AxiosResponse<ContactsManagerList>;
export type MergeManagersResult = AxiosResponse<ContactsManagerList>;
export type ResetManagersResult = AxiosResponse<ContactsManagerList>;
export type DeleteManagerResult = AxiosResponse<ContactsManager>;
export type LocateManagerResult = AxiosResponse<ContactsManager>;
export type UpdateManager2Result = AxiosResponse<ContactsManagerList>;
export type UpdateManagerResult = AxiosResponse<ContactsManagerList>;
