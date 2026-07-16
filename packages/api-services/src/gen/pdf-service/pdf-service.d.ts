import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	ListCallExportsParams,
	ListScreenrecordingExportsParams,
	WebitelMediaExporterDeleteExportResponse,
	WebitelMediaExporterExportTask,
	WebitelMediaExporterListExportsResponse,
	WebitelMediaExporterPdfServiceCreateCallExportBody,
	WebitelMediaExporterPdfServiceCreateScreenrecordingExportBody,
} from '../_models';
export declare const // --- title start
	getPdfService: (axiosInstance?: AxiosInstance) => {
		listScreenrecordingExports: (
			agentId: string,
			params?: ListScreenrecordingExportsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelMediaExporterListExportsResponse>>;
		createScreenrecordingExport: (
			agentId: string,
			webitelMediaExporterPdfServiceCreateScreenrecordingExportBody: WebitelMediaExporterPdfServiceCreateScreenrecordingExportBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelMediaExporterExportTask>>;
		listCallExports: (
			callId: string,
			params?: ListCallExportsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelMediaExporterListExportsResponse>>;
		createCallExport: (
			callId: string,
			webitelMediaExporterPdfServiceCreateCallExportBody: WebitelMediaExporterPdfServiceCreateCallExportBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelMediaExporterExportTask>>;
		deleteExport: (
			id: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelMediaExporterDeleteExportResponse>>;
	};
export type ListScreenrecordingExportsResult =
	AxiosResponse<WebitelMediaExporterListExportsResponse>;
export type CreateScreenrecordingExportResult =
	AxiosResponse<WebitelMediaExporterExportTask>;
export type ListCallExportsResult =
	AxiosResponse<WebitelMediaExporterListExportsResponse>;
export type CreateCallExportResult =
	AxiosResponse<WebitelMediaExporterExportTask>;
export type DeleteExportResult =
	AxiosResponse<WebitelMediaExporterDeleteExportResponse>;
