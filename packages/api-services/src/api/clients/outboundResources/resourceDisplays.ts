import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import type { AxiosError } from 'axios';
import type { Composer } from 'vue-i18n';
import { config } from '../../../config/config';
import {
	CreateOutboundResourceDisplayBody,
	getOutboundResourceService,
	SearchOutboundResourceDisplayQueryParams,
	UpdateOutboundResourceDisplayBody,
} from '../../../gen-wire';
import {
	getDefaultGetListResponse,
	getDefaultGetParams,
	getDefaultInstance,
} from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitizeToWire,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type {
	ApiId,
	ApiParams,
	NestedAddItemParams,
	NestedDeleteItemParams,
	NestedGetItemParams,
	NestedUpdateItemParams,
} from '../_shared/types';

const instance = getDefaultInstance();

const getResourceDisplaysList = async (params: ApiParams) => {
	const { parentId, ...rest } = params;
	const requestParams = applyTransform(rest, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params: ApiParams) => ({
			...params,
			q: params.q ?? params.search,
		}),
		sanitizeToWire(
			getShallowFieldsToSendFromZodSchema(
				SearchOutboundResourceDisplayQueryParams,
			),
		),
		camelToSnake(),
	]);

	try {
		const response =
			await getOutboundResourceService().searchOutboundResourceDisplay(
				String(parentId),
				requestParams,
			);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
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

const getResourceDisplay = async ({
	parentId,
	itemId: id,
}: NestedGetItemParams) => {
	try {
		const response =
			await getOutboundResourceService().readOutboundResourceDisplay(
				String(parentId),
				String(id),
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

const addResourceDisplay = async ({
	parentId,
	itemInstance,
}: NestedAddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitizeToWire(
			getShallowFieldsToSendFromZodSchema(CreateOutboundResourceDisplayBody),
		),
		camelToSnake(),
	]);
	try {
		const response =
			await getOutboundResourceService().createOutboundResourceDisplay(
				String(parentId),
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

const updateResourceDisplay = async ({
	parentId,
	itemInstance,
	itemId: id,
}: NestedUpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitizeToWire(
			getShallowFieldsToSendFromZodSchema(UpdateOutboundResourceDisplayBody),
		),
		camelToSnake(),
	]);
	try {
		const response =
			await getOutboundResourceService().updateOutboundResourceDisplay(
				String(parentId),
				String(id),
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

const deleteResourceDisplay = async ({
	parentId,
	id,
}: NestedDeleteItemParams) => {
	try {
		const response =
			await getOutboundResourceService().deleteOutboundResourceDisplay(
				String(parentId),
				String(id),
			);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

/**
 * [Claude] Invalid numbers in an uploaded file come back with an id that starts
 * with `cc_outbound_resource.validatePhoneNumber`. Only the prefix is known, so
 * `translateError`, which looks the translation up by the exact id, does not fit.
 *
 * [WTEL-10579](https://webitel.atlassian.net/browse/WTEL-10579)
 */
const translatePhoneNumberError = (
	err: AxiosError<{
		id?: string;
		translation?: string;
	}>,
) => {
	const data = err.response?.data;
	if (
		data?.id?.startsWith('cc_outbound_resource.validatePhoneNumber') &&
		config.i18n?.global
	) {
		data.translation = (config.i18n.global as Composer).t(
			'backendErrors.ccOutboundResource.validatePhoneNumber',
		);
	}
	return err;
};

/**
 * [Claude] Bulk number import from a csv file: the file itself is sent, and the
 * backend parses it and validates the numbers. `POST /displays/:id` is not in
 * the OpenAPI spec, so there is no generated method for it — the request goes
 * through the default instance instead.
 *
 * [WTEL-10579](https://webitel.atlassian.net/browse/WTEL-10579)
 */
const uploadResourceDisplays = async ({
	parentId,
	file,
	delimiter,
	map,
}: {
	parentId: ApiId;
	file: File;
	delimiter: string;
	map: string;
}) => {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('delimiter', delimiter);
	formData.append('map', map);

	try {
		const response = await instance.post(`/displays/${parentId}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			translatePhoneNumberError,
			notify,
		]);
	}
};

export const ResourceDisplaysAPI = {
	getList: getResourceDisplaysList,
	get: getResourceDisplay,
	add: addResourceDisplay,
	update: updateResourceDisplay,
	delete: deleteResourceDisplay,
	upload: uploadResourceDisplays,
};
