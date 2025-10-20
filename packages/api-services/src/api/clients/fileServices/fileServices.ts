import {
	getFileService,
	searchFilesQueryParams,
	searchScreenRecordingsByAgentQueryParams,
	searchScreenRecordingsQueryParams,
} from '@webitel/api-services/gen';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';

import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
} from '../../transformers';

const getFilesList = async (params: any) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		searchFilesQueryParams,
	);

	const {
		page,
		size,
		q,
		sort,
		fields,
		id,
		uploaded_at_from: uploadedAtFrom,
		uploaded_at_to: uploadedAtTo,
		uploadedBy,
		referenceId,
		channel,
		retentionUntilFrom,
		retentionUntilTo,
	} = applyTransform(params, [
		merge(getDefaultGetParams()),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getFileService().searchFiles({
			page,
			size,
			q: q || params.search,
			sort,
			fields,
			id,
			'uploaded_at.from': uploadedAtFrom,
			'uploaded_at.to': uploadedAtTo,
			uploadedBy,
			referenceId,
			channel,
			retentionUntilFrom,
			retentionUntilTo,
		});
		const { items, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()),
		]);
		return {
			items,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const deleteFiles = async (id) => {
	try {
		const response = await getFileService().deleteFiles({ id });
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getScreenRecordingsByUser = async (params: any) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		searchScreenRecordingsQueryParams,
	);

	const {
		page,
		size,
		q,
		sort,
		fields,
		id,
		uploaded_at_from: uploadedAtFrom,
		uploaded_at_to: uploadedAtTo,
		referenceId,
		retentionUntilFrom,
		retentionUntilTo,
		channel,
	} = applyTransform(params, [
		merge(getDefaultGetParams()),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getFileService().searchScreenRecordings(
			params.userId,
			{
				page,
				size,
				q: q || params.search,
				sort,
				fields: ['id', ...fields],
				id,
				'uploaded_at.from': uploadedAtFrom,
				'uploaded_at.to': uploadedAtTo,
				referenceId,
				retentionUntilFrom,
				retentionUntilTo,
				channel,
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
		throw applyTransform(err, [notify]);
	}
};

const deleteScreenRecordingsByUser = async ({ userId, id }) => {
	try {
		const response = await getFileService().deleteScreenRecordings(
			userId,
			id,
			{},
		);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getScreenRecordingsByAgent = async (params: any) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		searchScreenRecordingsByAgentQueryParams,
	);

	const {
		page,
		size,
		q,
		sort,
		fields,
		id,
		uploaded_at_from: uploadedAtFrom,
		uploaded_at_to: uploadedAtTo,
		referenceId,
		retentionUntilFrom,
		retentionUntilTo,
		channel,
	} = applyTransform(params, [
		merge(getDefaultGetParams()),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getFileService().searchScreenRecordingsByAgent(
			params.agentId,
			{
				page,
				size,
				q: q || params.search,
				sort,
				fields: ['id', 'view_name', 'mime_type', ...fields],
				id,
				'uploaded_at.from': uploadedAtFrom,
				'uploaded_at.to': uploadedAtTo,
				referenceId,
				retentionUntilFrom,
				retentionUntilTo,
				channel,
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
		throw applyTransform(err, [notify]);
	}
};

const deleteScreenRecordingsByAgent = async ({ agentId, id }) => {
	try {
		const response = await getFileService().deleteScreenRecordingsByAgent(
			agentId,
			id,
			{},
		);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

export const FileServicesAPI = {
	getList: getFilesList,
	delete: deleteFiles,
	getScreenRecordingsByUser,
	deleteScreenRecordingsByUser,
	getScreenRecordingsByAgent,
	deleteScreenRecordingsByAgent,
};
