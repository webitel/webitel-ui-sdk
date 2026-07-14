import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	DeleteAgentSkillParams,
	DeleteAgentSkillsParams,
	EngineAgentSkill,
	EngineAgentSkillServiceCreateAgentSkillBody,
	EngineAgentSkillServiceCreateAgentSkillsBody,
	EngineAgentSkillServicePatchAgentSkillBody,
	EngineAgentSkillServicePatchAgentSkillsBody,
	EngineAgentSkillServiceUpdateAgentSkillBody,
	EngineCreateAgentSkillsResponse,
	EngineListAgentSkill,
	EngineListSkill,
	ReadAgentSkillParams,
	SearchAgentSkillParams,
	SearchLookupAgentNotExistsSkillParams,
} from '../_models';
export declare const // --- title start
	getAgentSkillService: (axiosInstance?: AxiosInstance) => {
		deleteAgentSkills: (
			agentId: string,
			params?: DeleteAgentSkillsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListAgentSkill>>;
		searchAgentSkill: (
			agentId: string,
			params?: SearchAgentSkillParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListAgentSkill>>;
		patchAgentSkills: (
			agentId: string,
			engineAgentSkillServicePatchAgentSkillsBody: EngineAgentSkillServicePatchAgentSkillsBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListAgentSkill>>;
		createAgentSkill: (
			agentId: string,
			engineAgentSkillServiceCreateAgentSkillBody: EngineAgentSkillServiceCreateAgentSkillBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAgentSkill>>;
		createAgentSkills: (
			agentId: string,
			engineAgentSkillServiceCreateAgentSkillsBody: EngineAgentSkillServiceCreateAgentSkillsBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineCreateAgentSkillsResponse>>;
		deleteAgentSkill: (
			agentId: string,
			id: string,
			params?: DeleteAgentSkillParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAgentSkill>>;
		readAgentSkill: (
			agentId: string,
			id: string,
			params?: ReadAgentSkillParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAgentSkill>>;
		patchAgentSkill: (
			agentId: string,
			id: string,
			engineAgentSkillServicePatchAgentSkillBody: EngineAgentSkillServicePatchAgentSkillBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAgentSkill>>;
		updateAgentSkill: (
			agentId: string,
			id: string,
			engineAgentSkillServiceUpdateAgentSkillBody: EngineAgentSkillServiceUpdateAgentSkillBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAgentSkill>>;
		searchLookupAgentNotExistsSkill: (
			agentId: string,
			params?: SearchLookupAgentNotExistsSkillParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListSkill>>;
	};
export type DeleteAgentSkillsResult = AxiosResponse<EngineListAgentSkill>;
export type SearchAgentSkillResult = AxiosResponse<EngineListAgentSkill>;
export type PatchAgentSkillsResult = AxiosResponse<EngineListAgentSkill>;
export type CreateAgentSkillResult = AxiosResponse<EngineAgentSkill>;
export type CreateAgentSkillsResult =
	AxiosResponse<EngineCreateAgentSkillsResponse>;
export type DeleteAgentSkillResult = AxiosResponse<EngineAgentSkill>;
export type ReadAgentSkillResult = AxiosResponse<EngineAgentSkill>;
export type PatchAgentSkillResult = AxiosResponse<EngineAgentSkill>;
export type UpdateAgentSkillResult = AxiosResponse<EngineAgentSkill>;
export type SearchLookupAgentNotExistsSkillResult =
	AxiosResponse<EngineListSkill>;
