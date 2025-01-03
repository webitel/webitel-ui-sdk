# `UseValidate`

Композібл створений для інкапсуляції загальної логіки валідації форми.
Тепер він містить в собі значення для `globalConfig` (зараз це `$autoDirty: true`)
Вертає обєкт валідації, який використовується на сторінках запису.

## Input params

| Params | Description                                         |
| ------ | --------------------------------------------------- |
| schema | Схема, за якою треба перевірити данні на валідність |
| data   | Обєкт, який треба валідувати                        |

## Return

| Params  | Description                         |
| ------- | ----------------------------------- |
| v$      | Обєкт з результатом валідації форми |
| invalid | Boolean значення `v$.$invalid`      |

## Використання

```js
import { useValidate } from '@webitel/ui-sdk/src/composables/useValidate/useValidate.js';

сonst;
schema = {
  name: {
    required: true,
    type: 'string',
    minLength: 3,
    maxLength: 255,
  },
  description: {
    required: true,
    type: 'string',
    minLength: 3,
    maxLength: 255,
  },
};

сonst;
data = {
  name: 'some name',
  description: 'some description',
};

const { v$, invalid } = useValidate(schema, { data });
```
