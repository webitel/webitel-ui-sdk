import { DictionariesApiFactory } from 'webitel-sdk';

import {
  getDefaultGetListResponse,
  getDefaultGetParams,
  getDefaultInstance,
  getDefaultOpenAPIConfig,
} from '../../../defaults';
import {
  applyTransform,
  camelToSnake,
  merge,
  notify,
  sanitize,
  snakeToCamel,
  starToSearch
} from '../../../transformers';
import { generatePermissionsApi } from '../../_shared/generatePermissionsApi';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const baseUrl = '/types/dictionaries';

const dictionariesService = DictionariesApiFactory(configuration, '', instance);

const fieldsToSend = [
  'name',
  'about',
  'dictionary',
  'fields',
  'repo',
  'administered',
  'primary',
  'display',
];

const getCustomLookupsList = async (params) => {
  const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id'];

  const { page, size, fields, sort, id, q } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
    (params) => ({ ...params, q: params.search }),
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await dictionariesService.searchType(
      q,
      id,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      size,
      page,
      sort,
      fields,
    );
    const { data, next } = applyTransform(response.data, [
      merge(getDefaultGetListResponse()),
    ]);

    const itemResponseHandler = (items) =>
      (items || []).map((item) => ({
        ...item,
        id: item.repo,
      }));

    return {
      items: applyTransform(data, [snakeToCamel(), itemResponseHandler]),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getCustomLookup = async ({ itemId: itemRepo }) => {
  const createPositionGenerator = () => {
    let position = 1;
    return (item) => (item.readonly ? null : position++);
  };
  const getPosition = createPositionGenerator();

  const itemResponseHandler = (item) => ({
    ...item,
    id: item.repo,
    fields: item.fields.map((field) => ({
      ...field,
      position: getPosition(field),
    })),
  });

  try {
    const response = await dictionariesService.locateType(
      itemRepo,
      fieldsToSend,
    );

    return applyTransform(response.data, [snakeToCamel(), itemResponseHandler]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const itemResponseHandler = (item) => ({
  ...item,
  id: item.repo,
});

const addCustomLookup = async ({ itemInstance }) => {
  const repo = itemInstance.repo;
  const item = applyTransform(itemInstance, [
    camelToSnake(),
    sanitize(fieldsToSend),
  ]);
  try {
    const response = await dictionariesService.createType(repo, item);
    return applyTransform(response.data, [snakeToCamel(), itemResponseHandler]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

export const CustomLookupsApi = {
  getList: getCustomLookupsList,
  get: getCustomLookup,
  add: addCustomLookup,

  ...generatePermissionsApi(baseUrl),
};

export default CustomLookupsApi;
