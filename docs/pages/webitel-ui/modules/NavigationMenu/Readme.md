# NavigationMenu

### Props:

| Name       | Type  | Default | Required | Description                                                 |
|------------|-------|---------|----------|-------------------------------------------------------------|
| `navItems` | Array | `[]`    | +        | Масив обʼєктів включаючих у себе ключі value, name, subName |

### Icons

Іконка в лівій частині новігації буде підтягнута автоматично за значенням `value` з обʼєкта `navItems`.
Якщо значення value відрізняється від назви іконки - треба прописати виключення в компоненті `nav-menu-lvl-1.vue`.

## Example Code Navigation Menu

```vue

<template>
  <navigation-menu :nav-items="navItems" />
</template>

<script setup>
  import NavigationMenu from '@webitel/ui-sdk/src/modules/NavigationMenu/components/navigation-menu.vue';

  const navItems = [
    {
      value: 'lookups',
      name: 'lookups',
      subNav: [
        {
          value: 'sources',
          name: 'sources',
          route: 'lookups/sources',
        },
        {
          value: 'slas',
          name: 'slas',
          route: 'lookups/slas',
        },
      ],
    },
  ];
</script>
```
