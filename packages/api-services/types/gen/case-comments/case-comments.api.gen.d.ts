import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { DeleteCommentParams, ListCommentsParams, LocateCommentParams, PublishCommentParams, UpdateComment2Body, UpdateComment2Params, UpdateCommentBody, UpdateCommentParams, WebitelCasesCaseComment, WebitelCasesCaseCommentList, WebitelCasesInputCaseComment } from '.././_models';
export declare const // --- title start
getCaseComments: () => {
    deleteComment: <TData = AxiosResponse<WebitelCasesCaseComment, any>>(etag: string, params?: DeleteCommentParams, options?: AxiosRequestConfig) => Promise<TData>;
    locateComment: <TData = AxiosResponse<WebitelCasesCaseComment, any>>(etag: string, params?: LocateCommentParams, options?: AxiosRequestConfig) => Promise<TData>;
    updateComment2: <TData = AxiosResponse<WebitelCasesCaseComment, any>>(updateComment2Body: UpdateComment2Body, params?: UpdateComment2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updateComment: <TData = AxiosResponse<WebitelCasesCaseComment, any>>(updateCommentBody: UpdateCommentBody, params?: UpdateCommentParams, options?: AxiosRequestConfig) => Promise<TData>;
    listComments: <TData = AxiosResponse<WebitelCasesCaseCommentList, any>>(caseEtag: string, params?: ListCommentsParams, options?: AxiosRequestConfig) => Promise<TData>;
    publishComment: <TData = AxiosResponse<WebitelCasesCaseComment, any>>(caseEtag: string, webitelCasesInputCaseComment: WebitelCasesInputCaseComment, params?: PublishCommentParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type DeleteCommentResult = AxiosResponse<WebitelCasesCaseComment>;
export type LocateCommentResult = AxiosResponse<WebitelCasesCaseComment>;
export type UpdateComment2Result = AxiosResponse<WebitelCasesCaseComment>;
export type UpdateCommentResult = AxiosResponse<WebitelCasesCaseComment>;
export type ListCommentsResult = AxiosResponse<WebitelCasesCaseCommentList>;
export type PublishCommentResult = AxiosResponse<WebitelCasesCaseComment>;
