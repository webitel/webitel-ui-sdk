import { getPhones } from '@webitel/api-services/gen';
import type { DeletePhonesParams } from '@webitel/api-services/gen/models';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type { ApiId, ApiParams } from '../_shared/types';

const getPhonesList = async ({
	contactId,
	options,
	...params
}: {
	contactId: ApiId;
	options: ApiParams;
} & ApiParams) => {
	const listParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);
	try {
		const response = await getPhones().listPhones(
			String(contactId),
			listParams,
			options,
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

const getPhone = async ({
	contactId,
	etag,
	params,
	options,
}: {
	contactId: ApiId;
	etag: string;
	params: ApiParams;
	options: ApiParams;
}) => {
	try {
		const response = await getPhones().locatePhone(
			String(contactId),
			etag,
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

const updatePhone = async ({
	contactId,
	etag,
	data,
	params,
	options,
}: {
	contactId: ApiId;
	etag: string;
	data: ApiParams;
	params: ApiParams;
	options: ApiParams;
}) => {
	const body = applyTransform(data, [
		camelToSnake(),
	]);
	try {
		const response = await getPhones().updatePhone(
			String(contactId),
			etag,
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

const patchPhone = async ({
	contactId,
	etag,
	changes,
	params,
	options,
}: {
	contactId: ApiId;
	etag: string;
	changes: ApiParams;
	params: ApiParams;
	options: ApiParams;
}) => {
	const body = applyTransform(changes, [
		camelToSnake(),
	]);
	try {
		const response = await getPhones().updatePhone2(
			String(contactId),
			etag,
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

const deletePhone = async ({
	contactId,
	etag,
	params,
	options,
}: {
	contactId: ApiId;
	etag: string;
	params: ApiParams;
	options: ApiParams;
}) => {
	try {
		const response = await getPhones().deletePhone(
			String(contactId),
			etag,
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

const getPhonesLookup = (params: Parameters<typeof getPhonesList>[0]) =>
	getPhonesList({
		...params,
		fields: params?.fields || [
			'etag',
			'number',
			'priority',
		],
	});

export const PhonesAPI = {
	getList: getPhonesList,
	getLookup: getPhonesLookup,
	merge: mergePhones,
	reset: resetPhones,
	deleteMany: deletePhones,
	get: getPhone,
	update: updatePhone,
	patch: patchPhone,
	delete: deletePhone,
};
