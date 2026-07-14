import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	DeleteCommentParams,
	ListCommentsParams,
	LocateCommentParams,
	PublishCommentParams,
	UpdateComment2Body,
	UpdateComment2Params,
	UpdateCommentBody,
	UpdateCommentParams,
	WebitelCasesCaseComment,
	WebitelCasesCaseCommentList,
	WebitelCasesInputCaseComment,
} from '../_models';
export declare const // --- title start
	getCaseComments: (axiosInstance?: AxiosInstance) => {
		deleteComment: (
			etag: string,
			params?: DeleteCommentParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesCaseComment>>;
		locateComment: (
			etag: string,
			params?: LocateCommentParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesCaseComment>>;
		updateComment2: (
			updateComment2Body: UpdateComment2Body,
			params?: UpdateComment2Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesCaseComment>>;
		updateComment: (
			updateCommentBody: UpdateCommentBody,
			params?: UpdateCommentParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesCaseComment>>;
		listComments: (
			caseEtag: string,
			params?: ListCommentsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesCaseCommentList>>;
		publishComment: (
			caseEtag: string,
			webitelCasesInputCaseComment: WebitelCasesInputCaseComment,
			params?: PublishCommentParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesCaseComment>>;
	};
export type DeleteCommentResult = AxiosResponse<WebitelCasesCaseComment>;
export type LocateCommentResult = AxiosResponse<WebitelCasesCaseComment>;
export type UpdateComment2Result = AxiosResponse<WebitelCasesCaseComment>;
export type UpdateCommentResult = AxiosResponse<WebitelCasesCaseComment>;
export type ListCommentsResult = AxiosResponse<WebitelCasesCaseCommentList>;
export type PublishCommentResult = AxiosResponse<WebitelCasesCaseComment>;
