import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	DeleteQueueResourceGroupParams,
	EngineListQueueResourceGroup,
	EngineQueueResourceGroup,
	EngineQueueResourcesServiceCreateQueueResourceGroupBody,
	EngineQueueResourcesServiceUpdateQueueResourceGroupBody,
	ReadQueueResourceGroupParams,
	SearchQueueResourceGroupParams,
} from '../_models';
export declare const // --- title start
	getQueueResourcesService: (axiosInstance?: AxiosInstance) => {
		searchQueueResourceGroup: (
			queueId: string,
			params?: SearchQueueResourceGroupParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListQueueResourceGroup>>;
		createQueueResourceGroup: (
			queueId: string,
			engineQueueResourcesServiceCreateQueueResourceGroupBody: EngineQueueResourcesServiceCreateQueueResourceGroupBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineQueueResourceGroup>>;
		deleteQueueResourceGroup: (
			queueId: string,
			id: string,
			params?: DeleteQueueResourceGroupParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineQueueResourceGroup>>;
		readQueueResourceGroup: (
			queueId: string,
			id: string,
			params?: ReadQueueResourceGroupParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineQueueResourceGroup>>;
		updateQueueResourceGroup: (
			queueId: string,
			id: string,
			engineQueueResourcesServiceUpdateQueueResourceGroupBody: EngineQueueResourcesServiceUpdateQueueResourceGroupBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineQueueResourceGroup>>;
	};
export type SearchQueueResourceGroupResult =
	AxiosResponse<EngineListQueueResourceGroup>;
export type CreateQueueResourceGroupResult =
	AxiosResponse<EngineQueueResourceGroup>;
export type DeleteQueueResourceGroupResult =
	AxiosResponse<EngineQueueResourceGroup>;
export type ReadQueueResourceGroupResult =
	AxiosResponse<EngineQueueResourceGroup>;
export type UpdateQueueResourceGroupResult =
	AxiosResponse<EngineQueueResourceGroup>;
