import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { WfmCreateWorkingScheduleRequest, WfmCreateWorkingScheduleResponse, WfmDeleteWorkingScheduleResponse, WfmReadWorkingScheduleForecastResponse, WfmReadWorkingScheduleResponse, WfmSearchWorkingScheduleResponse, WfmUpdateWorkingScheduleAddAgentsResponse, WfmUpdateWorkingScheduleRemoveAgentResponse, WfmUpdateWorkingScheduleResponse, WorkingScheduleServiceReadWorkingScheduleForecastParams, WorkingScheduleServiceReadWorkingScheduleParams, WorkingScheduleServiceSearchWorkingScheduleParams, WorkingScheduleServiceUpdateWorkingScheduleAddAgentsBody, WorkingScheduleServiceUpdateWorkingScheduleBody } from '../_models';
export declare const // --- title start
getWorkingScheduleService: (axiosInstance?: AxiosInstance) => {
    workingScheduleServiceSearchWorkingSchedule: (params?: WorkingScheduleServiceSearchWorkingScheduleParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WfmSearchWorkingScheduleResponse>>;
    workingScheduleServiceCreateWorkingSchedule: (wfmCreateWorkingScheduleRequest: WfmCreateWorkingScheduleRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<WfmCreateWorkingScheduleResponse>>;
    workingScheduleServiceDeleteWorkingSchedule: (id: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<WfmDeleteWorkingScheduleResponse>>;
    workingScheduleServiceReadWorkingSchedule: (id: string, params?: WorkingScheduleServiceReadWorkingScheduleParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WfmReadWorkingScheduleResponse>>;
    workingScheduleServiceUpdateWorkingScheduleAddAgents: (id: string, workingScheduleServiceUpdateWorkingScheduleAddAgentsBody: WorkingScheduleServiceUpdateWorkingScheduleAddAgentsBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<WfmUpdateWorkingScheduleAddAgentsResponse>>;
    workingScheduleServiceUpdateWorkingScheduleRemoveAgent: (id: string, agentId: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<WfmUpdateWorkingScheduleRemoveAgentResponse>>;
    workingScheduleServiceReadWorkingScheduleForecast: (id: string, params?: WorkingScheduleServiceReadWorkingScheduleForecastParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WfmReadWorkingScheduleForecastResponse>>;
    workingScheduleServiceUpdateWorkingSchedule: (workingScheduleServiceUpdateWorkingScheduleBody: WorkingScheduleServiceUpdateWorkingScheduleBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<WfmUpdateWorkingScheduleResponse>>;
};
export type WorkingScheduleServiceSearchWorkingScheduleResult = AxiosResponse<WfmSearchWorkingScheduleResponse>;
export type WorkingScheduleServiceCreateWorkingScheduleResult = AxiosResponse<WfmCreateWorkingScheduleResponse>;
export type WorkingScheduleServiceDeleteWorkingScheduleResult = AxiosResponse<WfmDeleteWorkingScheduleResponse>;
export type WorkingScheduleServiceReadWorkingScheduleResult = AxiosResponse<WfmReadWorkingScheduleResponse>;
export type WorkingScheduleServiceUpdateWorkingScheduleAddAgentsResult = AxiosResponse<WfmUpdateWorkingScheduleAddAgentsResponse>;
export type WorkingScheduleServiceUpdateWorkingScheduleRemoveAgentResult = AxiosResponse<WfmUpdateWorkingScheduleRemoveAgentResponse>;
export type WorkingScheduleServiceReadWorkingScheduleForecastResult = AxiosResponse<WfmReadWorkingScheduleForecastResponse>;
export type WorkingScheduleServiceUpdateWorkingScheduleResult = AxiosResponse<WfmUpdateWorkingScheduleResponse>;
