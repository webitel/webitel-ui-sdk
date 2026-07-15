import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	ShiftTemplateServiceReadShiftTemplateParams,
	ShiftTemplateServiceSearchShiftTemplateParams,
	ShiftTemplateServiceUpdateShiftTemplateBody,
	WfmCreateShiftTemplateRequest,
	WfmCreateShiftTemplateResponse,
	WfmDeleteShiftTemplateResponse,
	WfmReadShiftTemplateResponse,
	WfmSearchShiftTemplateResponse,
	WfmUpdateShiftTemplateResponse,
} from '../_models';
export declare const // --- title start
	getShiftTemplateService: (axiosInstance?: AxiosInstance) => {
		shiftTemplateServiceSearchShiftTemplate: (
			params?: ShiftTemplateServiceSearchShiftTemplateParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WfmSearchShiftTemplateResponse>>;
		shiftTemplateServiceCreateShiftTemplate: (
			wfmCreateShiftTemplateRequest: WfmCreateShiftTemplateRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WfmCreateShiftTemplateResponse>>;
		shiftTemplateServiceDeleteShiftTemplate: (
			id: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WfmDeleteShiftTemplateResponse>>;
		shiftTemplateServiceReadShiftTemplate: (
			id: string,
			params?: ShiftTemplateServiceReadShiftTemplateParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WfmReadShiftTemplateResponse>>;
		shiftTemplateServiceUpdateShiftTemplate: (
			shiftTemplateServiceUpdateShiftTemplateBody: ShiftTemplateServiceUpdateShiftTemplateBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WfmUpdateShiftTemplateResponse>>;
	};
export type ShiftTemplateServiceSearchShiftTemplateResult =
	AxiosResponse<WfmSearchShiftTemplateResponse>;
export type ShiftTemplateServiceCreateShiftTemplateResult =
	AxiosResponse<WfmCreateShiftTemplateResponse>;
export type ShiftTemplateServiceDeleteShiftTemplateResult =
	AxiosResponse<WfmDeleteShiftTemplateResponse>;
export type ShiftTemplateServiceReadShiftTemplateResult =
	AxiosResponse<WfmReadShiftTemplateResponse>;
export type ShiftTemplateServiceUpdateShiftTemplateResult =
	AxiosResponse<WfmUpdateShiftTemplateResponse>;
