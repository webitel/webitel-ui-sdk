# `findTreePath`

## Why?

Щоб не писати вкотре рекурсивний обхід дерева, коли треба знайти, **де саме** в ньому лежить вузол: для хлібних крихт, для підпису на кшталт `Каталог / Сервіс / Підсервіс` або для перевірки батьківських вузлів.

Найчастіший випадок — каталоги сервісів кейсів, де дочірні сервіси лежать у полі `service`.

## Usage

```ts
import { findTreePath } from '@webitel/ui-sdk/utils';

const path = findTreePath(
  catalog.service,
  (service) => service.id === serviceId,
  'service',
);

// підпис
path?.map(({ name }) => name).join(' / '); // 'Refunds / Card refund'

// лише батьківські вузли, без самого вузла
path?.slice(0, -1);
```

## Params

### `nodes`

Корені дерева — масив вузлів. `null` / `undefined` дозволені, тоді результат — `null`.

### `isTarget`

`(node) => boolean` — предикат шуканого вузла. Повертається шлях до **першого** збігу (обхід у глибину).

### `childrenKey`

Ключ, у якому вузол зберігає дочірні вузли: `'service'`, `'children'` тощо.

## Returns

Масив вузлів від кореня до знайденого вузла, **включно з обома кінцями**, або `null`, якщо нічого не знайдено.

```ts
findTreePath(tree, isTarget, 'children');
// [root, ..., target] | null
```

## Типізація

Тип вузла виводиться лише з `nodes`. Якщо дерево не типізоване (`any`), вкажіть тип явно:

```ts
import type { WebitelCasesService } from '@webitel/api-services/gen/models';

findTreePath(
  catalog.service as WebitelCasesService[],
  (service) => service.id === id,
  'service',
);
```
