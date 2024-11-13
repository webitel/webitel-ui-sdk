import { AgentChatServiceApiFactory } from 'webitel-sdk';
import {
  getDefaultInstance,
  getDefaultOpenAPIConfig,
} from '../../defaults/index.js';
import applyTransform, {
  notify,
  snakeToCamel,
} from '../../transformers/index.js';
import i18n from '../../../locale/i18n.js';

const { t } = i18n.global;

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const agentChatsService = new AgentChatServiceApiFactory(configuration, '', instance);

const getChatsList = async (params) => {
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

const markChatProcessed = async (chatId) => { // add to chat unprocessedClose: true
  try {
    const response = await agentChatsService.markChatProcessed(chatId);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify(({ callback }) => callback({
        type: 'error',
        text: t('errorNotifications.markChatProcessed'),
      })),
    ]);
  }
};

const AgentChatsAPI = {
  getList: getChatsList,
  markChatProcessed,
};

export default AgentChatsAPI;
