# `camelCase` типи і `snake_case` дріт

_author: @dlohvinov_

## Проблема

Webitel API (grpc-gateway) розмовляє **`snake_case` в обидва боки**. Заміри по
[swagger](https://raw.githubusercontent.com/webitel/protos/main/swagger/api.json):

| | кількість |
|---|---|
| query-параметрів у `snake_case` | 136 |
| з них "вкладених", через крапку (`uploaded_at.from`, `joined_at.to`) | 87 |
| query-параметрів, які справді `camelCase` (`notInSla`, `baseObject`) | 11 |
| полів схем у `snake_case` (тіла запитів **і** відповіді) | 1754 |
| полів схем у `camelCase` (переважно LDAP) | 30 |

При цьому фронтенду зручніше з `camelCase`, і саме такі типи шарять між собою
аплікейшени. Раніше специфікацію камелізували **до** orval, тому згенерований
HTTP-шар був типізований у тій формі, яку він ніколи не надсилає: тип казав
`uploadedAtFrom`, а гейтвею потрібно `uploaded_at.from`.

## Рішення: два проходи генерації

`npm run gen:api` проганяє одну специфікацію двічі:

| Прохід | Конфіг | Вихід | Що містить | Хто споживає |
|---|---|---|---|---|
| camel | `.openapiformatrc` (з `casingSet`) | `src/gen/**` | **тільки типи**: моделі, enum'и, їхні zod-схеми | аплікейшени, через `./gen` і `./gen/models` |
| wire | `.openapiformatrc.wire.json` (без `casingSet`) | `src/gen-wire/**` | сервіси, zod запитів/відповідей, типи | `src/api/clients/*`, а ззовні – `./gen-wire` |

> [!IMPORTANT]
> У `.openapiformatrc.wire.json` **не можна** додавати `casingSet`. Відсутність
> кастингу – і є точна відповідність swagger'у. Заміряно: `"snake_case"` там
> перейменував би 95 query-параметрів і 51 поле схем **геть від** їхніх імен у
> swagger – усі вкладені фільтри, `variables[string]`, `tls.PEM`, `notInSla`,
> LDAP-поля.

Orval не вміє генерувати "тільки схеми", тому camel-прохід генерує сервіси, а
`prune-camel-services.mjs` їх прибирає одразу після генерації і залишає в
`src/gen` лише `_models` + барель, що його реекспортує.

### Що це означає на практиці

```ts
// типи, enum'и, zod моделей – camelCase, для аплікейшенів
import type { WebitelContactsContact } from '@webitel/api-services/gen/models';

// сервіси і zod запитів/відповідей – wire-форма
import {
  getSources,             // service
  CreateSourceBody,       // zod
  ListSourcesQueryParams, // zod
} from '@webitel/api-services/gen-wire';
```

> [!WARNING]
> `@webitel/api-services/gen` більше **не** експортує сервіси, zod запитів
> (`*QueryParams`, `*Body`) і моки. Тільки моделі, enum'и та їхні zod-схеми.

## Як клієнт зводить дві форми

```ts
const requestParams = applyTransform(params, [
  merge(getDefaultGetParams()),
  sanitizeToWire(fieldsToSend), // [!code highlight]
  camelToSnake(),
]);
```

* **`sanitizeToWire(wireFields)`** = `toWireParams` + `sanitize`. Ставиться туди,
  де раніше стояв `sanitize()`.
* **`camelToSnake()`** лишається **після** нього – він конвертує *значення*
  (`fields: ['viewName']` → `['view_name']`), а не ключі.

> [!IMPORTANT]
> Порядок критичний. Якщо перейменувати ключі **після** `camelToSnake()`, то
> `uploadedAtFrom` вже перетворився на `uploaded_at_from`, і зіставляти нема з чим.

### Чому не просто `camelToSnake()` + `sanitize()`

Бо `camelToSnake` не вміє відтворити wire-імена. Заміряно на 8386 парах полей
двох згенерованих наборів: **597 імен недосяжні** (з них 242 – у типах
query-параметрів).

| ключ від викликача | `camelToSnake` дає | дріт хоче |
|---|---|---|
| `dateFrom` | `date_from` | `date.from` |
| `groupString` | `group_string` | `group[string]` |
| `baseObject` | `base_object` | `baseObject` |
| `pem` | `pem` | `PEM` |

`sanitize` – це строгий whitelist по wire-іменах, тому кожен промах не дає
"неправильне значення", а **тихо викидає ключ**: фільтр просто зникає з запиту.

### Як працює зіставлення

Обидва написання походять з одного OpenAPI-документа, тож різняться лише
роздільниками та регістром. `toWireParams` зіставляє за іменем, з якого
викинуто всі не-літери/цифри, у нижньому регістрі:

```
uploadedAtFrom -> uploadedatfrom <- uploaded_at.from
groupString    -> groupstring    <- group[string]
sha256Sum      -> sha256sum      <- sha256sum
```

Виводити camel-написання з wire-імені – **неточно**: власноруч написане
згортання промахується на 22 іменах, `change-case` – на 9 (`sha256sum`, `@type`).
Зіставлення нормалізацією – 0 промахів на 7289 парах, і жодні два імені в межах
одного списку не нормалізуються однаково.

## Тести

`test:unit` більше не заглушка:

```bash
npm run test:unit   # vitest run --root ../.. packages/api-services/src
```

Запити перевіряються на рівні axios: спеки підміняють `axios.defaults.adapter`
і звіряють **буквальні** імена параметрів, що йдуть у запит – див.
`src/api/clients/fileServices/__tests__/fileServices.spec.ts`.
