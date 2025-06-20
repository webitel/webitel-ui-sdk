/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import axios from '@aliasedDeps/api-services/axios';

import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import type {
	ContactsCreateContactParams,
	ContactsDeleteContactParams,
	ContactsLocateContactParams,
	ContactsSearchContactsParams,
	ContactsUpdateContactBody,
	ContactsUpdateContactParams,
	WebitelContactsContact,
	WebitelContactsContactList,
	WebitelContactsInputContact,
} from '.././_models';

// https://stackoverflow.com/questions/49579094/typescript-conditional-types-filter-out-readonly-properties-pick-only-requir/49579497#49579497
type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
	T,
>() => T extends Y ? 1 : 2
	? A
	: B;

type WritableKeys<T> = {
	[P in keyof T]-?: IfEquals<
		{ [Q in P]: T[P] },
		{ -readonly [Q in P]: T[P] },
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
type NonReadonly<T> = [T] extends [UnionToIntersection<T>]
	? {
			[P in keyof Writable<T>]: T[P] extends object
				? NonReadonly<NonNullable<T[P]>>
				: T[P];
		}
	: DistributeReadOnlyOverUnions<T>;

// --- header start
//

export const // --- title start
	getContacts =
		// --- title end
		() => {
			// --- header end
			/**
 * | Field       | Type 
| ----------- | ---- 
| **----------- READ-ONLY -----------** | 
| `id`        | int64 
| `ver`       | int32 
| `etag`      | string 
| **---------- OPERATIONAL ----------** | 
| `created_at` | int64(epoch:milli) 
| `created_by` | lookup(user) 
| `updated_at` | int64(epoch:milli) 
| `updated_by` | lookup(user) 
| **---------- ATTRIBUTES -----------** | 
| `name`      | name! 
| `about`     | string 
| `labels`    | list[label!] 
| `emails`    | list[email!] 
| `photos`    | list[photo!] 
| `phones`    | list[phone!] 
| `managers`  | list[manager!] 
| `comments`  | list[comment!] 
| `addresses` | list[address!] 
| `languages` | list[language!] 
| `timezones` | list[timezone!] 
| `variables` | list[variable!] 
| `imclients` | list[imClient!] 

 * @summary Search for Contact(s)
 */
			const contactsSearchContacts = <
				TData = AxiosResponse<WebitelContactsContactList>,
			>(
				params?: ContactsSearchContactsParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get('/contacts', {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			/**
			 * @summary Create NEW Contact
			 */
			const contactsCreateContact = <
				TData = AxiosResponse<WebitelContactsContact>,
			>(
				webitelContactsInputContact: NonReadonly<WebitelContactsInputContact>,
				params?: ContactsCreateContactParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.post('/contacts', webitelContactsInputContact, {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			/**
			 * @summary Remove Contact source
			 */
			const contactsDeleteContact = <
				TData = AxiosResponse<WebitelContactsContact>,
			>(
				etag: string,
				params?: ContactsDeleteContactParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.delete(`/contacts/${etag}`, {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			/**
			 * @summary Locate Contact source
			 */
			const contactsLocateContact = <
				TData = AxiosResponse<WebitelContactsContact>,
			>(
				etag: string,
				params?: ContactsLocateContactParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get(`/contacts/${etag}`, {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			/**
			 * @summary NEW Update of the Contact source
			 */
			const contactsUpdateContact = <
				TData = AxiosResponse<WebitelContactsContact>,
			>(
				etag: string,
				contactsUpdateContactBody: NonReadonly<ContactsUpdateContactBody>,
				params?: ContactsUpdateContactParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.patch(`/contacts/${etag}`, contactsUpdateContactBody, {
					...options,
					params: { ...params, ...options?.params },
				});
			};

			// --- footer start
			return {
				contactsSearchContacts,
				contactsCreateContact,
				contactsDeleteContact,
				contactsLocateContact,
				contactsUpdateContact,
			};
		};
export type ContactsSearchContactsResult =
	AxiosResponse<WebitelContactsContactList>;
export type ContactsCreateContactResult = AxiosResponse<WebitelContactsContact>;
export type ContactsDeleteContactResult = AxiosResponse<WebitelContactsContact>;
export type ContactsLocateContactResult = AxiosResponse<WebitelContactsContact>;
export type ContactsUpdateContactResult = AxiosResponse<WebitelContactsContact>;

// --- footer end
