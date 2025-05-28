import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CasesCaseComment, CasesCaseCommentList, CasesInputCaseComment, DeleteCommentParams, ListCommentsParams, LocateCommentParams, PublishCommentParams, UpdateComment2Body, UpdateComment2Params, UpdateCommentBody, UpdateCommentParams } from '.././_models';
export declare const // --- title start
getCaseComments: () => {
    deleteComment: <TData = AxiosResponse<CasesCaseComment, any>>(etag: string, params?: DeleteCommentParams, options?: AxiosRequestConfig) => Promise<TData>;
    locateComment: <TData = AxiosResponse<CasesCaseComment, any>>(etag: string, params?: LocateCommentParams, options?: AxiosRequestConfig) => Promise<TData>;
    updateComment2: <TData = AxiosResponse<CasesCaseComment, any>>(updateComment2Body: UpdateComment2Body, params?: UpdateComment2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updateComment: <TData = AxiosResponse<CasesCaseComment, any>>(updateCommentBody: UpdateCommentBody, params?: UpdateCommentParams, options?: AxiosRequestConfig) => Promise<TData>;
    listComments: <TData = AxiosResponse<CasesCaseCommentList, any>>(caseEtag: string, params?: ListCommentsParams, options?: AxiosRequestConfig) => Promise<TData>;
    publishComment: <TData = AxiosResponse<CasesCaseComment, any>>(caseEtag: string, casesInputCaseComment: CasesInputCaseComment, params?: PublishCommentParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type DeleteCommentResult = AxiosResponse<CasesCaseComment>;
export type LocateCommentResult = AxiosResponse<CasesCaseComment>;
export type UpdateComment2Result = AxiosResponse<CasesCaseComment>;
export type UpdateCommentResult = AxiosResponse<CasesCaseComment>;
export type ListCommentsResult = AxiosResponse<CasesCaseCommentList>;
export type PublishCommentResult = AxiosResponse<CasesCaseComment>;
