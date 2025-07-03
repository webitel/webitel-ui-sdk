# `UseCardTabs`

`Composable` використовується для роботи з табами в карточці сутності.
Викликає всередині себе роутер та роут для розрахунку

## Input params

| Params | Description                                    |
| ------ | ---------------------------------------------- |
| tabs   | Масив табів, які є наявні на сторінці сутності |

## Return

| Params     | Description                                                                   |
| ---------- | ----------------------------------------------------------------------------- |
| currentTab | Поточна відкрита таба. Розраховується від значення `route.name` або `tabs[0]` |
| changeTab  | Метод для зміни таби. Викликає `router` і пушить нове значення в нього        |

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
    pathName: 'tokens', // pathName - значення з router. Впливає на розрахунок currentTab та changeTab
  },
];

const { currentTab, changeTab } = useCardTabs(tabs);
```
