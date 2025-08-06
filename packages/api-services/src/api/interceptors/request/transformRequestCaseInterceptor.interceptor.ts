import { camelToSnake } from '../../../utils';
import { getFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils'

export const transformRequestCaseInterceptor = [
  (config) => {
  if(!config) return;

  const schema = config.meta?.zodSchema;

  if (schema) {
    const allowedFields = getFieldsToSendFromZodSchema(schema);

    if (config.params) {
      const newParams = {};
      for (const key of Object.keys(config.params)) {
        if (allowedFields.includes(key)) {
          newParams[camelToSnake(key)] = config.params[key];
        } else {
          newParams[key] = config.params[key];
        }
      }
      config.params = newParams;
    }
  }

  return config;
}
];
