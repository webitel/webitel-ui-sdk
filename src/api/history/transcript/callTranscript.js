import { FileTranscriptServiceApiFactory } from 'webitel-sdk';
import {
  getDefaultGetListResponse,
  getDefaultInstance,
  getDefaultOpenAPIConfig,
} from '../../defaults/index.js';
import applyTransform, {
  camelToSnake,
  merge,
  notify,
  snakeToCamel,
} from '../../transformers/index.js';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const transcriptService = new FileTranscriptServiceApiFactory(configuration, '', instance);

const getTranscript = async ({ id, page = 1, size = 10000 }) => {
  try {
    const response = await transcriptService.getFileTranscriptPhrases(id, page, size);
    const { items } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return items;
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const createTranscript = async ({ callId }) => {
  const preRequestHandler = (callId) => {
    return Array.isArray(callId) ? callId : [callId];
  };

  const uuid = applyTransform(callId, [preRequestHandler, camelToSnake()]);

  try {
    const response = await transcriptService.createFileTranscript({ uuid });
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const deleteTranscript = async (item) => {
  const preRequestHandler = ({ fileId, callId }) => {
    if (fileId) {
      return { id: Array.isArray(fileId) ? fileId : [fileId] };
    }
    return { uuid: Array.isArray(callId) ? callId : [callId] };
  };

  const body = applyTransform(item, [preRequestHandler, camelToSnake()]);

  try {
    const response = await transcriptService.deleteFileTranscript(body);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const CallTranscriptAPI = {
  create: createTranscript,
  get: getTranscript,
  delete: deleteTranscript,
};

export default CallTranscriptAPI;
