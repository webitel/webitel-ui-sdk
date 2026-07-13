import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { KnowledgebaseTagsList, ListTagsParams } from '../_models';
export declare const // --- title start
	getTags: (axiosInstance?: AxiosInstance) => {
		listTags: (
			params?: ListTagsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<KnowledgebaseTagsList>>;
	};
export type ListTagsResult = AxiosResponse<KnowledgebaseTagsList>;
