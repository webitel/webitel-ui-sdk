import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	EngineAgentPauseCause,
	EngineAgentPauseCauseServicePatchAgentPauseCauseBody,
	EngineAgentPauseCauseServiceUpdateAgentPauseCauseBody,
	EngineCreateAgentPauseCauseRequest,
	EngineListAgentPauseCause,
	SearchAgentPauseCauseParams,
} from '../_models';
export declare const // --- title start
	getAgentPauseCauseService: (axiosInstance?: AxiosInstance) => {
		searchAgentPauseCause: (
			params?: SearchAgentPauseCauseParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListAgentPauseCause>>;
		createAgentPauseCause: (
			engineCreateAgentPauseCauseRequest: EngineCreateAgentPauseCauseRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAgentPauseCause>>;
		deleteAgentPauseCause: (
			id: number,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAgentPauseCause>>;
		readAgentPauseCause: (
			id: number,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAgentPauseCause>>;
		patchAgentPauseCause: (
			id: number,
			engineAgentPauseCauseServicePatchAgentPauseCauseBody: EngineAgentPauseCauseServicePatchAgentPauseCauseBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAgentPauseCause>>;
		updateAgentPauseCause: (
			id: number,
			engineAgentPauseCauseServiceUpdateAgentPauseCauseBody: EngineAgentPauseCauseServiceUpdateAgentPauseCauseBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAgentPauseCause>>;
	};
export type SearchAgentPauseCauseResult =
	AxiosResponse<EngineListAgentPauseCause>;
export type CreateAgentPauseCauseResult = AxiosResponse<EngineAgentPauseCause>;
export type DeleteAgentPauseCauseResult = AxiosResponse<EngineAgentPauseCause>;
export type ReadAgentPauseCauseResult = AxiosResponse<EngineAgentPauseCause>;
export type PatchAgentPauseCauseResult = AxiosResponse<EngineAgentPauseCause>;
export type UpdateAgentPauseCauseResult = AxiosResponse<EngineAgentPauseCause>;
