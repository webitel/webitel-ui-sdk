<script setup>
</script>

# `permissions-tab.vue`

Компонент таби з правами доступу до обʼєкту.

## Specs

<Specs />

## Як користуватись

По-правильному, таби мають відкриватись через роутер:

```vue
<template>
  <!--  ... -->
  <wt-tabs
    :current-tab="currentTab"
    :tabs="tabs"
    @change="changeTab"
  />

  <router-view v-slot="{ Component }">
    <component
      :is="Component"
      :access="{}"
      :namespace="'cardNamespace'"
      :v="{}"
    />
  </router-view>
  <!--   ... -->
</template>

<script setup>
const tabs = [
  {
    text: t('objects.general'),
    value: 'UsersRouteNames.GENERAL', // enum value
    pathName: 'UsersRouteNames.GENERAL', // enum value
  },
  {
    text: t('objects.permissions.permissions', 2),
    value: 'UsersRouteNames.PERMISSIONS', // enum value
    pathName: 'UsersRouteNames.PERMISSIONS', // enum value
  },
];

// compute from route
const currentTab = computed(() => {});

const changeTab = ({ pathName }) => {
  // change route
};
</script>
```

А отже, компоненти табів не треба реєструвати в компоненті враппера табів,
а треба тільки в роутері. А у динамічний компонент в середині `router-view` передавати
потрібні пропси.

### [Як зареєструвати роутинг?](../index.md#як-додати-компонент-таби-в-роутинг)
