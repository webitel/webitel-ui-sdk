# `UseCachedItemInstanceName`

Композібл для кеширування імені екземпляра об'єкта itemInstance.

## Input params

| Params       | Default | Description |
|--------------|---------|-------------|
| itemInstance |         |             |
| namePath     | name    |             |

## Return

| Params | Description |
|--------|-------------|
| name   |             |

## Використання

```js
import { useCachedItemInstanceName } from '../useCachedItemInstanceName/useCachedItemInstanceName.js';

const itemInstance = ref({
  name: 'some name',
});

const { name } = useCachedItemInstanceName(itemInstance);

```
