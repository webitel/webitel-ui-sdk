/*
  Two generated type sets meet here: the camelCase models describe what callers
  pass in, the src/gen-wire ones describe what actually goes on the wire.
*/
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
	sanitize,
	snakeToCamel,
} from '../../transformers';
import type { ApiId } from '../_shared/types';

/*
  The gateway matches nested range filters only by their dotted wire names,
  while callers pass them flat (`uploadedAtFrom`). Runs before sanitize(), which
  then drops the flat leftovers — they are not in the generated field list.
*/
const toWireRangeFilters = (params: Record<string, unknown>) => ({
	...params,
	'uploaded_at.from': params.uploaded_at_from,
	'uploaded_at.to': params.uploaded_at_to,
	'retention_until.from': params.retention_until_from,
	'retention_until.to': params.retention_until_to,
});

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
		camelToSnake(),
		toWireRangeFilters,
		sanitize(fieldsToSend),
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

const deleteFiles = async (id: string[]) => {
	try {
		const response = await getFileService().deleteFiles({
			id,
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
			camelToSnake(),
			toWireRangeFilters,
			sanitize(fieldsToSend),
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
	id: ApiId[];
}) => {
	try {
		const response = await getFileService().deleteScreenRecordings(
			String(userId),
			id.map(String),
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
			camelToSnake(),
			toWireRangeFilters,
			sanitize(fieldsToSend),
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
	id: ApiId[];
}) => {
	try {
		const response = await getFileService().deleteScreenRecordingsByAgent(
			String(agentId),
			id.map(String),
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
	/* the by-call endpoint takes a narrower param set than searchFiles */
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		SearchFilesByCallQueryParams,
	);

	const requestParams = applyTransform<SearchFilesByCallWireParams>(params, [
		merge(getDefaultGetParams()),
		camelToSnake(),
		toWireRangeFilters,
		sanitize(fieldsToSend),
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
