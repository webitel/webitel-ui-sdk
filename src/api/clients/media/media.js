import axios from 'axios';
import { MediaFileServiceApiFactory } from 'webitel-sdk';
import {
  getDefaultGetListResponse,
  getDefaultGetParams,
  getDefaultInstance,
  getDefaultOpenAPIConfig,
} from '../../defaults';
import applyTransform, {
  merge,
  notify,
  snakeToCamel,
  starToSearch,
} from '../../transformers';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const mediaService = new MediaFileServiceApiFactory(configuration, '', instance);

const token = localStorage.getItem('access-token');
const baseUrl = import.meta.env.VITE_API_URL;

const getMediaList = async (params) => {
  const {
    page,
    size,
    search,
    sort,
    fields,
    id,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);

  try {
    const response = await mediaService.searchMediaFile(
      page,
      size,
      search,
      sort,
      fields,
      id,
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
    throw applyTransform(err, [

      notify,
    ]);
  }
};

const getMedia = async ({ itemId }) => {
  const url = `${baseUrl}/storage/media/${itemId}/stream?access_token=${token}`;
  try {
    return await instance.get(url);
  } catch (err) {
    throw applyTransform(err, [

      notify,
    ]);
  }
};

export const downloadMedia = async (id) => {
  const url = `${baseUrl}/storage/media/${id}/download?access_token=${token}`;
  try {
    return await instance.get(url);
  } catch (err) {
    throw applyTransform(err, [

      notify,
    ]);
  }
};

const addMediaInstance = axios.create({
  headers: {
    'content-type': 'multipart/form-data',
  },
});

const addMedia = async (params) => {
  const url = `${baseUrl}/storage/media?access_token=${token}`;

  const formData = new FormData();
  formData.append('file', params.itemInstance);
  try {
    const response = await addMediaInstance.post(url, formData);
    applyTransform(response, [
      notify(() => ({ type: 'info', text: 'Successfully added' })),
    ]);
    return response;
  } catch (err) {
    throw applyTransform(err, [

      notify,
    ]);
  }
};

const deleteMedia = async ({ id }) => {
  try {
    const response = await mediaService.deleteMediaFile(id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [

      notify,
    ]);
  }
};

const getMediaLookup = (params) => getMediaList({
  ...params,
  fields: params.fields || ['id', 'name'],
});

const MediaAPI = {
  getList: getMediaList,
  get: getMedia,
  add: addMedia,
  delete: deleteMedia,
  getLookup: getMediaLookup,
};

export default MediaAPI;
