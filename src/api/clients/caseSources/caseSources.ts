import {
  createSourceBody,
  getSources,
  listSourcesQueryParams,
  updateSourceBody,
} from '@webitel/api-services/gen';

import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '../../defaults/index';
import { getFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import applyTransform, {
  camelToSnake,
  merge,
  notify,
  sanitize,
  snakeToCamel,
} from '../../transformers/index';

const sourceService = getSources();

const getSourcesList = async (params) => {
  const fieldsToSend = getFieldsToSendFromZodSchema(listSourcesQueryParams);

  const { page, size, fields, sort, id, q, type } = applyTransform(params, [
    merge(getDefaultGetParams()),
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);

  try {
    const response = await sourceService.listSources({
      page,
      size,
      fields,
      sort,
      id,
      q,
      type,
    });
    const { items, next } = applyTransform(response.data, [
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items: applyTransform(items, []),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getSource = async ({ itemId: id }) => {
  const itemResponseHandler = (item) => item.source; // TODO wtf??

  try {
    const response = await sourceService.locateSource(id);
    return applyTransform(response.data, [snakeToCamel(), itemResponseHandler]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const addSource = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    sanitize(getFieldsToSendFromZodSchema(createSourceBody)),
    camelToSnake(),
  ]);
  try {
    const response = await sourceService.createSource(item);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const updateSource = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    camelToSnake(),
    sanitize(updateSourceBody),
  ]);

  try {
    const response = await sourceService.updateSource(id, item);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const deleteSource = async ({ id }) => {
  try {
    const response = await sourceService.deleteSource(id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getLookup = (params) =>
  getSourcesList({
    ...params,
    fields: params.fields || ['id', 'name', 'type'],
  });

const CaseSourcesAPI = {
  getList: getSourcesList,
  get: getSource,
  add: addSource,
  update: updateSource,
  delete: deleteSource,
  getLookup,
};

export default CaseSourcesAPI;
