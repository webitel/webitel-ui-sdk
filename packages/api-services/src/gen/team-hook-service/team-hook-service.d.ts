import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	EngineListTeamHook,
	EngineTeamHook,
	EngineTeamHookServiceCreateTeamHookBody,
	EngineTeamHookServicePatchTeamHookBody,
	EngineTeamHookServiceUpdateTeamHookBody,
	SearchTeamHookParams,
} from '../_models';
export declare const // --- title start
	getTeamHookService: (axiosInstance?: AxiosInstance) => {
		searchTeamHook: (
			teamId: string,
			params?: SearchTeamHookParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListTeamHook>>;
		createTeamHook: (
			teamId: string,
			engineTeamHookServiceCreateTeamHookBody: EngineTeamHookServiceCreateTeamHookBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineTeamHook>>;
		deleteTeamHook: (
			teamId: string,
			id: number,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineTeamHook>>;
		readTeamHook: (
			teamId: string,
			id: number,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineTeamHook>>;
		patchTeamHook: (
			teamId: string,
			id: number,
			engineTeamHookServicePatchTeamHookBody: EngineTeamHookServicePatchTeamHookBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineTeamHook>>;
		updateTeamHook: (
			teamId: string,
			id: number,
			engineTeamHookServiceUpdateTeamHookBody: EngineTeamHookServiceUpdateTeamHookBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineTeamHook>>;
	};
export type SearchTeamHookResult = AxiosResponse<EngineListTeamHook>;
export type CreateTeamHookResult = AxiosResponse<EngineTeamHook>;
export type DeleteTeamHookResult = AxiosResponse<EngineTeamHook>;
export type ReadTeamHookResult = AxiosResponse<EngineTeamHook>;
export type PatchTeamHookResult = AxiosResponse<EngineTeamHook>;
export type UpdateTeamHookResult = AxiosResponse<EngineTeamHook>;
