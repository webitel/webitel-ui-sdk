import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	EngineListQueueSkill,
	EngineQueueSkill,
	EngineQueueSkillServiceCreateQueueSkillBody,
	EngineQueueSkillServicePatchQueueSkillBody,
	EngineQueueSkillServiceUpdateQueueSkillBody,
	SearchQueueSkillParams,
} from '../_models';
export declare const // --- title start
	getQueueSkillService: (axiosInstance?: AxiosInstance) => {
		searchQueueSkill: (
			queueId: number,
			params?: SearchQueueSkillParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListQueueSkill>>;
		createQueueSkill: (
			queueId: number,
			engineQueueSkillServiceCreateQueueSkillBody: EngineQueueSkillServiceCreateQueueSkillBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineQueueSkill>>;
		deleteQueueSkill: (
			queueId: number,
			id: number,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineQueueSkill>>;
		readQueueSkill: (
			queueId: number,
			id: number,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineQueueSkill>>;
		patchQueueSkill: (
			queueId: number,
			id: number,
			engineQueueSkillServicePatchQueueSkillBody: EngineQueueSkillServicePatchQueueSkillBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineQueueSkill>>;
		updateQueueSkill: (
			queueId: number,
			id: number,
			engineQueueSkillServiceUpdateQueueSkillBody: EngineQueueSkillServiceUpdateQueueSkillBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineQueueSkill>>;
	};
export type SearchQueueSkillResult = AxiosResponse<EngineListQueueSkill>;
export type CreateQueueSkillResult = AxiosResponse<EngineQueueSkill>;
export type DeleteQueueSkillResult = AxiosResponse<EngineQueueSkill>;
export type ReadQueueSkillResult = AxiosResponse<EngineQueueSkill>;
export type PatchQueueSkillResult = AxiosResponse<EngineQueueSkill>;
export type UpdateQueueSkillResult = AxiosResponse<EngineQueueSkill>;
