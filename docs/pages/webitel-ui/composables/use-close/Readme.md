# `UseClose`

Композібл вертає метод `close`, який використовується для закриття сутності.
Якщо історія таби містить тільки один поточний запис, при виклику `close` таба буде закрита.

## Input params

| Params | Description                                                  |
| ------ | ------------------------------------------------------------ |
| name   | Імя сторінки, куди треба повернутись після закриття поточної |

## Return

| Params | Description |
| ------ | ----------- |
| close  |             |

## Використання

```js
import { useClose } from '@webitel/ui-sdk/src/composables/useClose/useClose.js';

const { close } = useClose('some-route');
```
