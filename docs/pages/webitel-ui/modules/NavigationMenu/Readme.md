# Navigation menu

### Props:

| Name            | Type   | Default | Required | Description                                                                                                    |
|-----------------|--------|---------|----------|----------------------------------------------------------------------------------------------------------------|
| `navItems`      | Array  | `[]`    | +        | Масив обʼєктів `{ value: string, name: string, subNav: array - { value: string, route: string, name: string} }` |

### Іконки

Іконки можна додати в app/assets/icons/sprite з приставкою 'nav' (nav-icon, nav-search), не забудьте додати імпорт 
іконки в файлі index.js в папці з іконками (import './nav-icon.svg';).  

Якщо іконки не працюють - перевірте чи в main.js вказаний імпорт - import './app/assets/icons/sprite';

##Приклад використання

```vue
// the-configuration.vue

<template>
  <section class="config-nav">
    <navigation-menu :navItems="navItems"/>
  </section>
</template>

<script setup>
  import CrmSections from '@webitel/ui-sdk/src/enums/WebitelApplications/CrmSections.enum';
  import { useI18n } from 'vue-i18n';
  import NavigationMenu from '@webitel/ui-sdk/src/modules/NavigationMenu/components/navigation-menu.vue';

  const { t } = useI18n();

  const navItems = [{
      value: 'lookups',
      name: t('configuration.lookups'),
      subNav: [
        {
          value: CrmSections.SOURCES,
          name: t('configuration.sources'),
          route: "sources",
        },
        {
          value: 'nav-iconName',
          name: "other name",
          route: "other-route",
        },
        {
          value: 'nav-iconName2',
          name: "other name 2",
          route: "other-route-2",
        },
      ],
    }]
</script>
```
