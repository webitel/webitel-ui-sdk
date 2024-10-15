import {
  getDefaultInstance,
  getDefaultOpenAPIConfig,
} from '../defaults/index.js';

import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults/index.js';
import applyTransform, {
  camelToSnake,
  merge,
  mergeEach,
  log,
  notify,
  sanitize,
  snakeToCamel,
  starToSearch,
  generateUrl,
} from '@webitel/ui-sdk/src/api/transformers/index.js';

const instance = getDefaultInstance();

const contactGroupsUrl = '/contacts/groups';

const getContactGroupsList = async (params) => {

  console.log('fffffffff cgroups');
  console.log('groupList params:', params);
  console.log('groupList params:', params.q);

  const fieldsToSend = ['page', 'size', 'fields', 'sort', 'q', 'id', 'name'];

  if (!params.fields) {
    params.fields = [
      'id',
      'name',
      'description',
      'q',
    ];
  }

  const defaultObject = {
  };

  const url = applyTransform(params, [
    starToSearch('search'),
    (params) => ({ ...params, q: params.q ? `${params.q}*` : '' }),
    sanitize(fieldsToSend),
    camelToSnake(),
    generateUrl(contactGroupsUrl),
  ]);

  try {
    const response = await instance.get(url);

    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items: applyTransform(items, [mergeEach(defaultObject), log]),
      next,
    };

  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getAgent = async ({ itemId: id }) => {
  const url = `${contactGroupsUrl}/${id}`;
  const defaultObject = {
  };

  try {
    const response = await instance.get(url);

    console.log(response);

    return applyTransform(response.data.group, [
      snakeToCamel(),
      merge(defaultObject),
    ]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const fieldsToSend = [
  'name',
  'description',
  'type'
];

const addAgent = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);

  try {
    const response = await instance.post(contactGroupsUrl, item);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const patchAgent = async ({ itemInstance, id }) => {
  const url = `${contactGroupsUrl}/${id}`;

  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);

  try {
    const response = await instance.patch(url, item);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const updateAgent = async ({ itemInstance, itemId: id }) => {
  const url = `${contactGroupsUrl}/${id}`;

  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);

  try {
    const response = await instance.put(url, item);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const deleteAgent = async ({ id }) => {
  const url = `${contactGroupsUrl}/${id}`

  try {
    const response = await instance.delete(url);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const ContactGroupsAPI = {
  getList: getContactGroupsList,
  getListGroups: getContactGroupsList,
  get: getAgent,
  add: addAgent,
  patch: patchAgent,
  update: updateAgent,
  delete: deleteAgent,
};

export default ContactGroupsAPI;
