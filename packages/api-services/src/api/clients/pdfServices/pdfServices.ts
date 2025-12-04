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
		const { data, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(data, [snakeToCamel()]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const downloadPdfExport = async ({fileId, params}) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		downloadPdfExportQueryParams,
	);
  console.log(params);
  console.log(fileId);

	const { domainId } = applyTransform(params, [
		sanitize(fieldsToSend),
	]);

  console.log(domainId);

	try {
		const response = await getPdfService().downloadPdfExport(fileId, {
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
