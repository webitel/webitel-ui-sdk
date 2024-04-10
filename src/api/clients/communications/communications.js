import {
  getDefaultGetListResponse,
  getDefaultGetParams,
  getDefaultOpenAPIConfig,
  getDefaultInstance,
} from '../../defaults';
import applyTransform, {
  camelToSnake,
  merge, mergeEach,
  notify,
  sanitize,
  snakeToCamel,
  starToSearch,
} from '../../transformers';
import { CommunicationTypeServiceApiFactory } from 'webitel-sdk';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const communicationService = new CommunicationTypeServiceApiFactory(configuration, '', instance);

const getCommunicationsList = async (params) => {
  const defaultObject = {
    default: false,
  };

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
    const response = await communicationService.searchCommunicationType(
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

const getCommunication = async ({ itemId: id }) => {
  try {
    const response = await communicationService.readCommunicationType(id);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [

      notify,
    ]);
  }
};

const fieldsToSend = ['code', 'name', 'description', 'channel', 'default'];

const addCommunication = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await communicationService.createCommunicationType(item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [

      notify,
    ]);
  }
};

const patchCommunication = async ({ changes, id }) => {
  const body = applyTransform(changes, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await communicationService.patchCommunicationType(id, body);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const updateCommunication = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await communicationService.updateCommunicationType(id, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [

      notify,
    ]);
  }
};

const deleteCommunication = async ({ id }) => {
  try {
    const response = await communicationService.deleteCommunicationType(id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [

      notify,
    ]);
  }
};

const getCommunicationsLookup = (params) => getCommunicationsList({
  ...params,
  fields: params.fields || ['id', 'name'],
});

const CommunicationsAPI = {
  getList: getCommunicationsList,
  get: getCommunication,
  add: addCommunication,
  patch: patchCommunication,
  update: updateCommunication,
  delete: deleteCommunication,
  getLookup: getCommunicationsLookup,
};

export default CommunicationsAPI;
