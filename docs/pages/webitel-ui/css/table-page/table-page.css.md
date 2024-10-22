# Table page styles

#### Що це
Це стилі для сторінки з стандартними таблицями. 

Ці стилі знаходяться тут для того, щоб вирішити проблему з дублюванням стилів в проектах.

## Які класи використовуються та їх порядок

.

    table-page
       table-section
    
        table-title
         table-title__title
         table-title__actions-wrap
         
       table-section__table-wrapper 

## Приклад використання

```vue

// crm,  the-sources.vue

<template>
  <wt-page-wrapper :actions-panel="false"
                   class="table-page">
    <template #header>
      <wt-page-header
        hidePrimary
        :secondary-action="goBack"
        :secondary-text="t('close')"
      >
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{ t('lookups.sources.caseSources') }}
          </h3>
          <div class="table-title__actions-wrap">
            <filter-search
              :namespace="filtersNamespace"
              name="name"
            />
            <wt-icon-action
              :disabled="!hasObacEditAccess"
              action="add"
              @click="create"
              class="add" />
            <wt-icon-action
              action="refresh"
              @click="loadData"
            />
            <delete-all-action
              class="delete"
              v-if="hasObacDeleteAccess"
              :disabled="anySelected"
              :selected-count="selectedRows.length"
              @click="askDeleteConfirmation({
                deleted: selectedRows,
                callback: () => deleteData(selectedRows),
              })"
            />
          </div>
        </header>

        <wt-loader v-show="isLoading" />

        <wt-dummy
          class="dummy-wrapper"
          v-if="!isLoading && !dataList.length"
          :show-action="dummy.showAction"
          :text="dummy.text && t(dummy.text)"
          :dark-mode="darkMode"
          @create="create"
        />

        <div class="table-section__table-wrapper" v-show="dataList.length">
            <wt-table-transition v-if="dataList.length && !isLoading">
              <wt-table
              :data="dataList"
              :headers="headers"
              sortable
              @sort="sort"
              >
                <template #name="{ item }">
                  <wt-item-link :link="linkToGeneral(item.id)">
                    {{ item.name }}
                  </wt-item-link>
                </template>
                <template #actions="{ item }">
                  <wt-item-link :link="linkToGeneral(item.id)">
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
          <filter-pagination :namespace="filtersNamespace" :is-next="isNext" />
        </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>
```
