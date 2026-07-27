import { FileTranscriptServiceApiFactory } from 'webitel-sdk';
import {
	getDefaultGetListResponse,
	getDefaultInstance,
	getDefaultOpenAPIConfig,
} from '../../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	snakeToCamel,
} from '../../../transformers';
import type { ApiParams } from '../../_shared/types';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const transcriptService = FileTranscriptServiceApiFactory(
	configuration,
	'',
	instance,
);

const getTranscript = async ({
	id,
	page = 1,
	size = 10000,
}: {
	id: string;
	page?: number;
	size?: number;
}) => {
	try {
		const response = await transcriptService.getFileTranscriptPhrases(
			id,
			page,
			size,
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
		const response = await transcriptService.createFileTranscript({
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
		fileId: string;
		callId: string;
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
		const response = await transcriptService.deleteFileTranscript(body);
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
