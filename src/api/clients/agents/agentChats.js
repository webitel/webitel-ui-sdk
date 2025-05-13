import { AgentChatServiceApiFactory } from 'webitel-sdk';

import i18n from '../../../locale/i18n.js';
import {
  getDefaultGetParams,
  getDefaultInstance,
  getDefaultOpenAPIConfig,
} from '../../defaults/index.js';
import applyTransform, {
  merge,
  notify,
  snakeToCamel,
  starToSearch,
} from '../../transformers/index.js';

const { t } = i18n.global;

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const agentChatsService = new AgentChatServiceApiFactory(
  configuration,
  '',
  instance,
);

const getChatsList = async (params) => {
  const { size, page, onlyClosed, onlyUnprocessed } = applyTransform(params, [
    merge(getDefaultGetParams()),
  ]);

  try {
    const response = await agentChatsService.getAgentChats(
      size,
      page,
      undefined,
      undefined,
      undefined,
      onlyClosed,
      onlyUnprocessed,
    );
    const { items, next } = applyTransform(response.data, [snakeToCamel()]);
    return {
      items,
      next,
    };
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const markChatProcessed = async (chatId) => {
  // add to chat unprocessedClose: true
  try {
    const response = await agentChatsService.markChatProcessed(chatId);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [
      notify(({ callback }) =>
        callback({
          type: 'error',
          text: t('errorNotifications.markChatProcessed'),
        }),
      ),
    ]);
  }
};

const AgentChatsAPI = {
  getList: getChatsList,
  markChatProcessed,
};

export default AgentChatsAPI;
