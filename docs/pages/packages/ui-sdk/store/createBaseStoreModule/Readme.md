# `createBaseStoreModule`

Метод для створення стор модуля на основі базового стор модуля.

## Mutations

### `SET`

Приймає `{ path, value }`. Встановлює значення `value` за шляхом `path` у стейті.

## Usage

```javascript
import { createBaseStoreModule } from '@webitel/ui-sdk/store';

const state = {
  custom: 'state',
};

const baseModule = createBaseStoreModule({ state });

export default baseModule;
```
