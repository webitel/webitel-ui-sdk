import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	AgentWorkingConditionsServiceUpdateAgentWorkingConditionsBody,
	WfmReadAgentWorkingConditionsResponse,
	WfmUpdateAgentWorkingConditionsResponse,
} from '../_models';
export declare const // --- title start
	getAgentWorkingConditionsService: (axiosInstance?: AxiosInstance) => {
		agentWorkingConditionsServiceReadAgentWorkingConditions: (
			agentId: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WfmReadAgentWorkingConditionsResponse>>;
		agentWorkingConditionsServiceUpdateAgentWorkingConditions: (
			agentId: string,
			agentWorkingConditionsServiceUpdateAgentWorkingConditionsBody: AgentWorkingConditionsServiceUpdateAgentWorkingConditionsBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WfmUpdateAgentWorkingConditionsResponse>>;
	};
export type AgentWorkingConditionsServiceReadAgentWorkingConditionsResult =
	AxiosResponse<WfmReadAgentWorkingConditionsResponse>;
export type AgentWorkingConditionsServiceUpdateAgentWorkingConditionsResult =
	AxiosResponse<WfmUpdateAgentWorkingConditionsResponse>;
