import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { DeleteSkillParams, EngineCreateSkillAgentResponse, EngineCreateSkillRequest, EngineDeleteSkillAgentResponse, EngineListSkill, EngineListSkillAgent, EnginePatchSkillAgentResponse, EngineSkill, EngineSkillServiceCreateSkillAgentBody, EngineSkillServiceDeleteSkillAgentBody, EngineSkillServicePatchSkillAgentBody, EngineSkillServiceUpdateSkillBody, ReadSkillParams, SearchSkillAgentParams, SearchSkillParams } from '../_models';
export declare const // --- title start
getSkillService: (axiosInstance?: AxiosInstance) => {
    searchSkill: (params?: SearchSkillParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineListSkill>>;
    createSkill: (engineCreateSkillRequest: EngineCreateSkillRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineSkill>>;
    deleteSkill: (id: string, params?: DeleteSkillParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineSkill>>;
    readSkill: (id: string, params?: ReadSkillParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineSkill>>;
    updateSkill: (id: string, engineSkillServiceUpdateSkillBody: EngineSkillServiceUpdateSkillBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineSkill>>;
    deleteSkillAgent: (skillId: string, engineSkillServiceDeleteSkillAgentBody: EngineSkillServiceDeleteSkillAgentBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineDeleteSkillAgentResponse>>;
    searchSkillAgent: (skillId: string, params?: SearchSkillAgentParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineListSkillAgent>>;
    patchSkillAgent: (skillId: string, engineSkillServicePatchSkillAgentBody: EngineSkillServicePatchSkillAgentBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EnginePatchSkillAgentResponse>>;
    createSkillAgent: (skillId: string, engineSkillServiceCreateSkillAgentBody: EngineSkillServiceCreateSkillAgentBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineCreateSkillAgentResponse>>;
};
export type SearchSkillResult = AxiosResponse<EngineListSkill>;
export type CreateSkillResult = AxiosResponse<EngineSkill>;
export type DeleteSkillResult = AxiosResponse<EngineSkill>;
export type ReadSkillResult = AxiosResponse<EngineSkill>;
export type UpdateSkillResult = AxiosResponse<EngineSkill>;
export type DeleteSkillAgentResult = AxiosResponse<EngineDeleteSkillAgentResponse>;
export type SearchSkillAgentResult = AxiosResponse<EngineListSkillAgent>;
export type PatchSkillAgentResult = AxiosResponse<EnginePatchSkillAgentResponse>;
export type CreateSkillAgentResult = AxiosResponse<EngineCreateSkillAgentResponse>;
