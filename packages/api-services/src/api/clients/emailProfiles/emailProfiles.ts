import { EngineEmailAuthType } from '../../../gen/_models';
import { getEmailProfileService } from '../../../gen-wire';
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
	'domainId',
	'enabled',
	'imapHost',
	'smtpHost',
	'fetchInterval',
	'imapPort',
	'login',
	'mailbox',
	'password',
	'schema',
	'smtpPort',
	'authType',
	'listen',
	'logged',
	'params',
];

const getEmailProfilesList = async (params: ApiParams) => {
	const defaultObject = {
		enabled: false,
	};

	const { page, size, search, sort, fields } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response = await getEmailProfileService().searchEmailProfile({
			page,
			size,
			// the generated param is `q`; `search` is what the datalist store sends
			q: search,
			sort,
			fields,
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

const getEmailProfile = async ({ itemId: id }: GetItemParams) => {
	const defaultObject = {
		imapPort: 0,
		smtpPort: 0,
		authType: EngineEmailAuthType.Plain,
	};

	try {
		const response = await getEmailProfileService().readEmailProfile(
			String(id),
		);
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

const addEmailProfile = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getEmailProfileService().createEmailProfile(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchEmailProfile = async ({ changes, id }: PatchItemParams) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getEmailProfileService().patchEmailProfile(
			String(id),
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

const updateEmailProfile = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getEmailProfileService().updateEmailProfile(
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

const deleteEmailProfile = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getEmailProfileService().deleteEmailProfile(
			String(id),
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const loginEmailProfile = async ({ id }: { id: ApiId }) => {
	try {
		const response = await getEmailProfileService().loginEmailProfile(
			Number(id),
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const logoutEmailProfile = async ({ id }: { id: ApiId }) => {
	try {
		const response = await getEmailProfileService().logoutEmailProfile(
			Number(id),
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getEmailProfilesLookup = (
	params: Parameters<typeof getEmailProfilesList>[0],
) =>
	getEmailProfilesList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const EmailProfilesAPI = {
	getList: getEmailProfilesList,
	get: getEmailProfile,
	add: addEmailProfile,
	patch: patchEmailProfile,
	update: updateEmailProfile,
	delete: deleteEmailProfile,
	getLookup: getEmailProfilesLookup,
	login: loginEmailProfile,
	logout: logoutEmailProfile,
};
