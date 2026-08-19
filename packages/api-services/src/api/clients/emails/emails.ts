import {
	getEmails,
	MergeEmailsBodyItem,
	UpdateEmailBody,
} from '@webitel/api-services/gen';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
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
import type { ApiId, ApiParams } from '../_shared/types';

const addFieldsToSend =
	getShallowFieldsToSendFromZodSchema(MergeEmailsBodyItem);
const updateFieldsToSend = getShallowFieldsToSendFromZodSchema(UpdateEmailBody);

const getList = async (params: ApiParams) => {
	const defaultObject = {
		primary: false,
	};

	const listFieldsToSend = [
		'parentId',
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
	];
	const { parentId, page, size, q, sort, fields, id } = applyTransform(params, [
		sanitize(listFieldsToSend),
		merge(getDefaultGetParams()),
		starToSearch('q'),
	]);
	try {
		const response = await getEmails().listEmails(parentId, {
			page,
			size,
			q,
			sort,
			fields: [
				'etag',
				...fields,
			],
			id,
		});
		const { data, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(data, [
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

const get = async ({
	itemId,
	parentId,
}: {
	itemId: ApiId;
	parentId: ApiId;
}) => {
	const fields = [
		'email',
		'primary',
		'etag',
		'type',
	];
	try {
		const response = await getEmails().locateEmail(
			String(parentId),
			String(itemId),
			{
				fields,
			},
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

const add = async ({
	parentId,
	itemInstance,
}: {
	parentId: ApiId;
	itemInstance: ApiParams;
}) => {
	const item = applyTransform(itemInstance, [
		sanitize(addFieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getEmails().mergeEmails(String(parentId), [
			item,
		]);
		const { data } = applyTransform(response.data, [
			snakeToCamel(),
		]);
		return data[0];
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const update = async ({
	itemInstance,
	parentId,
}: {
	itemInstance: ApiParams & {
		etag: string;
	};
	parentId: ApiId;
}) => {
	const item = applyTransform(itemInstance, [
		sanitize(updateFieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getEmails().updateEmail(
			String(parentId),
			itemInstance.etag,
			item,
		);
		const { data } = applyTransform(response.data, [
			snakeToCamel(),
		]);
		return data[0];
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patch = async ({
	parentId,
	changes,
	etag,
}: {
	parentId: ApiId;
	changes: ApiParams;
	etag: string;
}) => {
	const body = applyTransform(changes, [
		sanitize(updateFieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getEmails().updateEmail(
			String(parentId),
			etag,
			body,
		);
		const { data } = applyTransform(response.data, [
			snakeToCamel(),
		]);
		return data[0];
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteItem = async ({
	etag,
	parentId,
}: {
	etag: string;
	parentId: ApiId;
}) => {
	try {
		const response = await getEmails().deleteEmail(String(parentId), etag);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const EmailsAPI = {
	getList,
	get,
	add,
	update,
	patch,
	delete: deleteItem,
};
