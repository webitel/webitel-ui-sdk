import axios from 'axios';
import { getMediaFileService } from '../../../gen-wire';
import {
	getDefaultGetListResponse,
	getDefaultGetParams,
	getDefaultInstance,
} from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type {
	ApiId,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
} from '../_shared/types';

const instance = getDefaultInstance();

const token = localStorage.getItem('access-token');
const baseUrl = import.meta.env.VITE_API_URL;

const getMediaList = async (params: ApiParams) => {
	const requestParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		camelToSnake(),
		(params) => ({
			...params,
			q: params.search,
		}),
		sanitize([
			'page',
			'size',
			'q',
			'sort',
			'fields',
			'id',
		]),
	]);

	try {
		const response = await getMediaFileService().searchMediaFile(requestParams);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getMedia = async ({ itemId }: GetItemParams) => {
	const url = `${baseUrl}/storage/media/${itemId}/stream?access_token=${token}`;
	try {
		return await instance.get(url);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const downloadMedia = async (id: ApiId) => {
	const url = `${baseUrl}/storage/media/${id}/download?access_token=${token}`;
	try {
		return await instance.get(url);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const downloadFile = (id: ApiId) => {
	const accessToken = localStorage.getItem('access-token'); // after auth token variable is null
	const url = `${baseUrl}/storage/file/${id}/download?access_token=${accessToken}`;
	const link = document.createElement('a');
	link.href = url;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

export const getCallMediaUrl = (
	id: ApiId,
	{
		download = false,
	}: {
		download?: boolean;
	} = {},
) => {
	const accessToken = localStorage.getItem('access-token');
	return `${baseUrl}/storage/recordings/${id}/${download ? 'download' : 'stream'}?access_token=${accessToken}`;
};

export const getMediaUrl = (id: ApiId, isThumb: boolean = false) => {
	const accessToken = localStorage.getItem('access-token'); // after auth token variable is null
	const url = `${baseUrl}/storage/file/${id}/stream?access_token=${accessToken}&fetch_thumbnail=${isThumb}`;
	return url;
};

const addMediaInstance = axios.create({
	headers: {
		'content-type': 'multipart/form-data',
	},
});

const addMedia = async (params: ApiParams) => {
	const url = `${baseUrl}/storage/media?access_token=${token}`;

	const formData = new FormData();
	formData.append('file', params.itemInstance);
	try {
		const response = await addMediaInstance.post(url, formData);
		applyTransform(response, [
			notify(() => ({
				type: 'success',
				text: 'Successfully added',
			})),
		]);
		return response;
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteMedia = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getMediaFileService().deleteMediaFile(String(id));
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getMediaLookup = (params: Parameters<typeof getMediaList>[0]) =>
	getMediaList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const MediaAPI = {
	getList: getMediaList,
	get: getMedia,
	add: addMedia,
	delete: deleteMedia,
	getLookup: getMediaLookup,
};
