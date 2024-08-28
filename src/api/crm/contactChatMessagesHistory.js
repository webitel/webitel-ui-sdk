import {
  getDefaultInstance, getDefaultOpenAPIConfig,
} from '../defaults/index.js';
import applyTransform, {
  notify,
  snakeToCamel,
} from '../transformers/index.js';
import { ContactsChatCatalogApiFactory } from 'webitel-sdk';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const contactChatService = new ContactsChatCatalogApiFactory(configuration, '', instance);

const getList = async ({ contactId, chatId }) => {
  const mergeChatMessagesData = ({ peers, messages }) => {
    return messages.map(({ from, ...message }) => {
      return {
        ...message,
        peer: peers[from.id - 1],
      };
    });
  };

  try {
    const response = await contactChatService.getContactChatHistory(contactId, chatId);
    const { peers, messages } = applyTransform(response.data, [
      snakeToCamel(),
    ]);
    return {
      items: applyTransform({ peers, messages }, [
        mergeChatMessagesData,
      ]).reverse(),
    };
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

export default {
  getList,
};
