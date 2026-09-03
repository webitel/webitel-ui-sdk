import type { DeletePhonesParams } from '@webitel/api-services/gen/models';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import {
	getPhones,
	ListPhonesQueryParams,
	MergePhonesBodyItem,
	UpdatePhoneBody,
} from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	mergeEach,
	notify,
	sanitizeToWire,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type { ApiId, ApiParams } from '../_shared/types';

const getPhonesList = async ({
	parentId,
	...rest
}: ApiParams & {
	parentId: ApiId;
}) => {
	const defaultObject = {
		primary: false,
	};

	const listFieldsToSend = getShallowFieldsToSendFromZodSchema(
		ListPhonesQueryParams,
	);

	const { fields = [], ...queryParams } = applyTransform(rest, [
		sanitizeToWire(listFieldsToSend),
		merge(getDefaultGetParams()),
		starToSearch('q'),
	]);
	try {
		const response = await getPhones().listPhones(String(parentId), {
			...queryParams,
			fields: [
				'etag',
				...fields,
			],
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

const phoneFieldsToSend = [
	'number',
	'primary',
	'etag',
	'type',
];

const getPhone = async ({
	itemId,
	parentId,
}: {
	itemId: ApiId;
	parentId: ApiId;
}) => {
	try {
		const response = await getPhones().locatePhone(
			String(parentId),
			String(itemId),
			{
				fields: phoneFieldsToSend,
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

const addFieldsToSend =
	getShallowFieldsToSendFromZodSchema(MergePhonesBodyItem);

const addPhone = async ({
	parentId,
	itemInstance,
}: {
	parentId: ApiId;
	itemInstance: ApiParams;
}) => {
	const item = applyTransform(itemInstance, [
		sanitizeToWire(addFieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getPhones().mergePhones(String(parentId), [
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

const updateFieldsToSend = getShallowFieldsToSendFromZodSchema(UpdatePhoneBody);

const updatePhone = async ({
	itemInstance,
	parentId,
}: {
	itemInstance: ApiParams & {
		etag: string;
	};
	parentId: ApiId;
}) => {
	const item = applyTransform(itemInstance, [
		sanitizeToWire(updateFieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getPhones().updatePhone(
			String(parentId),
			itemInstance.etag,
			item,
			{
				fields: phoneFieldsToSend,
			},
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

const patchPhone = async ({
	parentId,
	changes,
	etag,
}: {
	parentId: ApiId;
	changes: ApiParams;
	etag: string;
}) => {
	const body = applyTransform(changes, [
		sanitizeToWire(updateFieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getPhones().updatePhone2(
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

const deletePhone = async ({
	etag,
	parentId,
}: {
	etag: string;
	parentId: ApiId;
}) => {
	try {
		const response = await getPhones().deletePhone(String(parentId), etag);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getPhonesLookup = (
	params: ApiParams & {
		parentId: ApiId;
	},
) =>
	getPhonesList({
		...params,
		fields: (params.fields as string[]) || [
			'etag',
			'number',
			'primary',
		],
	});

/**
 * raw bulk endpoints — take/return the whole phones array in one call,
 * unlike add/update above which normalize a single item for createCardStore
 */
const mergePhones = async ({
	contactId,
	phones,
	params,
	options,
}: {
	contactId: ApiId;
	phones: ApiParams[];
	params: ApiParams;
	options: ApiParams;
}) => {
	const body = applyTransform(phones, [
		camelToSnake(),
	]);
	try {
		const response = await getPhones().mergePhones(
			String(contactId),
			body,
			params,
			options,
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

const resetPhones = async ({
	contactId,
	phones,
	params,
	options,
}: {
	contactId: ApiId;
	phones: ApiParams[];
	params: ApiParams;
	options: ApiParams;
}) => {
	const body = applyTransform(phones, [
		camelToSnake(),
	]);
	try {
		const response = await getPhones().resetPhones(
			String(contactId),
			body,
			params,
			options,
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

const deletePhones = async ({
	contactId,
	params,
	options,
}: {
	contactId: ApiId;
	params: DeletePhonesParams;
	options: ApiParams;
}) => {
	try {
		const response = await getPhones().deletePhones(
			String(contactId),
			params,
			options,
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

export const PhonesAPI = {
	getList: getPhonesList,
	get: getPhone,
	add: addPhone,
	update: updatePhone,
	patch: patchPhone,
	delete: deletePhone,
	getLookup: getPhonesLookup,

	merge: mergePhones,
	reset: resetPhones,
	deleteMany: deletePhones,
};
