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
import { WtObject } from '@webitel/ui-sdk/enums';
import deepCopy from 'deep-copy';
import { onMounted, ref } from 'vue';

import { hasFilterReadAccess } from '../../composables/useFilterReadAccess';
import type { CaseServiceFilterConfig } from './filterConfig';

type ModelValue = string[];

const props = defineProps<{
	filterConfig: CaseServiceFilterConfig;
}>();

const model = defineModel<ModelValue>({
	default: (): ModelValue => [],
});

const catalogData = ref<unknown[]>([]);

const loadCatalogs = async () => {
	const { items } = await props.filterConfig.searchCatalogs({
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

	catalogData.value = deepCopy(items ?? []);
};

if (!model.value) {
	model.value = [];
}

onMounted(() => {
	if (hasFilterReadAccess(WtObject.ServiceCatalog)) {
		loadCatalogs();
	}
});
</script>

<style lang="scss" scoped>
.service-case-filter-value-field {
  background: transparent;
  max-height: 350px;
  overflow-y: auto;
}
</style>
