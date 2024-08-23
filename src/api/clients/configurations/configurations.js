import { SystemSettingServiceApiFactory } from 'webitel-sdk';
import {
  getDefaultGetListResponse,
  getDefaultGetParams, getDefaultInstance, getDefaultOpenAPIConfig,
} from '../../defaults/index.js';
import applyTransform, {
  camelToSnake,
  merge,
  notify,
  sanitize,
  snakeToCamel,
  starToSearch,
} from '../../transformers/index.js';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const configurationService = new SystemSettingServiceApiFactory(configuration, '', instance);

const getList = async (params) => {
  const { page, size, search, sort, fields, name } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);

  try {
    const response = await configurationService.searchSystemSetting(page, size, search, sort, fields, name);
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items,
      next,
    };
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const get = async ({ itemId: id }) => {
  try {
    const response = await configurationService.readSystemSetting(id);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const fieldsToSend = ['id', 'name', 'value'];

const add = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [sanitize(fieldsToSend), camelToSnake()]);
  try {
    const response = await configurationService.createSystemSetting(item);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const update = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [sanitize(fieldsToSend), camelToSnake()]);
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
    const response = await configurationService.searchAvailableSystemSetting(page, size, search, sort, fields);
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items,
      next,
    };
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const ConfigurationsAPI = {
  getList,
  get,
  add,
  update,
  delete: deleteItem,
  getLookup,
  getObjectsList,
};

export default ConfigurationsAPI;
