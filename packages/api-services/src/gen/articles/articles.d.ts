import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	ArticlesAttachmentListParams,
	ArticleVersionsListParams,
	CreateArticleArticlesParams,
	DeleteArticleArticlesParams,
	KnowledgebaseArticle,
	KnowledgebaseArticleList,
	KnowledgebaseArticleVersion,
	KnowledgebaseArticleVersionList,
	KnowledgebaseAttachmentList,
	KnowledgebaseInputArticle,
	ListArticles2Params,
	ListArticlesArticlesParams,
	LocateArticleArticlesParams,
	UpdateArticleArticlesBody,
	UpdateArticleArticlesParams,
} from '../_models';
export declare const // --- title start
	getArticles: (axiosInstance?: AxiosInstance) => {
		listArticlesArticles: (
			spaceId: string,
			params?: ListArticlesArticlesParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<KnowledgebaseArticleList>>;
		createArticleArticles: (
			spaceId: string,
			knowledgebaseInputArticle: KnowledgebaseInputArticle,
			params?: CreateArticleArticlesParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<KnowledgebaseArticleList>>;
		articlesAttachmentList: (
			spaceId: string,
			articleId: string,
			params?: ArticlesAttachmentListParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<KnowledgebaseAttachmentList>>;
		listArticles2: (
			spaceId: string,
			articleId: string,
			params?: ListArticles2Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<KnowledgebaseArticleList>>;
		articleVersionsList: (
			spaceId: string,
			articleId: string,
			params?: ArticleVersionsListParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<KnowledgebaseArticleVersionList>>;
		locateArticleVersion: (
			spaceId: string,
			articleId: string,
			versionId: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<KnowledgebaseArticleVersion>>;
		deleteArticleArticles: (
			spaceId: string,
			etag: string,
			params?: DeleteArticleArticlesParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<KnowledgebaseArticle>>;
		locateArticleArticles: (
			spaceId: string,
			etag: string,
			params?: LocateArticleArticlesParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<KnowledgebaseArticle>>;
		updateArticleArticles: (
			spaceId: string,
			etag: string,
			updateArticleArticlesBody: UpdateArticleArticlesBody,
			params?: UpdateArticleArticlesParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<KnowledgebaseArticleList>>;
	};
export type ListArticlesArticlesResult =
	AxiosResponse<KnowledgebaseArticleList>;
export type CreateArticleArticlesResult =
	AxiosResponse<KnowledgebaseArticleList>;
export type ArticlesAttachmentListResult =
	AxiosResponse<KnowledgebaseAttachmentList>;
export type ListArticles2Result = AxiosResponse<KnowledgebaseArticleList>;
export type ArticleVersionsListResult =
	AxiosResponse<KnowledgebaseArticleVersionList>;
export type LocateArticleVersionResult =
	AxiosResponse<KnowledgebaseArticleVersion>;
export type DeleteArticleArticlesResult = AxiosResponse<KnowledgebaseArticle>;
export type LocateArticleArticlesResult = AxiosResponse<KnowledgebaseArticle>;
export type UpdateArticleArticlesResult =
	AxiosResponse<KnowledgebaseArticleList>;
