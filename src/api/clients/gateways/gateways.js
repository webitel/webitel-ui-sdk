import {
  getDefaultGetListResponse,
  getDefaultGetParams,
  getDefaultInstance,
} from '../../defaults/index.js';
import applyTransform, {
  camelToSnake,
  generateUrl,
  merge,
  mergeEach,
  notify,
  sanitize,
  snakeToCamel,
  starToSearch,
} from '../../transformers/index.js';
import registerGateway from './defaults/registerGateway.js';
import trunkingGateway from './defaults/trunkingGateway.js';

const instance = getDefaultInstance();

const baseUrl = '/sip/gateways';

const getGatewayList = async (params) => {
  const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'ids'];

  const defaultObject = {
    name: '',
    proxy: '',
    enable: false,
  };

  const url = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
    (params) => ({ ...params, q: params.search }),
    sanitize(fieldsToSend),
    camelToSnake(),
    generateUrl(baseUrl),
  ]);
  try {
    const response = await instance.get(url);
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items: applyTransform(items, [mergeEach(defaultObject)]),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getGateway = async ({ itemId: id }) => {
  const coerceTrunkingResponse = (response) => {
    const defaultIPacl = {
      ip: '',
      proto: 'any',
      port: null,
    };

    const result = { ...trunkingGateway(), ...response };
    result.ipacl = result.ipacl.map((acl) => ({ ...defaultIPacl, ...acl }));
    return result;
  };

  const coerceRegisterResponse = (response) => {
    const result = { ...registerGateway(), ...response };
    return result;
  };

  const itemResponseHandler = (response) => {
    if (response.register) return coerceRegisterResponse(response);
    return coerceTrunkingResponse(response);
  };

  const url = `${baseUrl}/${id}`;

  try {
    const response = await instance.get(url);
    return applyTransform(response.data, [snakeToCamel(), itemResponseHandler]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const fieldsToSend = [
  'name',
  'proxy',
  'id',
  'host',
  'ipacl',
  'account',
  'username',
  'expires',
  'account',
  'registrar',
  'name',
  'register',
  'password',
  'schema',
  'usage',
  'enable',
];

const addGateway = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await instance.post(baseUrl, item);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};
const updateGateway = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);

  const url = `${baseUrl}/${id}`;
  try {
    const response = await instance.put(url, item);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const patchGateway = async ({ changes, id }) => {
  const body = applyTransform(changes, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  const url = `${baseUrl}/${id}`;
  try {
    const response = await instance.patch(url, body);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const deleteGateway = async ({ id }) => {
  const url = `${baseUrl}/${id}`;
  try {
    const response = await instance.delete(url);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getGatewaysLookup = (params) =>
  getGatewayList({
    ...params,
    fields: params.fields || ['id', 'name'],
  });

const GatewaysAPI = {
  getList: getGatewayList,
  get: getGateway,
  add: addGateway,
  patch: patchGateway,
  update: updateGateway,
  delete: deleteGateway,
  getLookup: getGatewaysLookup,
};

export default GatewaysAPI;
