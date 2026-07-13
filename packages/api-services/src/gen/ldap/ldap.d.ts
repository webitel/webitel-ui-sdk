import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	ApiDeleteLDAPRequest,
	ApiLDAPCatalog,
	ApiLDAProcess,
	ApiLDAProcessResponse,
	ApiLDAPSearchRequest,
	ApiLDAPSearchResponse,
	ApiLDAPTemplate,
	ApiLDAPTemplateResponse,
	ApiSearchLDAPResponse,
	DeleteLDAPCatalogParams,
	LDAPCreateLDAPTemplateBody,
	LDAPDeleteLDAPTemplateBody,
	LDAPLDAPSearchBody,
	LDAPResyncLDAPCatalogBody,
	LDAPSearch2Params,
	LDAPSearch4Params,
	LDAPUpdateLDAPCatalogBody,
	LDAPUpdateLDAPTemplateBody,
	LocateLDAPCatalogParams,
	LocateLDAProcessParams,
	LocateLDAPTemplateParams,
	SearchLDAPCatalogParams,
	SearchLDAProcessParams,
	SearchLDAPTemplateParams,
} from '../_models';
export declare const // --- title start
	getLdap: (axiosInstance?: AxiosInstance) => {
		deleteLDAPCatalog2: (
			apiDeleteLDAPRequest: ApiDeleteLDAPRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiLDAPCatalog>>;
		searchLDAPCatalog: (
			params?: SearchLDAPCatalogParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiSearchLDAPResponse>>;
		createLDAPCatalog: (
			apiLDAPCatalog: ApiLDAPCatalog,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiLDAPCatalog>>;
		lDAPSearch4: (
			params?: LDAPSearch4Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiLDAPSearchResponse>>;
		lDAPSearch3: (
			apiLDAPSearchRequest: ApiLDAPSearchRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiLDAPSearchResponse>>;
		updateLDAPCatalog2: (
			lDAPUpdateLDAPCatalogBody: LDAPUpdateLDAPCatalogBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiLDAPCatalog>>;
		updateLDAPCatalog: (
			lDAPUpdateLDAPCatalogBody: LDAPUpdateLDAPCatalogBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiLDAPCatalog>>;
		createLDAPTemplate: (
			lDAPCreateLDAPTemplateBody: LDAPCreateLDAPTemplateBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiLDAPTemplate>>;
		searchLDAProcess: (
			catalogId: string,
			params?: SearchLDAProcessParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiLDAProcessResponse>>;
		resyncLDAPCatalog: (
			catalogId: string,
			lDAPResyncLDAPCatalogBody: LDAPResyncLDAPCatalogBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiLDAProcess>>;
		locateLDAProcess: (
			catalogId: string,
			id: string[],
			params?: LocateLDAProcessParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiLDAProcess>>;
		lDAPSearch2: (
			catalogId: string,
			params?: LDAPSearch2Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiLDAPSearchResponse>>;
		lDAPSearch: (
			catalogId: string,
			lDAPLDAPSearchBody: LDAPLDAPSearchBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiLDAPSearchResponse>>;
		deleteLDAPTemplate2: (
			catalogId: string,
			lDAPDeleteLDAPTemplateBody: LDAPDeleteLDAPTemplateBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiLDAPTemplateResponse>>;
		searchLDAPTemplate: (
			catalogId: string,
			params?: SearchLDAPTemplateParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiLDAPTemplateResponse>>;
		deleteLDAPTemplate: (
			catalogId: string,
			id: string[],
			lDAPDeleteLDAPTemplateBody: LDAPDeleteLDAPTemplateBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiLDAPTemplateResponse>>;
		locateLDAPTemplate: (
			catalogId: string,
			id: string[],
			params?: LocateLDAPTemplateParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiLDAPTemplate>>;
		deleteLDAPCatalog: (
			id: string,
			params?: DeleteLDAPCatalogParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiLDAPCatalog>>;
		locateLDAPCatalog: (
			id: string[],
			params?: LocateLDAPCatalogParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiLDAPCatalog>>;
		updateLDAPTemplate: (
			lDAPUpdateLDAPTemplateBody: LDAPUpdateLDAPTemplateBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiLDAPTemplate>>;
		updateLDAPTemplate2: (
			lDAPUpdateLDAPTemplateBody: LDAPUpdateLDAPTemplateBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiLDAPTemplate>>;
	};
export type DeleteLDAPCatalog2Result = AxiosResponse<ApiLDAPCatalog>;
export type SearchLDAPCatalogResult = AxiosResponse<ApiSearchLDAPResponse>;
export type CreateLDAPCatalogResult = AxiosResponse<ApiLDAPCatalog>;
export type LDAPSearch4Result = AxiosResponse<ApiLDAPSearchResponse>;
export type LDAPSearch3Result = AxiosResponse<ApiLDAPSearchResponse>;
export type UpdateLDAPCatalog2Result = AxiosResponse<ApiLDAPCatalog>;
export type UpdateLDAPCatalogResult = AxiosResponse<ApiLDAPCatalog>;
export type CreateLDAPTemplateResult = AxiosResponse<ApiLDAPTemplate>;
export type SearchLDAProcessResult = AxiosResponse<ApiLDAProcessResponse>;
export type ResyncLDAPCatalogResult = AxiosResponse<ApiLDAProcess>;
export type LocateLDAProcessResult = AxiosResponse<ApiLDAProcess>;
export type LDAPSearch2Result = AxiosResponse<ApiLDAPSearchResponse>;
export type LDAPSearchResult = AxiosResponse<ApiLDAPSearchResponse>;
export type DeleteLDAPTemplate2Result = AxiosResponse<ApiLDAPTemplateResponse>;
export type SearchLDAPTemplateResult = AxiosResponse<ApiLDAPTemplateResponse>;
export type DeleteLDAPTemplateResult = AxiosResponse<ApiLDAPTemplateResponse>;
export type LocateLDAPTemplateResult = AxiosResponse<ApiLDAPTemplate>;
export type DeleteLDAPCatalogResult = AxiosResponse<ApiLDAPCatalog>;
export type LocateLDAPCatalogResult = AxiosResponse<ApiLDAPCatalog>;
export type UpdateLDAPTemplateResult = AxiosResponse<ApiLDAPTemplate>;
export type UpdateLDAPTemplate2Result = AxiosResponse<ApiLDAPTemplate>;
