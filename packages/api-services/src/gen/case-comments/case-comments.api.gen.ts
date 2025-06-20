/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import axios from '@aliasedDeps/api-services/axios';

import type { AxiosRequestConfig, AxiosResponse } from 'axios';

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
} from '.././_models';

// --- header start
//

export const // --- title start
	getCaseComments =
		// --- title end
		() => {
			// --- header end
			/**
			 * @summary Delete a specific comment by its etag
			 */
			const deleteComment = <TData = AxiosResponse<WebitelCasesCaseComment>>(
				etag: string,
				params?: DeleteCommentParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.delete(`/cases/comments/${etag}`, {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			/**
			 * @summary Retrieve a specific comment by its etag
			 */
			const locateComment = <TData = AxiosResponse<WebitelCasesCaseComment>>(
				etag: string,
				params?: LocateCommentParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get(`/cases/comments/${etag}`, {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			/**
			 * @summary Update a specific comment by its etag
			 */
			const updateComment2 = <TData = AxiosResponse<WebitelCasesCaseComment>>(
				updateComment2Body: UpdateComment2Body,
				params?: UpdateComment2Params,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.patch('/cases/comments/input.etag}', updateComment2Body, {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			/**
			 * @summary Update a specific comment by its etag
			 */
			const updateComment = <TData = AxiosResponse<WebitelCasesCaseComment>>(
				updateCommentBody: UpdateCommentBody,
				params?: UpdateCommentParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.put('/cases/comments/input.etag}', updateCommentBody, {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			/**
			 * @summary Retrieve a list of comments associated with a specific case
			 */
			const listComments = <TData = AxiosResponse<WebitelCasesCaseCommentList>>(
				caseEtag: string,
				params?: ListCommentsParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get(`/cases/${caseEtag}/comments`, {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			/**
			 * @summary Publish comment into a specific case
			 */
			const publishComment = <TData = AxiosResponse<WebitelCasesCaseComment>>(
				caseEtag: string,
				webitelCasesInputCaseComment: WebitelCasesInputCaseComment,
				params?: PublishCommentParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.post(
					`/cases/${caseEtag}/comments`,
					webitelCasesInputCaseComment,
					{
						...options,
						params: { ...params, ...options?.params },
					},
				);
			};

			// --- footer start
			return {
				deleteComment,
				locateComment,
				updateComment2,
				updateComment,
				listComments,
				publishComment,
			};
		};
export type DeleteCommentResult = AxiosResponse<WebitelCasesCaseComment>;
export type LocateCommentResult = AxiosResponse<WebitelCasesCaseComment>;
export type UpdateComment2Result = AxiosResponse<WebitelCasesCaseComment>;
export type UpdateCommentResult = AxiosResponse<WebitelCasesCaseComment>;
export type ListCommentsResult = AxiosResponse<WebitelCasesCaseCommentList>;
export type PublishCommentResult = AxiosResponse<WebitelCasesCaseComment>;

// --- footer end
