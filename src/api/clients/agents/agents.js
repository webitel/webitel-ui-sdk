import { AgentServiceApiFactory } from 'webitel-sdk';

import convertDuration from '../../../scripts/convertDuration.js';
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

const agentService = new AgentServiceApiFactory(configuration, '', instance);

const convertStatusDuration = (value) => {
  if (value > 60 * 60 * 24) return '>24:00:00';
  return convertDuration(value);
};

const getAgentsList = async (params) => {
  const listResponseHandler = (items) => {
    return items.map((item) => ({
      ...item,
      statusDuration: convertStatusDuration(item.statusDuration),
    }));
  };

  const {
    page,
    size,
    search,
    sort,
    fields,
    id,
    team,
    skill,
    isSupervisor,
    isNotSupervisor,
    notTeamId,
    supervisorId,
    notSkillId,
  } = applyTransform(params, [merge(getDefaultGetParams())]);

  try {
    const response = await agentService.searchAgent(
      page,
      size,
      search,
      sort,
      fields,
      id,
      undefined,
      supervisorId,
      team,
      undefined,
      undefined,
      isSupervisor,
      skill,
      undefined,
      isNotSupervisor,
      undefined,
      undefined,
      notTeamId,
      notSkillId,
    );
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items: applyTransform(items, [listResponseHandler]),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getAgent = async ({ itemId: id }) => {
  const defaultObject = {
    user: {},
    team: {},
    supervisor: [],
    auditor: [],
    region: {},
    progressiveCount: 0,
    chatCount: 0,
    taskCount: 0,
    isSupervisor: false,
    description: '',
    greetingMedia: {},
  };

  try {
    const response = await agentService.readAgent(id);
    return applyTransform(response.data, [
      snakeToCamel(),
      merge(defaultObject),
    ]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const fieldsToSend = [
  'user',
  'team',
  'supervisor',
  'auditor',
  'region',
  'greetingMedia',
  'progressiveCount',
  'chatCount',
  'taskCount',
  'isSupervisor',
];

const addAgent = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await agentService.createAgent(item);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const patchAgent = async ({ changes, id }) => {
  const body = applyTransform(changes, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await agentService.patchAgent(id, body);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const updateAgent = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await agentService.updateAgent(id, item);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const deleteAgent = async ({ id }) => {
  try {
    const response = await agentService.deleteAgent(id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getAgentsLookup = (params) =>
  getAgentsList({
    ...params,
    fields: params.fields || ['id', 'name'],
  });

const getAgentHistory = async (params) => {
  const {
    parentId,
    from,
    to,
    page,
    size,
    sort = '-joined_at',
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);

  try {
    const response = await agentService.searchAgentStateHistory(
      page,
      size,
      from,
      to,
      parentId,
      sort,
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
    throw applyTransform(err, [notify]);
  }
};

const getAgentUsersOptions = async (params) => {
  const { page, size, search, sort, fields, id } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);

  try {
    const response = await agentService.searchLookupUsersAgentNotExists(
      page,
      size,
      search,
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
    throw applyTransform(err, [notify]);
  }
};
const getSupervisorOptions = async (params) => {
  const isSupervisor = true;
  return getAgentsList({ ...params, isSupervisor });
};

const getRegularAgentsOptions = async (params) => {
  const isNotSupervisor = true;
  return getAgentsList({ ...params, isNotSupervisor });
};

const AgentsAPI = {
  getList: getAgentsList,
  get: getAgent,
  add: addAgent,
  patch: patchAgent,
  update: updateAgent,
  delete: deleteAgent,
  getLookup: getAgentsLookup,

  getAgentHistory,
  getRegularAgentsOptions,
  getAgentUsersOptions,
  getSupervisorOptions,
};

export default AgentsAPI;
