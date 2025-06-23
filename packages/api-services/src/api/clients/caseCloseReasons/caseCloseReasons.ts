import { CloseReasonsApiFactory } from 'webitel-sdk';

import {
  getDefaultGetListResponse,
  getDefaultGetParams,
  getDefaultInstance,
  getDefaultOpenAPIConfig,
} from '../../defaults/index.ts';
import applyTransform, {
  camelToSnake,
  merge,
  notify,
  sanitize,
  snakeToCamel,
} from '../../transformers/index.ts';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const closeReasonsService = new CloseReasonsApiFactory(
  configuration,
  '',
  instance,
);

const fieldsToSend = ['name', 'description'];

const getCloseReasonsList = async ({ parentId, ...rest }) => {
  const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id'];

  const { page, size, fields, sort, id, q } = applyTransform(rest, [
    merge(getDefaultGetParams()),
    (params) => ({ ...params, q: params.search }),
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await closeReasonsService.listCloseReasons(
      parentId,
      page,
      size,
      fields,
      sort,
      id,
      q,
    );
    const { items, next } = applyTransform(response.data, [
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items: applyTransform(items, [snakeToCamel()]),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getCloseReason = async ({ parentId, itemId: id }) => {
  const itemResponseHandler = (item) => {
    return item.closeReason;
  };

  try {
    const response = await closeReasonsService.locateCloseReason(parentId, id);
    return applyTransform(response.data, [snakeToCamel(), itemResponseHandler]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const addCloseReason = async ({ itemInstance, parentId }) => {
  const item = applyTransform(itemInstance, [
    camelToSnake(),
    sanitize(fieldsToSend),
  ]);

  try {
    const response = await closeReasonsService.createCloseReason(
      parentId,
      item,
    );
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const updateCloseReason = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [camelToSnake()]);

  try {
    const response = await closeReasonsService.updateCloseReason(
      itemInstance.id,
      id,
      item,
    );
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const deleteCloseReason = async ({ id, parentId }) => {
  try {
    const response = await closeReasonsService.deleteCloseReason(parentId, id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getCloseReasonLookup = async (params) =>
  getCloseReasonsList({
    ...params,
    fields: params.fields || ['id', 'name'],
  });

const CaseCloseReasonsAPI = {
  getList: getCloseReasonsList,
  getLookup: getCloseReasonLookup,
  get: getCloseReason,
  add: addCloseReason,
  update: updateCloseReason,
  delete: deleteCloseReason,
};

export default CaseCloseReasonsAPI;
