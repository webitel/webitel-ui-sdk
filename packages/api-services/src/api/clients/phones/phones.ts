import { PhonesApiFactory } from 'webitel-sdk';
import {
  getDefaultGetListResponse,
  getDefaultGetParams,
  getDefaultInstance,
  getDefaultOpenAPIConfig,
} from '../../defaults';
import {
  applyTransform,
  camelToSnake,
  merge,
  notify,
  snakeToCamel,
  starToSearch,
} from '../../transformers';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();
const phonesService = PhonesApiFactory(configuration, '', instance);

const getPhonesList = async ({ contactId, options, ...params }) => {
  const listParams = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);
  try {
    const response = await phonesService.listPhones(contactId, listParams, options);
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return { items, next };
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getPhone = async ({ contactId, etag, params, options }) => {
  try {
    const response = await phonesService.locatePhone(contactId, etag, params, options);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const mergePhones = async ({ contactId, phones, params, options }) => {
  const body = applyTransform(phones, [camelToSnake()]);
  try {
    const response = await phonesService.mergePhones(contactId, body, params, options);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const resetPhones = async ({ contactId, phones, params, options }) => {
  const body = applyTransform(phones, [camelToSnake()]);
  try {
    const response = await phonesService.resetPhones(contactId, body, params, options);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const updatePhone = async ({ contactId, etag, data, params, options }) => {
  const body = applyTransform(data, [camelToSnake()]);
  try {
    const response = await phonesService.updatePhone(contactId, etag, body, params, options);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const patchPhone = async ({ contactId, etag, changes, params, options }) => {
  const body = applyTransform(changes, [camelToSnake()]);
  try {
    const response = await phonesService.updatePhone2(contactId, etag, body, params, options);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const deletePhone = async ({ contactId, etag, params, options }) => {
  try {
    const response = await phonesService.deletePhone(contactId, etag, params, options);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const deletePhones = async ({ contactId, params, options }) => {
  try {
    const response = await phonesService.deletePhones(contactId, params, options);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getPhonesLookup = (params) =>
  getPhonesList({
    ...params,
    fields: params?.fields || ['etag', 'number', 'priority'],
  });

export const PhonesAPI = {
  getList: getPhonesList,
  getLookup: getPhonesLookup,
  merge: mergePhones,
  reset: resetPhones,
  deleteMany: deletePhones,
  get: getPhone,
  update: updatePhone,
  patch: patchPhone,
  delete: deletePhone,
};
