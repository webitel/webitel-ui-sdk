/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import axios from '@aliasedDeps/api-services/axios';

import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import type {
	AgentWorkingScheduleServiceCreateAgentsWorkingScheduleShiftsBody,
	AgentWorkingScheduleServiceSearchAgentsWorkingScheduleParams,
	WfmCreateAgentsWorkingScheduleShiftsResponse,
	WfmSearchAgentsWorkingScheduleResponse,
} from '.././_models';

// --- header start
//

export const // --- title start
	getAgentWorkingScheduleService =
		// --- title end
		() => {
			// --- header end
			const agentWorkingScheduleServiceSearchAgentsWorkingSchedule = <
				TData = AxiosResponse<WfmSearchAgentsWorkingScheduleResponse>,
			>(
				workingScheduleId: string,
				params?: AgentWorkingScheduleServiceSearchAgentsWorkingScheduleParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get(`/wfm/agents/working_schedules/${workingScheduleId}`, {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			const agentWorkingScheduleServiceCreateAgentsWorkingScheduleShifts = <
				TData = AxiosResponse<WfmCreateAgentsWorkingScheduleShiftsResponse>,
			>(
				workingScheduleId: string,
				agentWorkingScheduleServiceCreateAgentsWorkingScheduleShiftsBody: AgentWorkingScheduleServiceCreateAgentsWorkingScheduleShiftsBody,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.post(
					`/wfm/agents/working_schedules/${workingScheduleId}`,
					agentWorkingScheduleServiceCreateAgentsWorkingScheduleShiftsBody,
					options,
				);
			};

			// --- footer start
			return {
				agentWorkingScheduleServiceSearchAgentsWorkingSchedule,
				agentWorkingScheduleServiceCreateAgentsWorkingScheduleShifts,
			};
		};
export type AgentWorkingScheduleServiceSearchAgentsWorkingScheduleResult =
	AxiosResponse<WfmSearchAgentsWorkingScheduleResponse>;
export type AgentWorkingScheduleServiceCreateAgentsWorkingScheduleShiftsResult =
	AxiosResponse<WfmCreateAgentsWorkingScheduleShiftsResponse>;

// --- footer end
