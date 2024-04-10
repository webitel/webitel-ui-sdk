import { BucketServiceApiFactory } from 'webitel-sdk';
import {
  getDefaultGetListResponse,
  getDefaultGetParams,
  getDefaultOpenAPIConfig,
  getDefaultInstance,
} from '../../defaults';
import applyTransform, {
  camelToSnake,
  merge,
  notify,
  sanitize,
  snakeToCamel,
  starToSearch,
} from '../../transformers';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const bucketService = new BucketServiceApiFactory(configuration, '', instance);

const getBucketsList = async (params) => {
  const {
    page,
    size,
    search,
    sort,
    fields,
    id,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);

  try {
    const response = await bucketService.searchBucket(
      page,
      size,
      search,
      sort,
      fields,
      id,
    );
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
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

const getBucket = async ({ itemId: id }) => {
  try {
    const response = await bucketService.readBucket(id);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [

      notify,
    ]);
  }
};

const fieldsToSend = ['name', 'description'];

const addBucket = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await bucketService.createBucket(item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [

      notify,
    ]);
  }
};

const updateBucket = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await bucketService.updateBucket(id, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [

      notify,
    ]);
  }
};

const deleteBucket = async ({ id }) => {
  try {
    const response = await bucketService.deleteBucket(id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [

      notify,
    ]);
  }
};

const getBucketsLookup = (params) => getBucketsList({
  ...params,
  fields: params.fields || ['id', 'name'],
});

const BucketsAPI = {
  getList: getBucketsList,
  get: getBucket,
  add: addBucket,
  update: updateBucket,
  delete: deleteBucket,
  getLookup: getBucketsLookup,
};

export default BucketsAPI;
