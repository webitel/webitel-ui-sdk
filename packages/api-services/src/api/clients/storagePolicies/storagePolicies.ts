import deepCopy from 'deep-copy';
import { getFilePoliciesService } from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	mergeEach,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type {
	AddItemParams,
	ApiId,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	PatchItemParams,
	UpdateItemParams,
} from '../_shared/types';

const fieldsToSend = [
	'name',
	'description',
	'channels',
	'mimeTypes',
	'retentionDays',
	'speedDownload',
	'speedUpload',
	'maxUploadSize',
	'enabled',
	'encrypt',
];

/**
 * The list endpoint returns nothing useful without an explicit field list, so
 * this client always asks for the full row.
 */
const listFields = [
	'id',
	'name',
	'description',
	'channels',
	'mime_types',
	'retention_days',
	'speed_download',
	'speed_upload',
	'max_upload_size',
	'position',
	'enabled',
	'encrypt',
];

const defaultObject = {
	name: '',
	description: '',
	channels: [],
	mimeTypes: [],
	retentionDays: 0,
	speedDownload: 0,
	speedUpload: 0,
	maxUploadSize: 0,
	position: 0,
	enabled: false,
};

const preRequestHandler = (item: ApiParams) => {
	const copy = deepCopy(item);
	return {
		...copy,
		channels: item.channels.map(
			(channel: ApiParams) => channel.value || channel,
		),
	};
};

const getStoragePoliciesList = async (params: ApiParams) => {
	const { page, size, search, sort, id } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response = await getFilePoliciesService().searchFilePolicies({
			page,
			size,
			// the generated param is `q`; `search` is what the datalist store sends
			q: search,
			sort,
			fields: listFields,
			id,
		});
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				mergeEach(defaultObject),
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getStoragePolicy = async ({ itemId: id }: GetItemParams) => {
	try {
		const response = await getFilePoliciesService().readFilePolicy(Number(id));
		return applyTransform(response.data, [
			snakeToCamel(),
			merge(defaultObject),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addStoragePolicy = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		// `channels` values mirror the StorageUploadFileChannel enum and stay camelCase
		camelToSnake([
			'channels',
		]),
	]);
	try {
		const response = await getFilePoliciesService().createFilePolicy(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateStoragePolicy = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		// `channels` values mirror the StorageUploadFileChannel enum and stay camelCase
		camelToSnake([
			'channels',
		]),
	]);
	try {
		const response = await getFilePoliciesService().updateFilePolicy(
			Number(id),
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

const patchStoragePolicy = async ({ changes, id }: PatchItemParams) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getFilePoliciesService().patchFilePolicy(
			Number(id),
			body,
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

const deleteStoragePolicy = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getFilePoliciesService().deleteFilePolicy(
			Number(id),
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const movePositionStoragePolicy = async ({
	fromId,
	toId,
}: {
	fromId: ApiId;
	toId: ApiId;
}) => {
	try {
		const response = await getFilePoliciesService().movePositionFilePolicy(
			Number(fromId),
			Number(toId),
			{},
		);
		return applyTransform(response.data, [
			notify(({ callback }) =>
				callback({
					type: 'success',
					text: 'Successfully saved',
				}),
			),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const applyStoragePolicies = async (id: ApiId) => {
	try {
		const response = await getFilePoliciesService().filePolicyApply(
			Number(id),
			{},
		);
		return response.data;
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getStoragePoliciesLookup = (
	params: Parameters<typeof getStoragePoliciesList>[0],
) =>
	getStoragePoliciesList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const StoragePoliciesAPI = {
	getList: getStoragePoliciesList,
	get: getStoragePolicy,
	add: addStoragePolicy,
	patch: patchStoragePolicy,
	update: updateStoragePolicy,
	delete: deleteStoragePolicy,
	movePosition: movePositionStoragePolicy,
	applyPolicies: applyStoragePolicies,
	getLookup: getStoragePoliciesLookup,
};
