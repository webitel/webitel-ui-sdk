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
import type { ApiId, ApiParams, DeleteItemParams } from '../_shared/types';

const instance = getDefaultInstance();

/** [Claude] The app passes these: the API base URL and token are its concern, not this package's */
export type MediaUrlAuth = {
	baseUrl: string;
	accessToken: string;
};

/** [Claude] For `src`/`href` targets (players, links) that can't send the auth header */
const withAccessToken = (
	path: string,
	{ baseUrl, accessToken }: MediaUrlAuth,
	query = '',
) => `${baseUrl}${path}?access_token=${accessToken}${query}`;

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

export const downloadFile = async (id: ApiId, fileName = '') => {
	try {
		const response = await instance.get(`/storage/file/${id}/download`, {
			responseType: 'blob',
		});

		const objectUrl = URL.createObjectURL(response.data);

		const link = document.createElement('a');
		link.href = objectUrl;
		link.download = fileName;
		document.body.appendChild(link);
		link.click();
		link.remove();

		URL.revokeObjectURL(objectUrl);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const getCallMediaUrl = (
	id: ApiId,
	{
		auth,
		download = false,
	}: {
		auth: MediaUrlAuth;
		download?: boolean;
	},
) =>
	withAccessToken(
		`/storage/recordings/${id}/${download ? 'download' : 'stream'}`,
		auth,
	);

export const getMediaStreamUrl = (
	id: ApiId,
	{
		auth,
	}: {
		auth: MediaUrlAuth;
	},
) => withAccessToken(`/storage/media/${id}/stream`, auth);

export const getMediaDownloadUrl = (
	id: ApiId,
	{
		auth,
	}: {
		auth: MediaUrlAuth;
	},
) => withAccessToken(`/storage/media/${id}/download`, auth);

export const getMediaUrl = (
	id: ApiId,
	{
		auth,
		isThumb = false,
	}: {
		auth: MediaUrlAuth;
		isThumb?: boolean;
	},
) =>
	withAccessToken(
		`/storage/file/${id}/stream`,
		auth,
		`&fetch_thumbnail=${isThumb}`,
	);

/** [Claude] All files in one request, one notification; fields named `file[n]` as the old dropzone upload sent them */
const uploadMedia = async (files: File[]) => {
	const formData = new FormData();
	files.forEach((file, index) => {
		formData.append(`file[${index}]`, file);
	});

	try {
		const response = await instance.post('/storage/media', formData);
		return applyTransform(response.data, [
			notify(({ callback }) =>
				callback({
					type: 'success',
					text: 'Successfully added',
				}),
			),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export type TextToSpeechParams = {
	profileId: string;
	textType: string;
	language: string;
	voice: string;
	format: string;
	text: string;
};

/** [Claude] Synthesizes audio from text without storing it; save the blob with `upload` */
const generateTts = async (params: TextToSpeechParams): Promise<Blob> => {
	try {
		const response = await instance.get('/storage/tts/stream', {
			params: applyTransform(params, [
				camelToSnake(),
			]),
			responseType: 'blob',
		});
		return response.data;
	} catch (err) {
		throw applyTransform(err, [
			notify(({ callback }) =>
				callback({
					type: 'error',
					text: `Failed to process Text-to-Speech: ${err}`,
				}),
			),
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
			'mime_type',
		],
	});

export const MediaAPI = {
	getList: getMediaList,
	upload: uploadMedia,
	generateTts,
	delete: deleteMedia,
	getLookup: getMediaLookup,
};
