import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	EngineAuditForm,
	EngineAuditFormServicePatchAuditFormBody,
	EngineAuditFormServiceUpdateAuditFormBody,
	EngineAuditFormServiceUpdateAuditRateBody,
	EngineAuditRate,
	EngineCreateAuditFormRateRequest,
	EngineCreateAuditFormRequest,
	EngineListAuditForm,
	EngineListAuditRate,
	SearchAuditFormParams,
	SearchAuditRateParams,
} from '../_models';
export declare const // --- title start
	getAuditFormService: (axiosInstance?: AxiosInstance) => {
		searchAuditForm: (
			params?: SearchAuditFormParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListAuditForm>>;
		createAuditForm: (
			engineCreateAuditFormRequest: EngineCreateAuditFormRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAuditForm>>;
		searchAuditRate: (
			formId: number,
			params?: SearchAuditRateParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListAuditRate>>;
		deleteAuditForm: (
			id: number,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAuditForm>>;
		readAuditForm: (
			id: number,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAuditForm>>;
		patchAuditForm: (
			id: number,
			engineAuditFormServicePatchAuditFormBody: EngineAuditFormServicePatchAuditFormBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAuditForm>>;
		updateAuditForm: (
			id: number,
			engineAuditFormServiceUpdateAuditFormBody: EngineAuditFormServiceUpdateAuditFormBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAuditForm>>;
		createAuditFormRate: (
			engineCreateAuditFormRateRequest: EngineCreateAuditFormRateRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAuditRate>>;
		deleteAuditRate: (
			id: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAuditRate>>;
		readAuditRate: (
			id: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAuditRate>>;
		updateAuditRate: (
			id: string,
			engineAuditFormServiceUpdateAuditRateBody: EngineAuditFormServiceUpdateAuditRateBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAuditRate>>;
	};
export type SearchAuditFormResult = AxiosResponse<EngineListAuditForm>;
export type CreateAuditFormResult = AxiosResponse<EngineAuditForm>;
export type SearchAuditRateResult = AxiosResponse<EngineListAuditRate>;
export type DeleteAuditFormResult = AxiosResponse<EngineAuditForm>;
export type ReadAuditFormResult = AxiosResponse<EngineAuditForm>;
export type PatchAuditFormResult = AxiosResponse<EngineAuditForm>;
export type UpdateAuditFormResult = AxiosResponse<EngineAuditForm>;
export type CreateAuditFormRateResult = AxiosResponse<EngineAuditRate>;
export type DeleteAuditRateResult = AxiosResponse<EngineAuditRate>;
export type ReadAuditRateResult = AxiosResponse<EngineAuditRate>;
export type UpdateAuditRateResult = AxiosResponse<EngineAuditRate>;
