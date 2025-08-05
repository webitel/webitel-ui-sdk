# Card Module

[[toc]]

Модуль для роботи з карточками табличок. 
Тут є:
*  store карточки, 
* composables – для взаємодії з ним на рівні компонента,
* user input валідація – "в коробці".


## Intro

Ідея модуля без змін. у `@webite/ui-datalist/card` маємо:
* store factory для карточки – `createCardStore()`
* composables для роботи з ним на рівні компонентів – `useCardComponent()`

**І ще під капотом:**

* валідації
* різні дрібні composables (всі вони зводяться до використання на рівні клієнта `useCardComponent()`)

## Що нового?

У порівнянні з попередніми версіями карточки, або усталеними підходами.

### `POST` + `GET` => `POST` + `POST` Response

Або `PUT`, `PATCH`.

#### TLDR;

Не потрібно робити окремий `GET` після `POST` / `PUT` / `PATCH`.

#### Раніше

::: details
1. Зберігаємо зміни, -> викликаємо `POST`.
2. ...`await POST`...
3. **Робимо `GET` для отримання цього запису.**
:::


#### Тепер

::: details
1. Зберігаємо зміни, -> викликаємо `POST`.
2. ...`await POST`...
3. **Використовуємо відповідь `POST` замість виклику `GET`.**
:::

#### Чому?

::: details
Бо `POST` / `PUT` / `PATCH` Response вже вертає цей запис, який ми можемо використати далі.

Запит `GET` – рудиментарний, і лише зайвий раз навантажує сервер.
:::

### Філди форми карточки: `:value` + `@input` => `v-model`

Або, в розширеному форматі `:value=itemInstance.prop` (readonly store state) + 
`@input=setItemProp` (store dispatch) => `v-model` (mutating `v-model`)

#### TLDR;

Використовуємо `v-model` замість 
`:value` + `@input` для полів форми карточки. `modelValue` для `v-model` – отримуємо з `defineModel()`.

#### Раніше

::: details
```ts
// opened-entity-general.vue – card tab component

<template>
    // ...
  <wt-input
    :value="itemInstance.name"
    @input="setItemProp({ value: $event, prop: 'name' })"
  />
    // ...
</template>

<script setup lang="ts">
    // ...
    
    const itemInstance = store.state.itemInstance;

    const setItemProp = (payload) => {
        store.dispatch('setItemProp', payload);
    };
    
    // ...
</script>
```
:::

#### Тепер

::: details
```ts
// opened-entity-general.vue – card tab component

<template>
    // ...
  <wt-input
    v-model="modelValue.name"
  />
    // ...
</template>

<script setup lang="ts">
    // ...
    
    const modelValue = defineModel<{ name: string }>();
    
    // ...
</script>
```
:::

#### Чому?

::: details

> [!NOTE]
> `v-model` – можем (рекомендовано) юзать, якщо компонент підтримує Vue 3 формат`v-model`.


Бо можем, і це простіше.

Раніше так було, тому що ми не використовували `v-model`, який надавав `Vuelidate`. І не робили свою `v-model`-обгортку.

А порушувати мутацію стейта – не хотілось.
:::