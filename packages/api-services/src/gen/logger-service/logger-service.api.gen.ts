/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import axios from '@aliasedDeps/api-services/axios';

import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import type {
	LoggerLogs,
	SearchLogByConfigIdParams,
	SearchLogByRecordIdParams,
	SearchLogByUserIdParams,
} from '.././_models';

// --- header start
//

export const // --- title start
	getLoggerService =
		// --- title end
		() => {
			// --- header end
			const searchLogByConfigId = <TData = AxiosResponse<LoggerLogs>>(
				configId: number,
				params?: SearchLogByConfigIdParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get(`/logger/config/${configId}/logs`, {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			const searchLogByUserId = <TData = AxiosResponse<LoggerLogs>>(
				userId: number,
				params?: SearchLogByUserIdParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get(`/logger/user/${userId}/logs`, {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			const searchLogByRecordId = <TData = AxiosResponse<LoggerLogs>>(
				object:
					| 'cc_queue'
					| 'schema'
					| 'users'
					| 'devices'
					| 'calendars'
					| 'cc_list'
					| 'cc_team'
					| 'cc_agent'
					| 'cc_resource'
					| 'cc_resource_group'
					| 'chat_bots'
					| 'cases'
					| 'contacts'
					| 'cc_list_number'
					| 'case_comments'
					| 'record_file',
				recordId: number,
				params?: SearchLogByRecordIdParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get(`/logger/${object}/record/${recordId}/logs`, {
					...options,
					params: { ...params, ...options?.params },
				});
			};

			// --- footer start
			return { searchLogByConfigId, searchLogByUserId, searchLogByRecordId };
		};
export type SearchLogByConfigIdResult = AxiosResponse<LoggerLogs>;
export type SearchLogByUserIdResult = AxiosResponse<LoggerLogs>;
export type SearchLogByRecordIdResult = AxiosResponse<LoggerLogs>;

// --- footer end
