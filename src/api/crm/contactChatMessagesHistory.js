import {
  getDefaultInstance,
} from '../defaults/index.js';
import applyTransform, {
  camelToSnake,
  generateUrl,
  notify,
  snakeToCamel,
} from '../transformers/index.js';

const instance = getDefaultInstance();

const getList = async (params) => {
  const mergeChatMessagesData = ({ peers, messages }) => {
    const chat = messages.map(({ from, ...message }) => {
      return {
        ...message,
        peer: peers[from.id - 1],
      };
    });
    return chat;
  };
  const url = applyTransform(params, [
    camelToSnake(),
    generateUrl(`contacts/${params.parentId}/chat/${params.taskId}/messages`),
  ]);

  try {
    const response = await instance.get(url);
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
