# `UseCachedItemInstanceName`

Композібл для кеширування імені екземпляра об'єкта `itemInstance`.
Використовується здебільшого в компоненті [wt-headline-nav](../../components/wt-headline-nav/Readme.md), де
відображається ім'я об'єкта і оновлюється тільки після збереження змін.
Зараз композібл викликається у середині [useCardComponent](../use-card-component/Readme.md)

## Input params

| Params       | Default | Description |
| ------------ | ------- | ----------- |
| itemInstance |         |             |
| namePath     | name    |             |

## Return

| Params | Description                                                                    |
| ------ | ------------------------------------------------------------------------------ |
| name   | Значенння name з сутності itemInstance, яке було до редагування `itemInstance` |

## Приклад використання

```js
<template>
  <wt-headline-nav :path="path" />
</template>;

import { useCachedItemInstanceName } from '../useCachedItemInstanceName/useCachedItemInstanceName.js';

const itemInstance = ref({
  name: 'some name',
});

const { pathName: name } = useCachedItemInstanceName(itemInstance);

const path = computed(() => {
  const baseUrl = '/directory/users';

  return [
    {
      name: t('objects.directory.directory'),
    },
    {
      name: t('objects.directory.users.users', 2),
      route: baseUrl,
    },
    {
      name: isNew.value ? t('objects.new') : pathName.value,
      route: {
        name: currentTab.value.pathName,
        query: route.query,
      },
    },
  ];
});

```
