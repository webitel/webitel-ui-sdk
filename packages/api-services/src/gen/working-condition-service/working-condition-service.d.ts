import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	WfmCreateWorkingConditionRequest,
	WfmCreateWorkingConditionResponse,
	WfmDeleteWorkingConditionResponse,
	WfmReadWorkingConditionResponse,
	WfmSearchWorkingConditionResponse,
	WfmUpdateWorkingConditionResponse,
	WorkingConditionServiceReadWorkingConditionParams,
	WorkingConditionServiceSearchWorkingConditionParams,
	WorkingConditionServiceUpdateWorkingConditionBody,
} from '../_models';
export declare const // --- title start
	getWorkingConditionService: (axiosInstance?: AxiosInstance) => {
		workingConditionServiceSearchWorkingCondition: (
			params?: WorkingConditionServiceSearchWorkingConditionParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WfmSearchWorkingConditionResponse>>;
		workingConditionServiceCreateWorkingCondition: (
			wfmCreateWorkingConditionRequest: WfmCreateWorkingConditionRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WfmCreateWorkingConditionResponse>>;
		workingConditionServiceDeleteWorkingCondition: (
			id: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WfmDeleteWorkingConditionResponse>>;
		workingConditionServiceReadWorkingCondition: (
			id: string,
			params?: WorkingConditionServiceReadWorkingConditionParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WfmReadWorkingConditionResponse>>;
		workingConditionServiceUpdateWorkingCondition: (
			workingConditionServiceUpdateWorkingConditionBody: WorkingConditionServiceUpdateWorkingConditionBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WfmUpdateWorkingConditionResponse>>;
	};
export type WorkingConditionServiceSearchWorkingConditionResult =
	AxiosResponse<WfmSearchWorkingConditionResponse>;
export type WorkingConditionServiceCreateWorkingConditionResult =
	AxiosResponse<WfmCreateWorkingConditionResponse>;
export type WorkingConditionServiceDeleteWorkingConditionResult =
	AxiosResponse<WfmDeleteWorkingConditionResponse>;
export type WorkingConditionServiceReadWorkingConditionResult =
	AxiosResponse<WfmReadWorkingConditionResponse>;
export type WorkingConditionServiceUpdateWorkingConditionResult =
	AxiosResponse<WfmUpdateWorkingConditionResponse>;
