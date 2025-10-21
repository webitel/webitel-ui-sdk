import {
	downloadPdfExportQueryParams,
	generatePdfExportBody,
	getPdfExportHistoryQueryParams,
	getPdfService,
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

const generatePdfExport = async ({ agentId, itemInstance }) => {
	const item = applyTransform(itemInstance, [
		sanitize(getShallowFieldsToSendFromZodSchema(generatePdfExportBody)),
		camelToSnake(),
	]);

	try {
		const response = await getPdfService().generatePdfExport(agentId, item);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getPdfExportHistory = async (params: any) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		getPdfExportHistoryQueryParams,
	);

	const { page, size } = applyTransform(params, [
		merge(getDefaultGetParams()),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getPdfService().getPdfExportHistory(params.agentId, {
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

const downloadPdfExport = async (params: any) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		downloadPdfExportQueryParams,
	);

	const { domainId } = applyTransform(params, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getPdfService().downloadPdfExport(params.fileId, {
			domainId,
		});
		return response.data;
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

export const PdfServicesAPI = {
	generatePdfExport,
	getList: getPdfExportHistory,
	download: downloadPdfExport,
};
