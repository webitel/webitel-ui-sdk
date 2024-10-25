# `UseAccessControl`

Композібл вертає computed властивості для роботи з доступом до сторінок.

## Return

| Params              | Description |
|---------------------|-------------|
| hasReadAccess       |             |
| hasCreateAccess     |             |
| hasDeleteAccess     |             |
| hasEditAccess       |             |
| hasSaveActionAccess |             |
| disableUserInput    |             | 

## Використання

```js
import { useAccessControl } from '@webitel/ui-sdk/src/composables/useAccessControl/useAccessControl.js';

const {
  hasReadAccess,
  hasCreateAccess,
  hasDeleteAccess,
  hasEditAccess,
  hasSaveActionAccess,
  disableUserInput
} = useAccessControl();

```
