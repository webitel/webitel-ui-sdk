import {
	CreateCallExportBody,
	CreateScreenrecordingExportBody,
	getPdfService,
	ListCallExportsQueryParams,
	ListScreenrecordingExportsQueryParams,
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

const createScreenrecordingExport = async ({ agentId, itemInstance }) => {
	const item = applyTransform(itemInstance, [
		sanitize(
			getShallowFieldsToSendFromZodSchema(CreateScreenrecordingExportBody),
		),
		camelToSnake(),
	]);

	try {
		const response = await getPdfService().createScreenrecordingExport(
			agentId,
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

const listScreenrecordingExports = async (params: any) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		ListScreenrecordingExportsQueryParams,
	);

	const { page, size, sort } = applyTransform(params, [
		merge(getDefaultGetParams()),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getPdfService().listScreenrecordingExports(
			params.agentId,
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

const createCallExport = async ({ callId, itemInstance }) => {
	const item = applyTransform(itemInstance, [
		sanitize(getShallowFieldsToSendFromZodSchema(CreateCallExportBody)),
		camelToSnake(),
	]);

	try {
		const response = await getPdfService().createCallExport(callId, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const listCallExports = async (params: any) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		ListCallExportsQueryParams,
	);

	const { page, size, sort } = applyTransform(params, [
		merge(getDefaultGetParams()),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getPdfService().listCallExports(params.callId, {
			page,
			size,
			sort,
		});
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

const deleteExport = async (id: string) => {
	try {
		const response = await getPdfService().deleteExport(id);
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
	delete: deleteExport,
};
