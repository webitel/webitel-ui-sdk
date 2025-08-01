import { getQuickRepliesService } from '@webitel/api-services/gen';

import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '../../defaults/index';
import applyTransform, {
  camelToSnake,
  merge,
  notify,
  sanitize,
  snakeToCamel,
  starToSearch,
} from '../../transformers/index';

const quickReplyService = getQuickRepliesService();

const fieldsToSend = [
  'name',
  'queues',
  'article',
  'teams',
  'text',
];

const getQuickRepliesList = async (params) => {
  const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id'];

  const { page, size, fields, sort, id, q } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
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
    sanitize(fieldsToSend),
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
    sanitize(fieldsToSend),
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
