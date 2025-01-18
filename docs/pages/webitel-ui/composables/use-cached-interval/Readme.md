# `UseCachedInterval`

Сomposable run a trans callback at a specified frequency.
We take startup time from parameter timeout, or localStorageKey, or 5 minutes by default

## Input params

| Params          | Default      | Description                                       |
| --------------- | ------------ | ------------------------------------------------- |
| timeout         | 5min         | frequency of function calls                       |
| localStorageKey | auto-refresh | key from localStorage where the timeout is stored |

## Використання

```js
import { useCachedInterval } from '@webitel/ui-sdk/src/composables/useCachedInterval/useCachedInterval';

const { subscribe } = useCachedInterval({ timeout: 3000 });
return { subscribe };

subscribe(callback);
```
