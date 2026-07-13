import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	ContactsInputPhoto,
	ContactsPhoto,
	ContactsPhotoList,
	CreatePhotosParams,
	DeletePhotoParams,
	DeletePhotosParams,
	LocatePhotoParams,
	SearchPhotosParams,
	UpdatePhoto2Body,
	UpdatePhoto2Params,
	UpdatePhotoBody,
	UpdatePhotoParams,
	UpdatePhotosParams,
} from '../_models';
export declare const // --- title start
	getPhotos: (axiosInstance?: AxiosInstance) => {
		deletePhotos: (
			contactId: string,
			params: DeletePhotosParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsPhotoList>>;
		searchPhotos: (
			contactId: string,
			params?: SearchPhotosParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsPhotoList>>;
		createPhotos: (
			contactId: string,
			contactsInputPhoto: ContactsInputPhoto[],
			params?: CreatePhotosParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsPhotoList>>;
		updatePhotos: (
			contactId: string,
			contactsInputPhoto: ContactsInputPhoto[],
			params?: UpdatePhotosParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsPhotoList>>;
		deletePhoto: (
			contactId: string,
			etag: string,
			params?: DeletePhotoParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsPhoto>>;
		updatePhoto2: (
			contactId: string,
			etag: string,
			updatePhoto2Body: UpdatePhoto2Body,
			params?: UpdatePhoto2Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsPhoto>>;
		updatePhoto: (
			contactId: string,
			etag: string,
			updatePhotoBody: UpdatePhotoBody,
			params?: UpdatePhotoParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsPhoto>>;
		locatePhoto: (
			contactId: string,
			id: string,
			params?: LocatePhotoParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsPhoto>>;
	};
export type DeletePhotosResult = AxiosResponse<ContactsPhotoList>;
export type SearchPhotosResult = AxiosResponse<ContactsPhotoList>;
export type CreatePhotosResult = AxiosResponse<ContactsPhotoList>;
export type UpdatePhotosResult = AxiosResponse<ContactsPhotoList>;
export type DeletePhotoResult = AxiosResponse<ContactsPhoto>;
export type UpdatePhoto2Result = AxiosResponse<ContactsPhoto>;
export type UpdatePhotoResult = AxiosResponse<ContactsPhoto>;
export type LocatePhotoResult = AxiosResponse<ContactsPhoto>;
