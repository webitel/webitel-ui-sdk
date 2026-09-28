import {
	type EngineSystemSetting,
	EngineSystemSettingName,
} from '@webitel/api-services/gen/models';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import type { UserPasswordRules } from '@webitel/api-services/validations';
import {
	CreateSystemSettingBody,
	getSystemSettingService,
	SearchAvailableSystemSettingQueryParams,
	SearchSystemSettingQueryParams,
} from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
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
	AddItemParams,
	ApiParams,
	DeleteItemParams,
	GetItemParams,
	UpdateItemParams,
} from '../_shared/types';

const getList = async (params: ApiParams) => {
	const listFieldsToSend = getShallowFieldsToSendFromZodSchema(
		SearchSystemSettingQueryParams,
	);

	const { page, size, fields, sort, name, q } = applyTransform(params, [
		merge(getDefaultGetParams()),
		merge({
			q: params.search,
		}),
		sanitizeToWire(listFieldsToSend),
		starToSearch('q'),
		camelToSnake(),
	]);

	try {
		const response = await getSystemSettingService().searchSystemSetting({
			page,
			size,
			fields,
			sort,
			name,
			q,
		});
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

const get = async ({ itemId: id }: GetItemParams) => {
	try {
		const response = await getSystemSettingService().readSystemSetting(
			Number(id),
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

// `value` is a free-form `google.protobuf.Value` on the backend and has no
// fixed shape, so it's not part of the generated body schema — kept on the
// allowlist by hand alongside it (mirrors `custom` on contacts).
const fieldsToSend = [
	...getShallowFieldsToSendFromZodSchema(CreateSystemSettingBody),
	'value',
];

const add = async ({ itemInstance }: AddItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getSystemSettingService().createSystemSetting(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const update = async ({ itemInstance, itemId: id }: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getSystemSettingService().updateSystemSetting(
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

const getLookup = (params: Parameters<typeof getList>[0]) =>
	getList({
		...params,
		fields: params.fields || [
			'name',
		],
	});

const deleteItem = async ({ id }: DeleteItemParams) => {
	try {
		const response = await getSystemSettingService().deleteSystemSetting(
			Number(id),
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getObjectsList = async (params: ApiParams) => {
	const listFieldsToSend = getShallowFieldsToSendFromZodSchema(
		SearchAvailableSystemSettingQueryParams,
	);

	const { page, size, fields, sort, q } = applyTransform(params, [
		merge(getDefaultGetParams()),
		merge({
			q: params.search,
		}),
		sanitizeToWire(listFieldsToSend),
		starToSearch('q'),
		camelToSnake(),
	]);

	try {
		const response =
			await getSystemSettingService().searchAvailableSystemSetting({
				page,
				size,
				fields,
				sort,
				q,
			});
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

const getPasswordRules = async (): Promise<UserPasswordRules> => {
	const { items } = await getList({
		name: [
			EngineSystemSettingName.PasswordRegExp,
			EngineSystemSettingName.PasswordValidationText,
		],
	});

	const findValue = (name: EngineSystemSettingName) =>
		items.find((item: EngineSystemSetting) => item.name === name)?.value;

	return {
		passwordRegExp: findValue(EngineSystemSettingName.PasswordRegExp),
		passwordValidationText: findValue(
			EngineSystemSettingName.PasswordValidationText,
		),
	};
};

export const ConfigurationsAPI = {
	getList,
	get,
	add,
	update,
	delete: deleteItem,
	getLookup,
	getObjectsList,
	getPasswordRules,
};
