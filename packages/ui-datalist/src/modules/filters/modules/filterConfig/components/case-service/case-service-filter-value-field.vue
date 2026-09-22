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
    @update:model-value="model = $event as ModelValue"
  />
</template>

<script lang="ts" setup>
import { WtTree } from '@webitel/ui-sdk/components';
import deepCopy from 'deep-copy';
import { onMounted, ref } from 'vue';

import { searchMethod } from './config.js';

type ModelValue = string[];
const model = defineModel<ModelValue>({
	default: (): ModelValue => [],
});

const catalogData = ref([]);

const loadCatalogs = async () => {
	const { items } = await searchMethod({
		size: -1, // To get all catalogs with services we need to pass size -1
		fields: [
			'id',
			'name',
			'closeReasonGroup',
			'status',
			'service',
		],
		hasSubservices: true,
	});

	catalogData.value = deepCopy(items);
};

if (!model.value) {
	model.value = [];
}

onMounted(loadCatalogs);
</script>

<style lang="scss" scoped>
.service-case-filter-value-field {
  background: transparent;
  max-height: 350px;
  overflow-y: auto;
}
</style>
