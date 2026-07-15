import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ContactsComment, ContactsCommentList, ContactsInputComment, DeleteCommentCommentsParams, PublishCommentCommentsParams, SearchCommentsParams, UpdateCommentCommentsBody, UpdateCommentCommentsParams } from '../_models';
export declare const // --- title start
getComments: (axiosInstance?: AxiosInstance) => {
    searchComments: (contactId: string, params?: SearchCommentsParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsCommentList>>;
    publishCommentComments: (contactId: string, contactsInputComment: ContactsInputComment, params?: PublishCommentCommentsParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsComment>>;
    deleteCommentComments: (contactId: string, etag: string[], params?: DeleteCommentCommentsParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsComment[]>>;
    updateCommentComments: (contactId: string, etag: string, updateCommentCommentsBody: UpdateCommentCommentsBody, params?: UpdateCommentCommentsParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsComment>>;
};
export type SearchCommentsResult = AxiosResponse<ContactsCommentList>;
export type PublishCommentCommentsResult = AxiosResponse<ContactsComment>;
export type DeleteCommentCommentsResult = AxiosResponse<ContactsComment[]>;
export type UpdateCommentCommentsResult = AxiosResponse<ContactsComment>;
