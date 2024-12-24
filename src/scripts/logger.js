import isObject from 'lodash/isObject.js';

const validateConfig = (config) => {
  return isObject(config) && (config.entity || config.module);
};

const logger =
  (globalApp) =>
    (type) =>
      (...params) => {
    if (validateConfig(params[0])) {
      const config = params[0];

      const { app = globalApp, entity = '', module = '' } = config;
      const timestamp = new Date();
      const path = window?.location?.href || 'non-browser env';

      return (...msgs) => {
          const prependix = `@webitel/${app}:${entity}:${module}:`;

          const appendix = `[${timestamp}][${path}]`;

        return console[type](prependix, ...msgs, appendix);
      };
    }

    return console[type](...params);
  };

export const wtlog = (app) => ({
  info: logger(app)('info'),
  warn: logger(app)('warn'),
  error: logger(app)('error'),
  log: logger(app)('log'),
});

// only for ui-sdk usage
export const _wtUiLog = wtlog('ui-sdk');
