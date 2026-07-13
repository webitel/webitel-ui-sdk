import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	ListFilesParams,
	WebitelCasesCaseFileList,
	WebitelCasesFile,
} from '../_models';
export declare const // --- title start
	getCaseFiles: (axiosInstance?: AxiosInstance) => {
		listFiles: (
			caseEtag: string,
			params?: ListFilesParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesCaseFileList>>;
		deleteFile: (
			caseEtag: string,
			id: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesFile>>;
	};
export type ListFilesResult = AxiosResponse<WebitelCasesCaseFileList>;
export type DeleteFileResult = AxiosResponse<WebitelCasesFile>;
