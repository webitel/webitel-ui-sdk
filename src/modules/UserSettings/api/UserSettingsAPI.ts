import { getDefaultInstance } from '@webitel/api-services/api/defaults';
import {
  applyTransform,
  notify,
  snakeToCamel,
} from '@webitel/api-services/api/transformers';

import type { Timezone } from '../types/UserSettings'

const instance = getDefaultInstance();

const getUserTimezone = async (): Promise<Timezone> => {
  try {
    const response = await instance.get('/user/settings/timezone');
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const setUserTimezone = async (timezone: string) => {
  const url = 'user/settings/timezone';
  try {
    const response = await instance.put(url, { timezone });
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

export default {
  getUserTimezone,
  setUserTimezone,
}
