import { SLAConditionsApiFactory } from 'webitel-sdk';

import {
  getDefaultGetListResponse,
  getDefaultGetParams,
  getDefaultInstance,
  getDefaultOpenAPIConfig,
} from '../../defaults/index.js';
import applyTransform, {
  camelToSnake,
  merge,
  notify,
  sanitize,
  snakeToCamel,
} from '../../transformers/index.js';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const slaConditionsService = new SLAConditionsApiFactory(
  configuration,
  '',
  instance,
);

const fieldsToSend = [
  'name',
  'priorities',
  'sla_id',
  'reaction_time',
  'resolution_time',
];

const getConditionsList = async ({ parentId, ...rest }) => {
  const fieldsToSend = [
    'page',
    'size',
    'q',
    'sort',
    'fields',
    'id',
    'slaConditionId',
    'priorityId',
  ];

  const {
    page,
    size,
    fields,
    sort,
    id,
    q,
    sla_condition_id: slaConditionId,
    priority_id: priorityId,
  } = applyTransform(rest, [
    merge(getDefaultGetParams()),
    (params) => ({ ...params, q: params.search }),
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);

  try {
    const response = await slaConditionsService.listSLAConditions(
      parentId,
      page,
      size,
      fields,
      sort,
      id,
      q,
      slaConditionId,
      priorityId,
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

const getCondition = async ({ parentId, itemId: id }) => {
  const itemResponseHandler = (item) => {
    return item.slaCondition;
  };

  try {
    const response = await slaConditionsService.locateSLACondition(
      parentId,
      id,
      fieldsToSend,
    );
    return applyTransform(response.data, [snakeToCamel(), itemResponseHandler]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const updateCondition = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    camelToSnake(),
    sanitize(fieldsToSend),
  ]);

  try {
    const response = await slaConditionsService.updateSLACondition(
      itemInstance.slaId,
      id,
      item,
    );
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const addCondition = async ({ itemInstance, parentId }) => {
  const item = applyTransform(itemInstance, [
    camelToSnake(),
    sanitize(fieldsToSend),
  ]);

  try {
    const response = await slaConditionsService.createSLACondition(
      parentId,
      item,
    );
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const deleteCondition = async ({ id, parentId }) => {
  try {
    const response = await slaConditionsService.deleteSLACondition(
      parentId,
      id,
    );
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getLookup = async (params) =>
  getConditionsList({
    ...params,
    fields: params.fields || ['id', 'name'],
  });

const SLAConditionsAPI = {
  getList: getConditionsList,
  get: getCondition,
  update: updateCondition,
  delete: deleteCondition,
  add: addCondition,
  getLookup,
};

export default SLAConditionsAPI;
