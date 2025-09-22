import {
	getFileService,
	searchFilesQueryParams,
	deleteFilesBody,
	searchScreenRecordingsQueryParams,
	deleteScreenRecordingsBody,
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
		uploadedAtFrom,
		uploadedAtTo,
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
			uploadedAtFrom,
			uploadedAtTo,
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
			items: applyTransform(items, []),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const deleteFiles = async ({ itemInstance }) => {
	const item = applyTransform(itemInstance, [
		sanitize(getShallowFieldsToSendFromZodSchema(deleteFilesBody)),
		camelToSnake(),
	]);
	try {
		const response = await getFileService().deleteFiles(item);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getScreenRecordingsList = async (params: any) => {
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
		uploadedAtFrom,
		uploadedAtTo,
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
		const response = await getFileService().searchScreenRecordings(params.userId, {
			page,
			size,
			q: q || params.search,
			sort,
			fields,
			id,
			uploadedAtFrom,
			uploadedAtTo,
			referenceId,
			retentionUntilFrom,
			retentionUntilTo,
			channel,
		});
		const { items, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, []),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const deleteScreenRecordings = async ({ userId, id, itemInstance }) => {
	const item = applyTransform(itemInstance, [
		sanitize(getShallowFieldsToSendFromZodSchema(deleteScreenRecordingsBody)),
		camelToSnake(),
	]);
	try {
		const response = await getFileService().deleteScreenRecordings(userId, id, item);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

export const FileServicesAPI = {
	getList: getFilesList,
	delete: deleteFiles,
	getScreenRecordingsList,
	deleteScreenRecordings,
};