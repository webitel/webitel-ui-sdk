import { SystemSettingServiceApiFactory } from 'webitel-sdk';
import { EngineSystemSettingName } from '../../../gen/_models/engineSystemSettingName';

import {
	getDefaultGetListResponse,
	getDefaultGetParams,
	getDefaultInstance,
	getDefaultOpenAPIConfig,
} from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../transformers';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const configurationService = SystemSettingServiceApiFactory(
	configuration,
	'',
	instance,
);

 /**
 * author @Lera24
 * https://webitel.atlassian.net/browse/WTEL-8203?focusedCommentId=710207
 * rename password_contains_username to password_contains_username in ui
 */

const PASSWORD_CONTAINS_LOGIN = 'password_contains_username';

const listResponseHandler = (items) => {
  const index = items.findIndex((item) =>
    item.name === EngineSystemSettingName.PasswordContainsUsername);
  if(index === -1) return items;
  items[index].name = PASSWORD_CONTAINS_LOGIN;
  return items;
};

const itemHandler = (item) => {
  const map = {
    [EngineSystemSettingName.PasswordContainsUsername]: PASSWORD_CONTAINS_LOGIN,
    PASSWORD_CONTAINS_LOGIN: EngineSystemSettingName.PasswordContainsUsername,
  };

  item.name = map[item.name] ?? item.name;
  return item;
};

const getList = async (params) => {
	const { page, size, search, sort, fields, name } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response = await configurationService.searchSystemSetting(
			page,
			size,
			search,
			sort,
			fields,
			name,
		);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
      items: applyTransform(items, [listResponseHandler]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const get = async ({ itemId: id }) => {
	try {
		const response = await configurationService.readSystemSetting(id);
		return applyTransform(response.data, [snakeToCamel(), itemHandler]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const fieldsToSend = ['id', 'name', 'value'];

const add = async ({ itemInstance }) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
    itemHandler,
	]);
	try {
		const response = await configurationService.createSystemSetting(item);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const update = async ({ itemInstance, itemId: id }) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
    itemHandler,
	]);
	try {
		const response = await configurationService.updateSystemSetting(id, item);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getLookup = (params) =>
	getList({
		...params,
		fields: params.fields || ['name'],
	});

const deleteItem = async ({ id }) => {
	try {
		const response = await configurationService.deleteSystemSetting(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getObjectsList = async (params) => {
	const { page, size, search, sort, fields } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response = await configurationService.searchAvailableSystemSetting(
			page,
			size,
			search,
			sort,
			fields,
		);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
      items: applyTransform(items, [listResponseHandler]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

export const ConfigurationsAPI = {
	getList,
	get,
	add,
	update,
	delete: deleteItem,
	getLookup,
	getObjectsList,
};
