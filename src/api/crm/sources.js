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

const sourcesUrl = '/cases/appeals';

const getSourcesList = async (params) => {
  console.log('groupList params:', params);

  const fieldsToSend = ['page', 'size', 'fields', 'sort', 'q', 'id', 'name', 'status'];

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
    generateUrl(sourcesUrl),
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

const getSource = async ({params, itemId: id }) => {
  const url = `${sourcesUrl}/${id}?fields=name&fields=type&fields=description`;
  const defaultObject = {
  };

  console.log('get source params', params);

  try {

    console.log('get id', instance);

    const response = await instance.get(url);

    console.log('sources response',response);

    return applyTransform(response.data.appeal, [
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
  'type',
  'q'
];

const addSource = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);

  try {
    const response = await instance.post(sourcesUrl, item);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const patchSource = async ({ itemInstance, id }) => {
  const url = `${sourcesUrl}/${id}`;

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

const updateSource = async ({ itemInstance, itemId: id }) => {

  console.log('update item instance:', itemInstance);
  console.log('fields to send:', fieldsToSend);

  const url = `${sourcesUrl}/${id}`;

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

const deleteSource = async ({ id }) => {
  const url = `${sourcesUrl}/${id}`

  try {
    const response = await instance.delete(url);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const SourcesAPI = {
  getList: getSourcesList,
  getListGroups: getSourcesList,
  get: getSource,
  add: addSource,
  patch: patchSource,
  update: updateSource,
  delete: deleteSource,
};

export default SourcesAPI;
