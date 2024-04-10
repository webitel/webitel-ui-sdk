import { QueueServiceApiFactory } from 'webitel-sdk';
import deepCopy from 'deep-copy';
import {
  getDefaultGetListResponse,
  getDefaultGetParams,
  getDefaultInstance,
  getDefaultOpenAPIConfig,
} from '../../defaults';
import applyTransform, {
  camelToSnake,
  merge,
  mergeEach,
  notify,
  sanitize,
  snakeToCamel,
  starToSearch,
} from '../../transformers';
import isEmpty from '../../../scripts/isEmpty';
import processing from './defaults/processing';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const queueService = new QueueServiceApiFactory(configuration, '', instance);

const doNotConvertKeys = ['variables'];

const fieldsToSend = [
  'name',
  'type',
  'strategy',
  'team',
  'priority',
  'dncList',
  'schema',
  'payload',
  'taskProcessing',
  'maxOfRetry',
  'timeout',
  'secBetweenRetries',
  'variables',
  'calendar',
  'description',
  'enabled',
  'ringtone',
  'doSchema',
  'afterSchema',
  'stickyAgent',
  'grantee',
  'tags',
];

const preRequestHandler = (item) => {
  const copy = deepCopy(item);
  copy.variables = copy.variables.reduce((variables, variable) => {
    if (!variable.key) return variables;
    return { ...variables, [variable.key]: variable.value };
  }, {});
  return copy;
};

const getQueuesList = async (params) => {
  const defaultObject = {
    type: 0,
    enabled: false,
    active: 0,
    waiting: 0,
    priority: '0',
  };

  const {
    page,
    size,
    search,
    sort,
    fields,
    id,
    queueType,
    team,
    tags,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);

  try {
    const response = await queueService.searchQueue(
      page,
      size,
      search,
      sort,
      fields,
      id,
      queueType,
      team,
      tags,
    );
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(doNotConvertKeys),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items: applyTransform(items, [
        mergeEach(defaultObject),
      ]),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const getQueue = async ({ itemId: id }) => {
  const defaultObject = {
    tags: [],
    type: 0,
    formSchema: {},
    taskProcessing: {},
  };
  const responseHandler = (item) => {
    const copy = deepCopy(item);
    try {
      if (copy.variables) {
        copy.variables = Object.keys(copy.variables)
        .map((key) => ({
          key,
          value: copy.variables[key],
        }));
      }
      if (isEmpty(copy.taskProcessing)) {
        copy.taskProcessing = processing({
          enabled: !!copy.processing,
          formSchema: copy.formSchema,
          sec: copy.processingSec || 0,
          renewalSec: copy.processingRenewalSec || 0,
        });
      }
      return copy;
    } catch (err) {
      throw err;
    }
  };
  try {
    const response = await queueService.readQueue(id);
    return applyTransform(response.data, [
      snakeToCamel(doNotConvertKeys),
      merge(defaultObject),
      responseHandler,
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const addQueue = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(doNotConvertKeys),
  ]);
  try {
    const response = await queueService.createQueue(item);
    return applyTransform(response.data, [
      snakeToCamel(doNotConvertKeys),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const updateQueue = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(doNotConvertKeys),
  ]);
  try {
    const response = await queueService.updateQueue(id, item);
    return applyTransform(response.data, [
      snakeToCamel(doNotConvertKeys),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const patchQueue = async ({ id, changes }) => {
  const item = applyTransform(changes, [
    sanitize(fieldsToSend),
    camelToSnake(doNotConvertKeys),
  ]);
  try {
    const response = await queueService.patchQueue(id, item);
    return applyTransform(response.data, [
      snakeToCamel(doNotConvertKeys),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const deleteQueue = async ({ id }) => {
  try {
    const response = await queueService.deleteQueue(id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const getQueuesLookup = (params) => getQueuesList({
  ...params,
  fields: params.fields || ['id', 'name', 'type'],
});

const getQueuesTags = async (params) => {
  const {
    page,
    size,
    search,
    sort,
    fields,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch(),
    camelToSnake(doNotConvertKeys),
  ]);
  try {
    const response = await queueService.searchQueueTags(
        page,
        size,
        search,
        sort,
        fields,
    );
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(doNotConvertKeys),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items,
      next,
    };
  } catch (err) {
    throw applyTransform(err, [

      notify,
    ]);
  }
};

const QueuesAPI = {
  getList: getQueuesList,
  get: getQueue,
  add: addQueue,
  patch: patchQueue,
  update: updateQueue,
  delete: deleteQueue,
  getLookup: getQueuesLookup,
  getQueuesTags,
};

export default QueuesAPI;
