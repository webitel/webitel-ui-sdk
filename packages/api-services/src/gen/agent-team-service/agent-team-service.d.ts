import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	DeleteAgentTeamParams,
	EngineAgentTeam,
	EngineAgentTeamServiceUpdateAgentTeamBody,
	EngineCreateAgentTeamRequest,
	EngineListAgentTeam,
	ReadAgentTeamParams,
	SearchAgentTeamParams,
} from '../_models';
export declare const // --- title start
	getAgentTeamService: (axiosInstance?: AxiosInstance) => {
		searchAgentTeam: (
			params?: SearchAgentTeamParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListAgentTeam>>;
		createAgentTeam: (
			engineCreateAgentTeamRequest: EngineCreateAgentTeamRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAgentTeam>>;
		deleteAgentTeam: (
			id: string,
			params?: DeleteAgentTeamParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAgentTeam>>;
		readAgentTeam: (
			id: string,
			params?: ReadAgentTeamParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAgentTeam>>;
		updateAgentTeam: (
			id: string,
			engineAgentTeamServiceUpdateAgentTeamBody: EngineAgentTeamServiceUpdateAgentTeamBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAgentTeam>>;
	};
export type SearchAgentTeamResult = AxiosResponse<EngineListAgentTeam>;
export type CreateAgentTeamResult = AxiosResponse<EngineAgentTeam>;
export type DeleteAgentTeamResult = AxiosResponse<EngineAgentTeam>;
export type ReadAgentTeamResult = AxiosResponse<EngineAgentTeam>;
export type UpdateAgentTeamResult = AxiosResponse<EngineAgentTeam>;
