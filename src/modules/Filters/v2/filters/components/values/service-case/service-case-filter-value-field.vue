<template>
  <wt-tree
    :model-value="model"
    :data="catalogData"
    item-data="id"
    item-label="name"
    children-prop="service"
    class="service-case-filter-value-field"
    multiple
    @update:model-value="model = $event"
  />
</template>

<script lang="ts" setup>
import deepCopy from 'deep-copy';
import { onMounted, ref } from 'vue';

import WtTree from '../../../../../../../components/wt-tree/wt-tree.vue';
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
  background: transparent;
  max-height: 350px;
  height: 100%;
  overflow-y: auto;
  grid-area: value;
}

.dynamic-filter-config-form {
  &:has(.service-case-filter-value-field) {
    width: $form-width;
    height: 500px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 64px 1fr auto;
    grid-template-areas:
      'column label'
      'value value'
      'footer footer';

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
