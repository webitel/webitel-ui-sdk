import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	AgentAbsenceServiceCreateAgentAbsenceBody,
	AgentAbsenceServiceSearchAgentAbsenceParams,
	AgentAbsenceServiceSearchAgentsAbsencesParams,
	AgentAbsenceServiceUpdateAgentAbsenceBody,
	WfmCreateAgentAbsenceResponse,
	WfmCreateAgentsAbsencesRequest,
	WfmCreateAgentsAbsencesResponse,
	WfmDeleteAgentAbsenceResponse,
	WfmReadAgentAbsenceResponse,
	WfmSearchAgentAbsenceResponse,
	WfmSearchAgentsAbsencesResponse,
	WfmUpdateAgentAbsenceResponse,
} from '../_models';
export declare const // --- title start
	getAgentAbsenceService: (axiosInstance?: AxiosInstance) => {
		agentAbsenceServiceSearchAgentsAbsences: (
			params?: AgentAbsenceServiceSearchAgentsAbsencesParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WfmSearchAgentsAbsencesResponse>>;
		agentAbsenceServiceCreateAgentsAbsences: (
			wfmCreateAgentsAbsencesRequest: WfmCreateAgentsAbsencesRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WfmCreateAgentsAbsencesResponse>>;
		agentAbsenceServiceSearchAgentAbsence: (
			agentId: string,
			params?: AgentAbsenceServiceSearchAgentAbsenceParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WfmSearchAgentAbsenceResponse>>;
		agentAbsenceServiceCreateAgentAbsence: (
			agentId: string,
			agentAbsenceServiceCreateAgentAbsenceBody: AgentAbsenceServiceCreateAgentAbsenceBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WfmCreateAgentAbsenceResponse>>;
		agentAbsenceServiceDeleteAgentAbsence: (
			agentId: string,
			id: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WfmDeleteAgentAbsenceResponse>>;
		agentAbsenceServiceReadAgentAbsence: (
			agentId: string,
			id: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WfmReadAgentAbsenceResponse>>;
		agentAbsenceServiceUpdateAgentAbsence: (
			agentId: string,
			agentAbsenceServiceUpdateAgentAbsenceBody: AgentAbsenceServiceUpdateAgentAbsenceBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WfmUpdateAgentAbsenceResponse>>;
	};
export type AgentAbsenceServiceSearchAgentsAbsencesResult =
	AxiosResponse<WfmSearchAgentsAbsencesResponse>;
export type AgentAbsenceServiceCreateAgentsAbsencesResult =
	AxiosResponse<WfmCreateAgentsAbsencesResponse>;
export type AgentAbsenceServiceSearchAgentAbsenceResult =
	AxiosResponse<WfmSearchAgentAbsenceResponse>;
export type AgentAbsenceServiceCreateAgentAbsenceResult =
	AxiosResponse<WfmCreateAgentAbsenceResponse>;
export type AgentAbsenceServiceDeleteAgentAbsenceResult =
	AxiosResponse<WfmDeleteAgentAbsenceResponse>;
export type AgentAbsenceServiceReadAgentAbsenceResult =
	AxiosResponse<WfmReadAgentAbsenceResponse>;
export type AgentAbsenceServiceUpdateAgentAbsenceResult =
	AxiosResponse<WfmUpdateAgentAbsenceResponse>;
