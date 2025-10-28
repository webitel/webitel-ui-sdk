import { getDefaultInstance } from '@webitel/api-services/api/defaults';
import {
  applyTransform,
  merge,
  notify,
  snakeToCamel,
} from '@webitel/api-services/api/transformers';
import type { AxiosInstance } from 'axios';

import type {
  GlobalAccessApiResponseItem,
  ScopeAccessApiResponseItem,
  VisibilityAccess,
} from '../types/UserAccess';

let instance = getDefaultInstance();

const setInstance = (newInstance: AxiosInstance) => {
  instance = newInstance;
};

const getSession = async (): Promise<{
  scope: ScopeAccessApiResponseItem[];
  permissions: GlobalAccessApiResponseItem[];
  userId: string;
}> => {
  const url = '/userinfo';
  try {
    const defaultObject = () => ({
      scope: [],
      permissions: [],
    });

    const response = await instance.get(url);
    return applyTransform(response.data, [
      merge(defaultObject()),
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getUiVisibilityAccess = async (): Promise<VisibilityAccess> => {
  const url = 'role/metadata/access';
  try {
    const response = await instance.get(url);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getUserTimezone = async (): Promise<{
  name: string;
  id: string;
  offset: string;
}> => {
  try {
    const response = await instance.get('/user/settings/timezone');
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const logout = async () => {
  const url = '/logout';
  try {
    return await instance.post(url, {});
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

export {
  getSession,
  getUiVisibilityAccess,
  getUserTimezone,
  logout,
  setInstance,
};
