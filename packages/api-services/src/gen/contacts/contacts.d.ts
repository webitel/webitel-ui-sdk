import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	ContactsContactList,
	ContactsCreateContactsBulkResponse,
	ContactsInputContact,
	CreateContactParams,
	CreateContactsParams,
	DeleteContactParams,
	LocateContactParams,
	SearchContactsParams,
	UpdateContactBody,
	UpdateContactParams,
	WebitelContactsContact,
} from '../_models';
type IfEquals<X, Y, A = X, B = never> =
	(<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;
type WritableKeys<T> = {
	[P in keyof T]-?: IfEquals<
		{
			[Q in P]: T[P];
		},
		{
			-readonly [Q in P]: T[P];
		},
		P
	>;
}[keyof T];
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
	k: infer I,
) => void
	? I
	: never;
type DistributeReadOnlyOverUnions<T> = T extends any ? NonReadonly<T> : never;
type Writable<T> = Pick<T, WritableKeys<T>>;
type NonReadonly<T> = [
	T,
] extends [
	UnionToIntersection<T>,
]
	? {
			[P in keyof Writable<T>]: T[P] extends object
				? NonReadonly<NonNullable<T[P]>>
				: T[P];
		}
	: DistributeReadOnlyOverUnions<T>;
export declare const // --- title start
	getContacts: (axiosInstance?: AxiosInstance) => {
		searchContacts: (
			params?: SearchContactsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsContactList>>;
		createContact: (
			contactsInputContact: NonReadonly<ContactsInputContact>,
			params?: CreateContactParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelContactsContact>>;
		createContacts: (
			contactsInputContact: NonReadonly<ContactsInputContact[]>,
			params?: CreateContactsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsCreateContactsBulkResponse>>;
		deleteContact: (
			etag: string,
			params?: DeleteContactParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelContactsContact>>;
		locateContact: (
			etag: string,
			params?: LocateContactParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelContactsContact>>;
		updateContact: (
			etag: string,
			updateContactBody: NonReadonly<UpdateContactBody>,
			params?: UpdateContactParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelContactsContact>>;
	};
export type SearchContactsResult = AxiosResponse<ContactsContactList>;
export type CreateContactResult = AxiosResponse<WebitelContactsContact>;
export type CreateContactsResult =
	AxiosResponse<ContactsCreateContactsBulkResponse>;
export type DeleteContactResult = AxiosResponse<WebitelContactsContact>;
export type LocateContactResult = AxiosResponse<WebitelContactsContact>;
export type UpdateContactResult = AxiosResponse<WebitelContactsContact>;
export {};
