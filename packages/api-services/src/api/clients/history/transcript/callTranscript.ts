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

const createTranscript = async ({ callId }: { callId: string }) => {
	const preRequestHandler = (callId: string) => {
		return Array.isArray(callId)
			? callId
			: [
					callId,
				];
	};

	const uuid = applyTransform(callId, [
		preRequestHandler,
		camelToSnake(),
	]);

	try {
		const response = await getFileTranscriptService().createFileTranscript({
			uuid,
		});
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
	const preRequestHandler = ({
		fileId,
		callId,
	}: {
		fileId: ApiId;
		callId: ApiId;
	}) => {
		if (fileId) {
			return {
				id: Array.isArray(fileId)
					? fileId
					: [
							fileId,
						],
			};
		}
		return {
			uuid: Array.isArray(callId)
				? callId
				: [
						callId,
					],
		};
	};

	const body = applyTransform(item, [
		preRequestHandler,
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
