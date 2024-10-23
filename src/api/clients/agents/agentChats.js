import { AgentChatsServiceApi } from 'webitel-sdk';
import {
  getDefaultInstance,
  getDefaultOpenAPIConfig,
} from '../../defaults/index.js';
import applyTransform, {
  notify,
  snakeToCamel,
} from '../../transformers/index.js';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const agentChatsService = new AgentChatsServiceApi(configuration, '', instance);

const getList = async (params) => {
  const { onlyClosed } = params;

  try {
    const response = await agentChatsService.getAgentChats(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      onlyClosed,
    );
    const { items } = applyTransform(response.data, [
      snakeToCamel(),
    ]);
    return items;
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const AgentChatsAPI = {
  getList,
};

export default AgentChatsAPI;
