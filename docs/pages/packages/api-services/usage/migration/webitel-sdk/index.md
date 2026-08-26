# Usage

_author: @dlohvinov_

## Usage differences & Migration from `webitel-sdk`

### Prerequisites

#### alias

Коли вперше підключаєте `@webitel/api-services`, вам потрібно налаштувати `alias` для його `axios` імпорту.

**Error:**
![alias-error](assets/alias-error.png)

**Fix:**
![alias-solution](assets/alias-solution.png)


### Imports

> [!IMPORTANT]
> Lib exports generated **types** as `/gen` and `/gen/models`, and generated
> **services** (+ zod запитів/відповідей) as `/gen-wire`.
> **DO NOT** try to export from root (`@webitel/api-services`), or using paths to separate services files.

#### api services
```ts
import {
  getSources, // service
  CreateSourceBody, // validation
  ListSourcesQueryParams, // validation
  UpdateSourceBody, // validation
} from '@webitel/api-services/gen-wire';
```

> [!WARNING]
> Раніше це імпортувалось з `@webitel/api-services/gen`. Там лишились лише
> моделі, enum'и та їхні zod-схеми – деталі в
> [`camelCase` типи і `snake_case` дріт](../../wire-vs-camel/index.md).

#### models

```ts
import { CaseSources } from '@webitel/api-services/gen/models';

/*
interface CasesSource {
    createdAt?: string;
    createdBy?: GeneralLookup;
    description?: string;
    id?: string;
    name?: string;
    type?: CasesSourceType;
    updatedAt?: string;
    updatedBy?: GeneralLookup;
}
 */
```

### Створення сервісу

```ts
const sourceService = new CaseSourcesApiFactor(instance, '', openAPIConfig);  // [!code --]

const sourceService = getSources();  // [!code ++]
```

І все. axios instance підтягнеться самостійно з [alias](#alias)'а.

**Використання створенного сервіса – ідентичне.**

### Використання

#### Динамічні `fieldsToSend` для `sanitizer` трансформера

Зважаючи на те, що ми генеруємо [zod](https://zod.dev/) валідації, то ми можемо з zod-обʼєкта витягти його поля динамічно.
Завдяки цьому, `sanitize`'и `fieldsToSend` можна "тягти" з них.

>[!WARNING]
> В розробці. **Варіант НЕ остаточний**. Але пробувати бавитись вже можна 🙂

```ts
import {
  ListSourcesQueryParams,
} from '@webitel/api-services/gen-wire';

import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';  // [!code highlight]

// ...
const fieldsToSend = getShallowFieldsToSendFromZodSchema(ListSourcesQueryParams);  // [!code highlight]

const { page, size, fields, sort, id, q, type } = applyTransform(params, [
    // ...
    sanitizeToWire(fieldsToSend), // [!code highlight]
    // ...
]);
// ...

```

#### Case Conversion: `camelCase` <-> `snake_case`

Ключі параметрів перейменовує `sanitizeToWire(fieldsToSend)` – за списком полів,
витягнутим зі згенерованої zod-схеми, тож ручний маппінг не потрібен.
`camelToSnake()` лишається **після** нього і конвертує *значення*
(`fields: ['viewName']` → `['view_name']`).

```ts
const {/*...*/} = applyTransform(params, [
    // ...
    sanitizeToWire(fieldsToSend), // ключі -> wire-імена + whitelist [!code highlight]
    camelToSnake(), // значення [!code highlight]
    // ...
]);
```

> [!IMPORTANT]
> Не міняйте порядок: після `camelToSnake()` ключ `uploadedAtFrom` вже став
> `uploaded_at_from`, і зіставити його з `uploaded_at.from` вже нема з чим.
> Деталі: [`camelCase` типи і `snake_case` дріт](../../wire-vs-camel/index.md).

#### Defaults

**Без змін**. Працюєм над цим.

```ts

const defaultObject = { items: [], next: false, count: 0 }; // [!code highlight]

const {/*...*/} = applyTransform(params, [
    // ...
    merge(defaultObject), // [!code highlight]
    // ...
]);
 const fieldsToSend = getShallowFieldsToSendFromZodSchema(ListSourcesQueryParams);

const { page, size, fields, sort, id, q, type } = applyTransform(params, [
    
    sanitizeToWire(fieldsToSend),
    camelToSnake(),
]);
```

#### Робимо запит

Дл `list`  запитів тепер передаємо обʼєкт, а не набір параметрів. 

Це означає, що:
* Порядок параметрів тепер не має значення (але краще притримуватись старого).
* **Назва параметрів має значення!** (так як це тепер поля обʼєкта).
```ts
const response = await sourceService.listSources({ // Увага!! `(param1, param2, ...)` -> `({ param1, param2, ... })`
    // ...  
      page,
      size,
    // ...
    });
```

### Використання типів
**Strongly recommended**. Використовуйте, не соромтесь 🙂

[Як імпортувати?](#models)

### Використання `enums`
Імпортувати [так само, як і типи](#models)

> [!TIP]
>  Ключі згенерованих `enums` мають бути в `PascalCase`. Я це налаштовував. Якщо не робить, маякніть.