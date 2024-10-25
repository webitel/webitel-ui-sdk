# `UseCardTabs`

Композібл використовується для роботи з табами в карточці сутності.

## Input params

| Params | Description                                    |
|--------|------------------------------------------------|
| tabs   | Масив табів, які є наявні на сторінці сутності |

## Return

| Params     | Description           |
|------------|-----------------------|
| currentTab | Поточна відкрита таба |
| changeTab  | Метод для зміни таби  |

## Використання

```js
import { useCardTabs } from '@webitel/ui-sdk/src/composables/useCard/useCardTabs.js';

const tabs = [
  {
    text: t('objects.general'),
    value: 'general',
    pathName: 'general',
  },
  {
    text: t('objects.directory.users.tokens'),
    value: 'tokens',
    pathName: 'tokens',
  },
];

const { currentTab, changeTab } = useCardTabs(tabs);

```
