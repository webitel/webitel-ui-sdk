import deepCopy from 'deep-copy';
import ApplicationsAccess from '../../../modules/Userinfo/classes/ApplicationsAccess.js';
import {
  getDefaultGetListResponse,
  getDefaultGetParams,
  getDefaultInstance,
} from '../../defaults/index.js';
import applyTransform, {
  camelToSnake,
  generateUrl,
  merge,
  notify,
  sanitize,
  snakeToCamel,
  starToSearch,
} from '../../transformers/index.js';

const instance = getDefaultInstance();

const baseUrl = '/roles';
const fieldsToSend = ['name', 'description', 'permissions', 'metadata'];

const preRequestHandler = (item) => {
  const copy = deepCopy(item);
  copy.metadata.access = ApplicationsAccess.minify(copy.metadata.access);
  return copy;
};

const getRoleList = async (params) => {
  const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id'];

  const url = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
    (params) => ({ ...params, q: params.search }),
    sanitize(fieldsToSend),
    camelToSnake(),
    generateUrl(baseUrl),
  ]);
  try {
    const response = await instance.get(url);
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

const getRole = async ({ itemId: id }) => {
  const defaultObject = {
    name: '',
    description: '',
    permissions: [],
    metadata: {},
  };

  const itemResponseHandler = (response) => {
    const copy = deepCopy(response);
    copy.metadata.access = new ApplicationsAccess({ access: copy.metadata.access }).getAccess();
    return copy;
  };

  const url = `${baseUrl}/${id}?fields=metadata&fields=permissions&fields=name&fields=description`;

  try {
    const response = await instance.get(url);
    return applyTransform(response.data, [
      snakeToCamel(),
      merge(defaultObject),
      itemResponseHandler,
    ]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getExtendedRoles = async (params) => {
  const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id'];

  const url = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
    (params) => ({ ...params, q: params.search }),
    sanitize(fieldsToSend),
    camelToSnake(),
    generateUrl(baseUrl),
  ]);
  try {
    const response = await instance.get(url);
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

const addRole = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await instance.post(baseUrl, item);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const updateRole = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);

  const url = `${baseUrl}/${id}`;
  try {
    const response = await instance.put(url, item);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const deleteRole = async ({ id }) => {
  const url = `${baseUrl}/${id}`;
  try {
    const response = await instance.delete(url);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getRolesLookup = (params) =>
  getRoleList({
    ...params,
    fields: params.fields || ['id', 'name'],
  });

const PERMISSIONS_LIST_URL = '/permissions';

const getPermissionsOptions = async (params) => {
  const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id'];

  const url = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
    (params) => ({ ...params, q: params.search }),
    sanitize(fieldsToSend),
    camelToSnake(),
    generateUrl(PERMISSIONS_LIST_URL),
  ]);
  try {
    const response = await instance.get(url);
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

const RolesAPI = {
  getList: getRoleList,
  get: getRole,
  add: addRole,
  update: updateRole,
  delete: deleteRole,
  getLookup: getRolesLookup,

  getExtendedRoles,
  getPermissionsOptions,
};

export default RolesAPI;
