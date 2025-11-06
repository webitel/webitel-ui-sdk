import {
  getConfigService,
  configServiceSearchConfigQueryParams,
  configServiceCreateConfigBody,
  configServiceUpdateConfigBody,
  configServicePatchConfigBody,
} from '@webitel/api-services/gen';
import {
  getShallowFieldsToSendFromZodSchema,
} from '@webitel/api-services/gen/utils';

import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '../../defaults';

import {
  applyTransform,
  camelToSnake,
  merge,
  notify,
  sanitize,
  snakeToCamel,
} from '../../transformers';

const getChangelogsList = async (params) => {
  const fieldsToSend = getShallowFieldsToSendFromZodSchema(
    configServiceSearchConfigQueryParams,
  );

  const transformedParams = applyTransform(params, [
    merge(getDefaultGetParams()),
    (params) => ({ ...params, q: params.search }),
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);

  try {
    const response = await  getConfigService().configServiceSearchConfig(transformedParams);
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

const getChangelog = async ({ itemId: id }) => {
  try {
    const response = await  getConfigService().configServiceReadConfig(id);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const addChangelog = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    sanitize(getShallowFieldsToSendFromZodSchema(configServiceCreateConfigBody)),
    camelToSnake(),
  ]);
  try {
    const response = await  getConfigService().configServiceCreateConfig(item);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const updateChangelog = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    camelToSnake(),
    sanitize(getShallowFieldsToSendFromZodSchema(configServiceUpdateConfigBody)),
  ]);

  try {
    const response = await  getConfigService().configServiceUpdateConfig(id, item);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const patchChangelog = async ({ id, changes }) => {
  const body = applyTransform(changes, [
    sanitize(getShallowFieldsToSendFromZodSchema(configServicePatchConfigBody)),
    camelToSnake(),
  ]);
  try {
    const response = await  getConfigService().configServicePatchConfig(id, body);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const deleteChangelog = async ({ id }) => {
  try {
    const response = await  getConfigService().configServiceDeleteConfig(id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getLookup = (params) =>
  getChangelogsList({
    ...params,
    fields: params.fields || ['id', 'object'],
  });

const getObjectsList = async (params) => {
  const transformedParams = applyTransform(params, [
    merge(getDefaultGetParams()),
    (params) => ({ ...params, q: params.search }),
    camelToSnake(),
  ]);

  try {
    const response = await  getConfigService().configServiceReadSystemObjects(transformedParams);
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

export const ChangelogsAPI = {
  getList: getChangelogsList,
  get: getChangelog,
  add: addChangelog,
  update: updateChangelog,
  patch: patchChangelog,
  delete: deleteChangelog,
  getLookup,
  getObjectsList,
};

