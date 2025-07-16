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
### Особлива згадка про пропс `access`

Пропс `access` є об'єктом, що передається до компонента таби і відповідає за керування правами доступу всередині таби `Permissions`.
Він дозволяє динамічно контролювати, які дії може виконувати користувач в табі.

Об'єкт `access` повинен мати таку структуру:

* **`read`** (Boolean): дозвіл на читання.
* **`edit`** (Boolean): дозвіл на редагування.
* **`delete`** (Boolean): дозвіл на видалення.
* **`add`** (Boolean): дозвіл на додавання.

**Приклад використання:**

```vue
<router-view
  :namespace="cardNamespace"
  :access="{
    read: true, // Читання дозволено завжди
    edit: editMode, // Редагування залежить від editMode-змінної
    delete: editMode, // Видалення залежить від editMode-змінної
    add: editMode, // Додавання залежить від editMode-змінної
  }"
  ...
/>

Таким чином працює регуляція редагування та додавання прав доступу в Cases при Edit режимі

А отже, компоненти табів не треба реєструвати в компоненті враппера табів,
а треба тільки в роутері. А у динамічний компонент в середині `router-view` передавати
потрібні пропси.

### [Як зареєструвати роутинг?](../index.md#як-додати-компонент-таби-в-роутинг)
