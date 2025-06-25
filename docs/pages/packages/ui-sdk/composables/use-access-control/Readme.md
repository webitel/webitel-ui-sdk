# `UseAccessControl`

Композібл вертає `computed` властивості для роботи з доступом до сторінок.

## Return

| Params              | Description                       |
| ------------------- | --------------------------------- |
| hasReadAccess       | чи є доступ на перегляд запису    |
| hasCreateAccess     | чи є доступ на створення запису   |
| hasDeleteAccess     | чи є доступ на видалення запису   |
| hasEditAccess       | чи є доступ на редагування запису |
| hasSaveActionAccess | чи є доступ на збереження запису  |
| disableUserInput    | заборона керування певним полем   |

Параметри `hasReadAccess`, `hasCreateAccess`, `hasDeleteAccess`, `hasEditAccess` розраховуються в
залежності від `route` сторінки, а саме його значення прокидується у `getter userinfo` і всередині аналізується на наявність доступів

## Використання

```js
import { useAccessControl } from '@webitel/ui-sdk/src/composables/useAccessControl/useAccessControl.js';

const {
  hasReadAccess,
  hasCreateAccess,
  hasDeleteAccess,
  hasEditAccess,
  hasSaveActionAccess,
  disableUserInput,
} = useAccessControl();
```
