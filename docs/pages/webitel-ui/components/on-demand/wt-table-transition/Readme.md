# WtTableTransition
Компонент для "плавної появи" таблиць

## Приклад використання

```vue
// the-sources.vue

<template>
  <wt-page-wrapper :actions-panel="false"
                   class="table-page">
    <template #header>
      ...
    </template>

    <template #main>
        ...
        <div class="table-section__table-wrapper" v-show="dataList.length">
            <wt-table-transition v-if="dataList.length && !isLoading">
              <wt-table
              :data="dataList"
              :headers="headers"
              sortable
              @sort="sort"
              >
                <template #name="{ item }">
                  <wt-item-link :link="'/lookups/sources/' + item.id + '/general'">
                    {{ item.name }}
                  </wt-item-link>
                </template>
                <template #actions="{ item }">
                  <wt-item-link :link="'/lookups/sources/' + item.id + '/general'">
                    <wt-icon-action action="edit" />
                  </wt-item-link>
                  <wt-icon-action
                    class="table-action"
                    v-if="hasObacDeleteAccess"
                    action="delete"
                    @click="askDeleteConfirmation({
                    deleted: [item],
                    callback: () => deleteData(item),
                  })"
                  />
                </template>
              </wt-table>
            </wt-table-transition>
        </div>          
        ...
    </template>
  </wt-page-wrapper>
</template>

<script setup>
import WtTableTransition from '@webitel/ui-sdk/src/components/on-demand/wt-table-transition/wt-table-transition.vue';
...
</script>
```
