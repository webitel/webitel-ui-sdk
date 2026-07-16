import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	EngineListQueueBucket,
	EngineQueueBucket,
	EngineQueueBucketServiceCreateQueueBucketBody,
	EngineQueueBucketServicePatchQueueBucketBody,
	EngineQueueBucketServiceUpdateQueueBucketBody,
	SearchQueueBucketParams,
} from '../_models';
export declare const // --- title start
	getQueueBucketService: (axiosInstance?: AxiosInstance) => {
		searchQueueBucket: (
			queueId: string,
			params?: SearchQueueBucketParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListQueueBucket>>;
		createQueueBucket: (
			queueId: string,
			engineQueueBucketServiceCreateQueueBucketBody: EngineQueueBucketServiceCreateQueueBucketBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineQueueBucket>>;
		deleteQueueBucket: (
			queueId: string,
			id: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineQueueBucket>>;
		readQueueBucket: (
			queueId: string,
			id: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineQueueBucket>>;
		patchQueueBucket: (
			queueId: string,
			id: string,
			engineQueueBucketServicePatchQueueBucketBody: EngineQueueBucketServicePatchQueueBucketBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineQueueBucket>>;
		updateQueueBucket: (
			queueId: string,
			id: string,
			engineQueueBucketServiceUpdateQueueBucketBody: EngineQueueBucketServiceUpdateQueueBucketBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineQueueBucket>>;
	};
export type SearchQueueBucketResult = AxiosResponse<EngineListQueueBucket>;
export type CreateQueueBucketResult = AxiosResponse<EngineQueueBucket>;
export type DeleteQueueBucketResult = AxiosResponse<EngineQueueBucket>;
export type ReadQueueBucketResult = AxiosResponse<EngineQueueBucket>;
export type PatchQueueBucketResult = AxiosResponse<EngineQueueBucket>;
export type UpdateQueueBucketResult = AxiosResponse<EngineQueueBucket>;
