import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ListFilesParams, WebitelCasesCaseFileList, WebitelCasesFile } from '.././_models';
export declare const // --- title start
getCaseFiles: () => {
    listFiles: <TData = AxiosResponse<WebitelCasesCaseFileList, any>>(caseEtag: string, params?: ListFilesParams, options?: AxiosRequestConfig) => Promise<TData>;
    deleteFile: <TData = AxiosResponse<WebitelCasesFile, any>>(caseEtag: string, id: string, options?: AxiosRequestConfig) => Promise<TData>;
};
export type ListFilesResult = AxiosResponse<WebitelCasesCaseFileList>;
export type DeleteFileResult = AxiosResponse<WebitelCasesFile>;
