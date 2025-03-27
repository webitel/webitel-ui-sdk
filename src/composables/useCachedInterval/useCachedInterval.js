import { onBeforeUnmount } from 'vue';

import preventHiddenPageCallsDecorator from '../../scripts/preventHiddenPageCallsDecorator.js';

// eslint-disable-next-line import/prefer-default-export
export const useCachedInterval = ({
  timeout,
  localStorageKey = 'auto-refresh',
}) => {
  let interval = null;

  onBeforeUnmount(() => {
    if (interval) clearInterval(interval);
  });
  const subscribe = (callback) => {
    const _timeout =
      timeout || +localStorage.getItem(localStorageKey) || 5 * 60 * 1000;
    callback();
    interval = setInterval(preventHiddenPageCallsDecorator(callback), _timeout);
  };
  return { subscribe };
};
