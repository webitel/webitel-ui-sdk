import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { AgentWorkingScheduleServiceCreateAgentsWorkingScheduleShiftsBody, AgentWorkingScheduleServiceSearchAgentsWorkingScheduleParams, WfmCreateAgentsWorkingScheduleShiftsResponse, WfmSearchAgentsWorkingScheduleResponse } from '../_models';
export declare const // --- title start
getAgentWorkingScheduleService: (axiosInstance?: AxiosInstance) => {
    agentWorkingScheduleServiceSearchAgentsWorkingSchedule: (workingScheduleId: string, params?: AgentWorkingScheduleServiceSearchAgentsWorkingScheduleParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WfmSearchAgentsWorkingScheduleResponse>>;
    agentWorkingScheduleServiceCreateAgentsWorkingScheduleShifts: (workingScheduleId: string, agentWorkingScheduleServiceCreateAgentsWorkingScheduleShiftsBody: AgentWorkingScheduleServiceCreateAgentsWorkingScheduleShiftsBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<WfmCreateAgentsWorkingScheduleShiftsResponse>>;
};
export type AgentWorkingScheduleServiceSearchAgentsWorkingScheduleResult = AxiosResponse<WfmSearchAgentsWorkingScheduleResponse>;
export type AgentWorkingScheduleServiceCreateAgentsWorkingScheduleShiftsResult = AxiosResponse<WfmCreateAgentsWorkingScheduleShiftsResponse>;
