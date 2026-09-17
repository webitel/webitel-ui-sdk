<template>
  <div class="static-filter-field">
    <component
      :is="filterConfig.valueInputComponent"
      :disable-validation="true /*for static filters validation is not needed (different presentation with dynamic filters)*/"
      :filter-config="filterConfig"
      :hide-label="true /*for static filters need to hide label and display placeholder (different presentation with dynamic filters)*/"
      :model-value="filterValue"
      :placeholder="filterConfig.label"
      @update:model-value="onValueChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useFilterValueChange } from '../../../composables/useFilterValueChange';
import { StaticFilterEmits, StaticFilterProps } from '../../types/Filter.types';

/* Author @Lera24
Static filters
Description - [https://webitel.atlassian.net/browse/WTEL-6934]
Example - section CRM / lookups Contact groups / Contacts tab / Adding contacts popup (click on the "+" button) */

const props = defineProps<StaticFilterProps>();

const emit = defineEmits<StaticFilterEmits>();

const filterValue = computed(() => props.filter?.value);

const { onValueChange } = useFilterValueChange({
	filterConfig: () => props.filterConfig,
	filter: () => props.filter,
	emit,
});
</script>

<style lang="scss" scoped>
.static-filter-field {
  flex: 1;
  min-width: 0;
}
</style>
