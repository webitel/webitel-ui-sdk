import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	LinkCommunicationParams,
	ListCommunicationsParams,
	UnlinkCommunicationParams,
	WebitelCasesInputCaseCommunication,
	WebitelCasesLinkCommunicationResponse,
	WebitelCasesListCommunicationsResponse,
	WebitelCasesUnlinkCommunicationResponse,
} from '../_models';
export declare const // --- title start
	getCaseCommunications: (axiosInstance?: AxiosInstance) => {
		listCommunications: (
			caseEtag: string,
			params?: ListCommunicationsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesListCommunicationsResponse>>;
		linkCommunication: (
			caseEtag: string,
			webitelCasesInputCaseCommunication: WebitelCasesInputCaseCommunication,
			params?: LinkCommunicationParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesLinkCommunicationResponse>>;
		unlinkCommunication: (
			caseEtag: string,
			id: string,
			params?: UnlinkCommunicationParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesUnlinkCommunicationResponse>>;
	};
export type ListCommunicationsResult =
	AxiosResponse<WebitelCasesListCommunicationsResponse>;
export type LinkCommunicationResult =
	AxiosResponse<WebitelCasesLinkCommunicationResponse>;
export type UnlinkCommunicationResult =
	AxiosResponse<WebitelCasesUnlinkCommunicationResponse>;
