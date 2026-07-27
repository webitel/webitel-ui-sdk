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
import type { ApiParams } from '../_shared/types';

const getPhonesList = async ({
	contactId,
	options,
	...params
}: {
	contactId: string;
	options: ApiParams;
} & ApiParams) => {
	const listParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);
	try {
		const response = await getPhones().listPhones(
			contactId,
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
	contactId: string;
	etag: string;
	params: ApiParams;
	options: ApiParams;
}) => {
	try {
		const response = await getPhones().locatePhone(
			contactId,
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
	contactId: string;
	phones: ApiParams[];
	params: ApiParams;
	options: ApiParams;
}) => {
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

const resetPhones = async ({
	contactId,
	phones,
	params,
	options,
}: {
	contactId: string;
	phones: ApiParams[];
	params: ApiParams;
	options: ApiParams;
}) => {
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

const updatePhone = async ({
	contactId,
	etag,
	data,
	params,
	options,
}: {
	contactId: string;
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
			contactId,
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
	contactId: string;
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
			contactId,
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
	contactId: string;
	etag: string;
	params: ApiParams;
	options: ApiParams;
}) => {
	try {
		const response = await getPhones().deletePhone(
			contactId,
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
	contactId: string;
	params: DeletePhonesParams;
	options: ApiParams;
}) => {
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
