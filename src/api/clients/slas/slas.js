import { SLAsApiFactory } from 'webitel-sdk';
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
  starToSearch,
} from '../../transformers/index.js';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const slaService = new SLAsApiFactory(configuration, '', instance);

const fieldsToSend = [
  'name',
  'description',
  'valid_from',
  'valid_to',
  'calendar',
  'reaction_time',
  'resolution_time',
];

const getSlasList = async (params) => {
  const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id'];

  const { page, size, fields, sort, id, q } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
    (params) => ({ ...params, q: params.search }),
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await slaService.listSLAs(page, size, fields, sort, id, q);
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

const getSla = async ({ itemId: id }) => {
  const itemResponseHandler = (item) => {
    return item.sla;
  };

  try {
    const response = await slaService.locateSLA(id, fieldsToSend);
    return applyTransform(response.data, [snakeToCamel(), itemResponseHandler]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const addSla = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    camelToSnake(),
    sanitize(fieldsToSend),
  ]);
  try {
    const response = await slaService.createSLA(item);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const updateSla = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    camelToSnake(),
    sanitize(fieldsToSend),
  ]);
  try {
    const response = await slaService.updateSLA(id, item);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const deleteSla = async ({ id }) => {
  try {
    const response = await slaService.deleteSLA(id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getSlasLookup = (params) =>
  getSlasList({
    ...params,
    fields: params.fields || ['id', 'name'],
  });

const SlasAPI = {
  getList: getSlasList,
  getLookup: getSlasLookup,
  get: getSla,
  add: addSla,
  update: updateSla,
  delete: deleteSla,
};

export default SlasAPI;
