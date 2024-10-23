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

const chatsService = new AgentChatsServiceApi(configuration, '', instance);

const getList = async (params) => {
  try {
    const response = await chatsService.getAgentChats();
    const { items } = applyTransform(response.data, [
      snakeToCamel(),
    ]);
    return items;
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const ClosedChatsAPI = {
  getList,
};

export default ClosedChatsAPI;
