import {
	getPhones,
	ListPhonesQueryParams,
	MergePhonesBodyItem,
	UpdatePhoneBody,
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

const addFieldsToSend =
	getShallowFieldsToSendFromZodSchema(MergePhonesBodyItem);
const updateFieldsToSend = getShallowFieldsToSendFromZodSchema(UpdatePhoneBody);

const getPhonesList = async ({
	parentId,
	...rest
}: Record<string, unknown> & {
	parentId: string;
}) => {
	const defaultObject = {
		primary: false,
	};

	const listFieldsToSend = getShallowFieldsToSendFromZodSchema(
		ListPhonesQueryParams,
	);

	const { page, size, q, sort, fields, id } = applyTransform(rest, [
		sanitize(listFieldsToSend),
		merge(getDefaultGetParams()),
		starToSearch('q'),
	]);
	try {
		const response = await getPhones().listPhones(parentId, {
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

const getPhone = async ({
	itemId,
	parentId,
}: {
	itemId: string;
	parentId: string;
}) => {
	const fields = [
		'number',
		'primary',
		'etag',
		'type',
	];
	try {
		const response = await getPhones().locatePhone(parentId, itemId, {
			fields,
		});
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addPhone = async ({
	parentId,
	itemInstance,
}: {
	parentId: string;
	itemInstance: Record<string, unknown>;
}) => {
	const item = applyTransform(itemInstance, [
		sanitize(addFieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getPhones().mergePhones(parentId, [
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

const updatePhone = async ({
	itemInstance,
	parentId,
}: {
	itemInstance: Record<string, unknown> & {
		etag: string;
	};
	parentId: string;
}) => {
	const item = applyTransform(itemInstance, [
		sanitize(updateFieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getPhones().updatePhone(
			parentId,
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

const patchPhone = async ({
	parentId,
	changes,
	etag,
}: {
	parentId: string;
	changes: Record<string, unknown>;
	etag: string;
}) => {
	const body = applyTransform(changes, [
		sanitize(updateFieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getPhones().updatePhone(parentId, etag, body);
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
	parentId: string;
}) => {
	try {
		const response = await getPhones().deletePhone(parentId, etag);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getPhonesLookup = (
	params: Record<string, unknown> & {
		parentId: string;
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
const mergePhones = async ({ contactId, phones, params, options }) => {
	const body = applyTransform(phones, [
		camelToSnake(),
	]);
	try {
		const response = await getPhones().mergePhones(
			contactId,
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

const resetPhones = async ({ contactId, phones, params, options }) => {
	const body = applyTransform(phones, [
		camelToSnake(),
	]);
	try {
		const response = await getPhones().resetPhones(
			contactId,
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

const deletePhones = async ({ contactId, params, options }) => {
	try {
		const response = await getPhones().deletePhones(contactId, params, options);
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
