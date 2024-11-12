import { CatalogApiFactory } from 'webitel-sdk';
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

const catalogService = new CatalogApiFactory(configuration, '', instance);

const getChatMessagesList = async ({ chatId }) => {
  const mergeMessagesData = ({ messages, peers }) => {
    return messages.map(({ from, ...message }) => {
      return {
        ...message,
        peer: peers[from.id - 1],
      };
    });
  };

  try {
    const response = await catalogService.getHistory(chatId);
    const { messages, peers } = applyTransform(response.data, [
      snakeToCamel(),
    ]);
    return {
      items: applyTransform({ messages, peers }, [mergeMessagesData]),
      peers,
    };
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const CatalogAPI = {
  getChatMessagesList,
};

export default CatalogAPI;
