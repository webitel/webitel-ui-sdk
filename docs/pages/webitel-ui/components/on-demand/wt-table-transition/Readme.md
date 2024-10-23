# WtTableTransition
Компонент для "плавної появи" таблиць

## Приклад використання

```vue
// the-sources.vue

<template>
        ...
        <div class="table-section__table-wrapper" v-show="dataList.length">
            <wt-table-transition v-if="dataList.length && !isLoading">
              <wt-table>
                ...
              </wt-table>
            </wt-table-transition>
        </div>          
        ...
</template>

<script setup>
import WtTableTransition from '@webitel/ui-sdk/src/components/on-demand/wt-table-transition/wt-table-transition.vue';
...
</script>
```
