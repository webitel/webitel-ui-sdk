<template>
  <wt-tree
    :model-value="model"
    :data="catalogData"
    item-data="id"
    item-label="name"
    children-prop="service"
    class="service-case-filter-value-field"
    multiple
    allow-parent
    @update:model-value="model = $event"
  />
</template>

<script lang="ts" setup>
import { WtTree } from '@webitel/ui-sdk/components';
import deepCopy from 'deep-copy';
import { onMounted, ref } from 'vue';

import { searchMethod } from './config.js';

type ModelValue = string[];
const model = defineModel<ModelValue>({
  default: [],
});

const catalogData = ref([]);

const loadCatalogs = async () => {
  const { items } = await searchMethod({
    size: -1, // To get all catalogs with services we need to pass size -1
    fields: ['id', 'name', 'closeReasonGroup', 'status', 'service'],
    hasSubservices: true,
  });

  catalogData.value = deepCopy(items);
};

if (!model.value) {
  model.value = [];
}

onMounted(loadCatalogs);
</script>

<style lang="scss">
$form-width: 800px;

.service-case-filter-value-field {
  grid-area: value;
  background: transparent;
  height: 100%;
  max-height: 350px;
  overflow-y: auto;
}

.dynamic-filter-config-form {
  &:has(.service-case-filter-value-field) {
    display: grid;
    grid-template-rows: 64px 1fr auto;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'column label'
      'value value'
      'footer footer';
    width: $form-width;
    height: 500px;

    .wt-select {
      grid-area: column;
      height: fit-content;
    }

    .wt-input {
      grid-area: label;
    }

    .dynamic-filter-config-form-footer {
      grid-area: footer;
    }
  }
}
</style>
