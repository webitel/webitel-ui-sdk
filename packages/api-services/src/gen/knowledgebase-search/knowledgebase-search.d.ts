import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { KnowledgebaseCombinedList, SpacesArticlesSearchParams } from '../_models';
export declare const // --- title start
getKnowledgebaseSearch: (axiosInstance?: AxiosInstance) => {
    spacesArticlesSearch: (params?: SpacesArticlesSearchParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<KnowledgebaseCombinedList>>;
};
export type SpacesArticlesSearchResult = AxiosResponse<KnowledgebaseCombinedList>;
