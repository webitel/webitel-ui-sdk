import type {
	SearchFilesByCallParams,
	SearchFilesParams,
	SearchScreenRecordingsByAgentParams,
	SearchScreenRecordingsParams,
} from '@webitel/api-services/gen/models';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import {
	getFileService,
	SearchFilesByCallQueryParams,
	SearchFilesQueryParams,
	SearchScreenRecordingsByAgentQueryParams,
	SearchScreenRecordingsQueryParams,
} from '../../../gen-wire';
import type {
	SearchFilesByCallParams as SearchFilesByCallWireParams,
	SearchFilesParams as SearchFilesWireParams,
	SearchScreenRecordingsByAgentParams as SearchScreenRecordingsByAgentWireParams,
	SearchScreenRecordingsParams as SearchScreenRecordingsWireParams,
} from '../../../gen-wire/_models';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitizeToWire,
	snakeToCamel,
} from '../../transformers';
import type { ApiId } from '../_shared/types';

const getFilesList = async (
	params: SearchFilesParams & {
		search?: string;
	},
) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		SearchFilesQueryParams,
	);

	const requestParams = applyTransform<SearchFilesWireParams>(params, [
		merge(getDefaultGetParams()),
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getFileService().searchFiles({
			...requestParams,
			q: requestParams.q || params.search,
		});
		const { items, next } = applyTransform(response.data, [
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

const deleteFiles = async (id: string | string[]) => {
	const ids = Array.isArray(id)
		? id
		: [
				id,
			];
	try {
		const response = await getFileService().deleteFiles({
			id: ids,
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

const getScreenRecordingsByUser = async (
	params: SearchScreenRecordingsParams & {
		userId: ApiId;
		search?: string;
	},
) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		SearchScreenRecordingsQueryParams,
	);

	const requestParams = applyTransform<SearchScreenRecordingsWireParams>(
		params,
		[
			merge(getDefaultGetParams()),
			sanitizeToWire(fieldsToSend),
			camelToSnake(),
		],
	);

	try {
		const response = await getFileService().searchScreenRecordings(
			String(params.userId),
			{
				...requestParams,
				q: requestParams.q || params.search,
				fields: [
					'id',
					...(requestParams.fields ?? []),
				],
			},
		);
		const { items, next } = applyTransform(response.data, [
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

const deleteScreenRecordingsByUser = async ({
	userId,
	id,
}: {
	userId: ApiId;
	id: ApiId | ApiId[];
}) => {
	try {
		const response = await getFileService().deleteScreenRecordings(
			String(userId),
			Array.isArray(id)
				? id.map(String)
				: [
						String(id),
					],
			{},
		);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getScreenRecordingsByAgent = async (
	params: SearchScreenRecordingsByAgentParams & {
		agentId: ApiId;
		search?: string;
	},
) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		SearchScreenRecordingsByAgentQueryParams,
	);

	const requestParams = applyTransform<SearchScreenRecordingsByAgentWireParams>(
		params,
		[
			merge(getDefaultGetParams()),
			sanitizeToWire(fieldsToSend),
			camelToSnake(),
		],
	);

	try {
		const response = await getFileService().searchScreenRecordingsByAgent(
			String(params.agentId),
			{
				...requestParams,
				q: requestParams.q || params.search,
				fields: [
					'id',
					'view_name',
					'mime_type',
					...(requestParams.fields ?? []),
				],
			},
		);
		const { items, next } = applyTransform(response.data, [
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

const deleteScreenRecordingsByAgent = async ({
	agentId,
	id,
}: {
	agentId: ApiId;
	id: ApiId | ApiId[];
}) => {
	try {
		const response = await getFileService().deleteScreenRecordingsByAgent(
			String(agentId),
			Array.isArray(id)
				? id.map(String)
				: [
						String(id),
					],
			{},
		);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getFilesListByCall = async (
	params: SearchFilesByCallParams & {
		callId: ApiId;
		search?: string;
	},
) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		SearchFilesByCallQueryParams,
	);

	const requestParams = applyTransform<SearchFilesByCallWireParams>(params, [
		merge(getDefaultGetParams()),
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getFileService().searchFilesByCall(
			String(params.callId),
			{
				...requestParams,
				q: requestParams.q ?? params.search,
			},
		);

		const { items, next } = applyTransform(response.data, [
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

export const FileServicesAPI = {
	getList: getFilesList,
	delete: deleteFiles,
	getScreenRecordingsByUser,
	deleteScreenRecordingsByUser,
	getScreenRecordingsByAgent,
	deleteScreenRecordingsByAgent,
	getListByCall: getFilesListByCall,
};
