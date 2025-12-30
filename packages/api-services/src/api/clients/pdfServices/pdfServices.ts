import {
  createCallExportBody,
  createScreenrecordingExportBody,
  listScreenrecordingExportsQueryParams,
  getPdfService,
} from '@webitel/api-services/gen';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';

import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
  localizeError,
  sanitize,
	snakeToCamel,
} from '../../transformers';

const createScreenrecordingExport = async ({ agentId, itemInstance }) => {
	const item = applyTransform(itemInstance, [
		sanitize(getShallowFieldsToSendFromZodSchema(createScreenrecordingExportBody)),
		camelToSnake(),
	]);

	try {
		const response = await getPdfService().createScreenrecordingExport(agentId, item);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
    throw applyTransform(err, [localizeError, notify]);
  }
};

const listScreenrecordingExports = async (params: any) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
    listScreenrecordingExportsQueryParams,
	);

	const { page, size } = applyTransform(params, [
		merge(getDefaultGetParams()),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getPdfService().listScreenrecordingExports(params.agentId, {
			page,
			size,
		});
		const { items, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [snakeToCamel()]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const createCallExport = async ({fileId, params}) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
    createCallExportBody,
	);

	const { domainId } = applyTransform(params, [
		sanitize(fieldsToSend),
	]);

	try {
		const response = await getPdfService().createCallExport(fileId, {
			domainId,
		});
		return response.data;
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const deleteExport = async (id: string) => {
	try {
		const response = await getPdfService().deleteExport(id);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

export const PdfServicesAPI = {
  createScreenrecordingExport,
	getList: listScreenrecordingExports,
  delete: deleteExport,
  download: createCallExport,
};
