import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	ContactsSearchParams,
	WebitelImApiGatewayV1ContactList,
} from '../_models';
export declare const // --- title start
	getWebitelImApiGatewayV1Contacts: (axiosInstance?: AxiosInstance) => {
		contactsSearch: (
			params?: ContactsSearchParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelImApiGatewayV1ContactList>>;
	};
export type ContactsSearchResult =
	AxiosResponse<WebitelImApiGatewayV1ContactList>;
