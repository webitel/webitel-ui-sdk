import {
  createQuickReplyBody,
  getQuickRepliesService,
  searchQuickRepliesQueryParams,
  updateQuickReplyBody,
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

const quickReplyService = getQuickRepliesService();

const getQuickRepliesList = async (params) => {
  const fieldsToSend = getFieldsToSendFromZodSchema(searchQuickRepliesQueryParams);

  const { page, size, fields, sort, id, q } = applyTransform(params, [
    merge(getDefaultGetParams()),
    (params) => ({ ...params, q: params.search }),
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);

  try {
    const response = await quickReplyService.searchQuickReplies({
      page,
      size,
      fields,
      sort,
      id,
      q,
    });
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

const getQuickReply = async ({ itemId: id }) => {

  try {
    const response = await quickReplyService.readQuickReply(id);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const addQuickReply= async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    sanitize(getFieldsToSendFromZodSchema(createQuickReplyBody)),
    camelToSnake(),
  ]);
  try {
    const response = await quickReplyService.createQuickReply(item);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};


const updateQuickReply = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    camelToSnake(),
    sanitize(getFieldsToSendFromZodSchema(updateQuickReplyBody)),
  ]);

  try {
    const response = await quickReplyService.updateQuickReply(id, item);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const deleteQuickReply= async ({ id }) => {
  try {
    const response = await quickReplyService.deleteQuickReply(id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getLookup = (params) =>
  getQuickRepliesList({
    ...params,
    fields: params.fields || ['id', 'name'],
  });

const QuickRepliesApi = {
  getList: getQuickRepliesList,
  get: getQuickReply,
  add: addQuickReply,
  update: updateQuickReply,
  delete: deleteQuickReply,
  getLookup,
}
export default QuickRepliesApi;
