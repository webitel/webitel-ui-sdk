import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import {
	CreateCallExportBody,
	CreateScreenrecordingExportBody,
	DownloadCallArchiveQueryParams,
	getPdfService,
	ListCallExportsQueryParams,
	ListScreenrecordingExportsQueryParams,
} from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitizeToWire,
	snakeToCamel,
} from '../../transformers';
import type { ApiId, ApiParams } from '../_shared/types';

const createScreenrecordingExport = async ({
	agentId,
	itemInstance,
}: {
	agentId: ApiId;
	itemInstance: ApiParams;
}) => {
	const item = applyTransform(itemInstance, [
		sanitizeToWire(
			getShallowFieldsToSendFromZodSchema(CreateScreenrecordingExportBody),
		),
		camelToSnake(),
	]);

	try {
		const response = await getPdfService().createScreenrecordingExport(
			String(agentId),
			item,
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

const listScreenrecordingExports = async (params: { agentId: ApiId }) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		ListScreenrecordingExportsQueryParams,
	);

	const { page, size, sort } = applyTransform(params, [
		merge(getDefaultGetParams()),
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getPdfService().listScreenrecordingExports(
			String(params.agentId),
			{
				page,
				size,
				sort,
			},
		);
		const { items, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				snakeToCamel(),
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const createCallExport = async ({
	callId,
	itemInstance,
}: {
	callId: ApiId;
	itemInstance: ApiParams;
}) => {
	const item = applyTransform(itemInstance, [
		sanitizeToWire(getShallowFieldsToSendFromZodSchema(CreateCallExportBody)),
		camelToSnake(),
	]);

	try {
		const response = await getPdfService().createCallExport(
			String(callId),
			item,
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

const listCallExports = async (params: { callId: ApiId }) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		ListCallExportsQueryParams,
	);

	const { page, size, sort } = applyTransform(params, [
		merge(getDefaultGetParams()),
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getPdfService().listCallExports(
			String(params.callId),
			{
				page,
				size,
				sort,
			},
		);
		const { items, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				snakeToCamel(),
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const downloadCallArchive = async ({
	callId,
	fileIds,
}: {
	callId: ApiId;
	fileIds?: (string | number)[];
}) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		DownloadCallArchiveQueryParams,
	);

	const params = applyTransform(
		{
			fileIds,
		},
		[
			sanitizeToWire(fieldsToSend),
			camelToSnake(),
		],
	);

	try {
		return await getPdfService().downloadCallArchive(String(callId), params, {
			responseType: 'blob',
		});
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteExport = async (id: ApiId) => {
	try {
		const response = await getPdfService().deleteExport(String(id));
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const PdfServicesAPI = {
	createScreenrecordingExport,
	getList: listScreenrecordingExports,
	createCallExport,
	listCallExports,
	downloadCallArchive,
	delete: deleteExport,
};
