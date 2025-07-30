import { get, set, snakeCase, camelCase } from 'lodash-es';

export const convertCamelToSnakeFrom = (obj, keys) => {
  const result: Record<string, any> = {};

  keys.forEach((key) => {
    const value = get(obj, key);
    if (value !== undefined) {
      const snakeKey = snakeCase(key);
      set(result, snakeKey, value);
    }
  });
  return result;
}

export const convertSnakeToCamel = (obj, keys) => {
  const result: Record<string, any> = {};

  keys.forEach((key) => {
    const value = get(obj, key);
    if (value !== undefined) {
      const camelKey = camelCase(key);
      set(result, camelKey, value);
    }
  });
  return result;
};
