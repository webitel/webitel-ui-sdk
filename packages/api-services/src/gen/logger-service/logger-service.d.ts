import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { LoggerLogs, LoggerServiceSearchLogByConfigIdParams, LoggerServiceSearchLogByRecordIdParams, LoggerServiceSearchLogByUserIdParams } from '../_models';
export declare const // --- title start
getLoggerService: (axiosInstance?: AxiosInstance) => {
    loggerServiceSearchLogByConfigId: (configId: number, params?: LoggerServiceSearchLogByConfigIdParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<LoggerLogs>>;
    loggerServiceSearchLogByUserId: (userId: number, params?: LoggerServiceSearchLogByUserIdParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<LoggerLogs>>;
    loggerServiceSearchLogByRecordId: (object: "cc_queue" | "schema" | "users" | "devices" | "calendars" | "cc_list" | "cc_team" | "cc_agent" | "cc_resource" | "cc_resource_group" | "chat_bots" | "cases" | "contacts" | "cc_list_number" | "case_comments" | "record_file" | "sso", recordId: number, params?: LoggerServiceSearchLogByRecordIdParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<LoggerLogs>>;
};
export type LoggerServiceSearchLogByConfigIdResult = AxiosResponse<LoggerLogs>;
export type LoggerServiceSearchLogByUserIdResult = AxiosResponse<LoggerLogs>;
export type LoggerServiceSearchLogByRecordIdResult = AxiosResponse<LoggerLogs>;
