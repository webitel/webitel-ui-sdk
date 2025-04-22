import { GroupsApiFactory } from 'webitel-sdk';

import {
  getDefaultGetListResponse,
  getDefaultGetParams,
  getDefaultInstance,
  getDefaultOpenAPIConfig,
} from '../../defaults/index.js';
import applyTransform, {
  camelToSnake,
  merge,
  mergeEach,
  notify,
  sanitize,
  snakeToCamel,
  starToSearch,
} from '../../transformers/index.js';
import { generatePermissionsApi } from '../_shared/generatePermissionsApi.js';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const contactGroupsService = new GroupsApiFactory(configuration, '', instance);

const baseUrl = '/contacts/groups';

const fieldsToSend = [
  'name',
  'description',
  'enabled',
  'type',
  'default_group',
];

const getContactGroupsList = async (params) => {
  const fieldsToSend = [
    'page',
    'size',
    'q',
    'sort',
    'fields',
    'type',
    'enabled',
    'id',
  ];
  const defaultObject = {
    enabled: false,
  };

  const { page, size, fields, sort, id, q, name, type, enabled } =
    applyTransform(params, [
      merge(getDefaultGetParams()),
      starToSearch('search'),
      (params) => ({ ...params, q: params.search }),
      sanitize(fieldsToSend),
      camelToSnake(),
    ]);

  try {
    const response = await contactGroupsService.listGroups(
      page,
      size,
      fields,
      sort,
      id,
      q,
      name,
      type,
      enabled,
    );
    const { items, next } = applyTransform(response.data, [
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items: applyTransform(items, [mergeEach(defaultObject)]),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getContactGroup = async ({ itemId: id }) => {
  const itemResponseHandler = (item) => item.group;

  try {
    const response = await contactGroupsService.locateGroup(id, fieldsToSend);
    return applyTransform(response.data, [snakeToCamel(), itemResponseHandler]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const addStaticContactGroup = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    camelToSnake(),
    sanitize(fieldsToSend),
  ]);
  try {
    const response = await contactGroupsService.createGroup(item);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const addContactsToGroup = async ({ contactIds, id }) => {
  try {
    const response = await contactGroupsService.addContactsToGroup(
      id,
      contactIds,
    );
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const removeContactsFromGroup = async ({ id, contactIds }) => {
  try {
    const response = await contactGroupsService.removeContactsFromGroup(
      id,
      contactIds,
    );
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const updateStaticContactGroup = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    camelToSnake(),
    sanitize(fieldsToSend),
  ]);

  try {
    const response = await contactGroupsService.updateGroup(id, item);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const patchStaticContactGroup = async ({ id, changes }) => {
  const item = applyTransform(changes, [
    camelToSnake(),
    sanitize(fieldsToSend),
  ]);

  try {
    const response = await contactGroupsService.updateGroup2(id, item);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const deleteStaticContactGroup = async ({ id }) => {
  try {
    const response = await contactGroupsService.deleteGroup(id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getLookup = (params) =>
  getContactGroupsList({
    ...params,
    fields: params.fields || ['id', 'name'],
  });

const ContactGroupsAPI = {
  getList: getContactGroupsList,
  get: getContactGroup,
  add: addStaticContactGroup,
  update: updateStaticContactGroup,
  patch: patchStaticContactGroup,
  delete: deleteStaticContactGroup,
  getLookup,
  addContactsToGroup,
  removeContactsFromGroup,

  ...generatePermissionsApi(baseUrl),
};

export default ContactGroupsAPI;
