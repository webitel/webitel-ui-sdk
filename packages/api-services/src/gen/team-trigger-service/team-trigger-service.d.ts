import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	EngineListTeamTrigger,
	EngineRunTeamTriggerResponse,
	EngineTeamTrigger,
	EngineTeamTriggerServiceCreateTeamTriggerBody,
	EngineTeamTriggerServicePatchTeamTriggerBody,
	EngineTeamTriggerServiceRunTeamTriggerBody,
	EngineTeamTriggerServiceUpdateTeamTriggerBody,
	SearchAgentTriggerParams,
	SearchTeamTriggerParams,
} from '../_models';
export declare const // --- title start
	getTeamTriggerService: (axiosInstance?: AxiosInstance) => {
		searchAgentTrigger: (
			params?: SearchAgentTriggerParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListTeamTrigger>>;
		runTeamTrigger: (
			triggerId: number,
			engineTeamTriggerServiceRunTeamTriggerBody: EngineTeamTriggerServiceRunTeamTriggerBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineRunTeamTriggerResponse>>;
		searchTeamTrigger: (
			teamId: string,
			params?: SearchTeamTriggerParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListTeamTrigger>>;
		createTeamTrigger: (
			teamId: string,
			engineTeamTriggerServiceCreateTeamTriggerBody: EngineTeamTriggerServiceCreateTeamTriggerBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineTeamTrigger>>;
		deleteTeamTrigger: (
			teamId: string,
			id: number,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineTeamTrigger>>;
		readTeamTrigger: (
			teamId: string,
			id: number,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineTeamTrigger>>;
		patchTeamTrigger: (
			teamId: string,
			id: number,
			engineTeamTriggerServicePatchTeamTriggerBody: EngineTeamTriggerServicePatchTeamTriggerBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineTeamTrigger>>;
		updateTeamTrigger: (
			teamId: string,
			id: number,
			engineTeamTriggerServiceUpdateTeamTriggerBody: EngineTeamTriggerServiceUpdateTeamTriggerBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineTeamTrigger>>;
	};
export type SearchAgentTriggerResult = AxiosResponse<EngineListTeamTrigger>;
export type RunTeamTriggerResult = AxiosResponse<EngineRunTeamTriggerResponse>;
export type SearchTeamTriggerResult = AxiosResponse<EngineListTeamTrigger>;
export type CreateTeamTriggerResult = AxiosResponse<EngineTeamTrigger>;
export type DeleteTeamTriggerResult = AxiosResponse<EngineTeamTrigger>;
export type ReadTeamTriggerResult = AxiosResponse<EngineTeamTrigger>;
export type PatchTeamTriggerResult = AxiosResponse<EngineTeamTrigger>;
export type UpdateTeamTriggerResult = AxiosResponse<EngineTeamTrigger>;
