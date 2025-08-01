/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import axios from '@aliasedDeps/api-services/axios';

import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import type {
	KnowledgebaseSearchSpacesArticlesSearchParams,
	WebitelKnowledgebaseCombinedList,
} from '.././_models';

// --- header start
//

export const // --- title start
	getKnowledgebaseSearch =
		// --- title end
		() => {
			// --- header end
			const knowledgebaseSearchSpacesArticlesSearch = <
				TData = AxiosResponse<WebitelKnowledgebaseCombinedList>,
			>(
				params?: KnowledgebaseSearchSpacesArticlesSearchParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get('/spaces/search', {
					...options,
					params: { ...params, ...options?.params },
				});
			};

			// --- footer start
			return { knowledgebaseSearchSpacesArticlesSearch };
		};
export type KnowledgebaseSearchSpacesArticlesSearchResult =
	AxiosResponse<WebitelKnowledgebaseCombinedList>;

// --- footer end
