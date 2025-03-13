import type { AxiosInstance } from 'axios';

import getDefaultInstance from '../../../../api/defaults/getDefaultInstance/getDefaultInstance';
import applyTransform, {
  merge,
  notify,
  snakeToCamel,
} from '../../../../api/transformers/index.js';
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

const logout = async () => {
  const url = '/logout';
  try {
    return await instance.post(url, {});
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

export { getSession, getUiVisibilityAccess, logout, setInstance };
