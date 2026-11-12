import { castArray } from 'lodash-es';

import { getFileTranscriptService } from '../../../../gen-wire';
import { getDefaultGetListResponse } from '../../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	snakeToCamel,
} from '../../../transformers';
import type { ApiId, ApiParams } from '../../_shared/types';

const preRequestHandler =
	(fileIdKey: 'fileId' | 'id') =>
	({ callId, fileId }: ApiParams) =>
		fileId
			? {
					[fileIdKey]: castArray(fileId),
				}
			: {
					uuid: castArray(callId),
				};

const getTranscript = async ({
	id,
	page = 1,
	size = 10000,
}: {
	id: ApiId;
	page?: number;
	size?: number;
}) => {
	try {
		const response = await getFileTranscriptService().getFileTranscriptPhrases(
			String(id),
			{
				page,
				size,
			},
		);
		const { items } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return items;
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const createTranscript = async (item: ApiParams) => {
	const body = applyTransform(item, [
		preRequestHandler('fileId'),
		camelToSnake(),
	]);

	try {
		const response =
			await getFileTranscriptService().createFileTranscript(body);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteTranscript = async (item: ApiParams) => {
	const body = applyTransform(item, [
		preRequestHandler('id'),
		camelToSnake(),
	]);

	try {
		const response =
			await getFileTranscriptService().deleteFileTranscript(body);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const CallTranscriptAPI = {
	create: createTranscript,
	get: getTranscript,
	delete: deleteTranscript,
};
