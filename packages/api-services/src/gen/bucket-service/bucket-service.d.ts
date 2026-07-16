import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	DeleteBucketParams,
	EngineBucket,
	EngineBucketServiceUpdateBucketBody,
	EngineCreateBucketRequest,
	EngineListBucket,
	ReadBucketParams,
	SearchBucketParams,
} from '../_models';
export declare const // --- title start
	getBucketService: (axiosInstance?: AxiosInstance) => {
		searchBucket: (
			params?: SearchBucketParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListBucket>>;
		createBucket: (
			engineCreateBucketRequest: EngineCreateBucketRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineBucket>>;
		deleteBucket: (
			id: string,
			params?: DeleteBucketParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineBucket>>;
		readBucket: (
			id: string,
			params?: ReadBucketParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineBucket>>;
		updateBucket: (
			id: string,
			engineBucketServiceUpdateBucketBody: EngineBucketServiceUpdateBucketBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineBucket>>;
	};
export type SearchBucketResult = AxiosResponse<EngineListBucket>;
export type CreateBucketResult = AxiosResponse<EngineBucket>;
export type DeleteBucketResult = AxiosResponse<EngineBucket>;
export type ReadBucketResult = AxiosResponse<EngineBucket>;
export type UpdateBucketResult = AxiosResponse<EngineBucket>;
