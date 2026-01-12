import { camelToSnake } from '../../../utils';
import { getFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils'
import { get, set } from 'lodash-es';

export const transformRequestCaseInterceptor = [
 (config) => {
  const { zodSchema } = config.meta || {};

  if (!zodSchema) return config;

  const fields = getFieldsToSendFromZodSchema(zodSchema);

  const convert = (obj) => {
    const newObj = {};
    for (const field of fields) {
      const val = get(obj, field);
      if (val !== undefined) {
        set(newObj, camelToSnakePath(field), val);
      }
    }
    return newObj;
  };

  const camelToSnakePath = (path: string) =>
    path.split('.').map(camelToSnake).join('.');

  if (config.data) {
    config.data = convert(config.data);
  }

  if (config.params) {
    config.params = convert(config.params);
  }

  return config;
}
];
