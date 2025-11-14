# WtTableTransition

Компонент для "плавної появи" таблиць

## Приклад використання

```vue
// the-sources.vue

<template>
  ...
  <wt-table-transition v-show="dataList.length && !isLoading">
    <wt-table> ... </wt-table>
  </wt-table-transition>
  ...
</template>

<script setup>
import WtTableTransition from '@webitel/ui-sdk/src/components/on-demand/wt-table-transition/wt-table-transition.vue';
...
</script>
```
