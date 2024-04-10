import { ListServiceApiFactory } from 'webitel-sdk';
import {
  getDefaultGetListResponse,
  getDefaultGetParams,
  getDefaultInstance,
  getDefaultOpenAPIConfig,
} from '../../defaults';
import applyTransform, {
  camelToSnake,
  merge, mergeEach,
  notify, sanitize,
  snakeToCamel,
  starToSearch,
} from '../../transformers';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const listService = new ListServiceApiFactory(configuration, '', instance);

const getBlacklistList = async (params) => {
  const defaultObject = {
    name: '',
    count: 0,
  };

  const {
    page,
    size,
    search,
    sort,
    fields,
    id,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
    camelToSnake(),
  ]);

  try {
    const response = await listService.searchList(
      page,
      size,
      search,
      sort,
      fields,
      id,
    );
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

const getBlacklist = async ({ itemId: id }) => {
  try {
    const response = await listService.readList(id);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [

      notify,
    ]);
  }
};

const fieldsToSend = ['name', 'description'];

const addBlacklist = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await listService.createList(item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [

      notify,
    ]);
  }
};

const updateBlacklist = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await listService.updateList(id, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [

      notify,
    ]);
  }
};

const deleteBlacklist = async ({ id }) => {
  try {
    const response = await listService.deleteList(id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [

      notify,
    ]);
  }
};
const getBlacklistsLookup = (params) => getBlacklistList({
  ...params,
  fields: params.fields || ['id', 'name'],
});

const BlacklistsAPI = {
  getList: getBlacklistList,
  get: getBlacklist,
  add: addBlacklist,
  update: updateBlacklist,
  delete: deleteBlacklist,
  getLookup: getBlacklistsLookup,
};

export default BlacklistsAPI;
