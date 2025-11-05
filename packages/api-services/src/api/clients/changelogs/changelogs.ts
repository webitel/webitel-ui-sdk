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
  mergeEach,
  notify,
  sanitize,
  snakeToCamel,
} from '../../transformers';

const configService = getConfigService();

const getChangelogsList = async (params) => {
  const fieldsToSend = getShallowFieldsToSendFromZodSchema(
    configServiceSearchConfigQueryParams,
  );

  const { page, size, fields, sort, q, object } = applyTransform(params, [
    merge(getDefaultGetParams()),
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);

  const defaultObject = {
    enabled: false,
  };

  try {
    const response = await configService.configServiceSearchConfig({
      page,
      size,
      q: q || params.search,
      sort,
      fields,
      object,
    });
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
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

const getChangelog = async ({ itemId: id }) => {
  try {
    const response = await configService.configServiceReadConfig(id);
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
    const response = await configService.configServiceCreateConfig(item);
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
    const response = await configService.configServiceUpdateConfig(id, item);
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
    const response = await configService.configServicePatchConfig(id, body);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const deleteChangelog = async ({ id }) => {
  try {
    const response = await configService.configServiceDeleteConfig(id);
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
  const { page, size, fields, sort, search, includeExisting } = applyTransform(params, [
    merge(getDefaultGetParams()),
    camelToSnake(),
  ]);

  try {
    const response = await configService.configServiceReadSystemObjects({
      includeExisting,
      page,
      size,
      q: search,
      sort,
      fields,
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

