import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CasesCaseFileList, CasesFile, ListFilesParams } from '.././_models';
export declare const // --- title start
getCaseFiles: () => {
    listFiles: <TData = AxiosResponse<CasesCaseFileList, any>>(caseEtag: string, params?: ListFilesParams, options?: AxiosRequestConfig) => Promise<TData>;
    deleteFile: <TData = AxiosResponse<CasesFile, any>>(caseEtag: string, id: string, options?: AxiosRequestConfig) => Promise<TData>;
};
export type ListFilesResult = AxiosResponse<CasesCaseFileList>;
export type DeleteFileResult = AxiosResponse<CasesFile>;
