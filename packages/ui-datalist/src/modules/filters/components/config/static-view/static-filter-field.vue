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
import { isEmpty } from '@webitel/ui-sdk/scripts';
import { computed } from 'vue';

import { StaticFilterEmits, StaticFilterProps } from '../../types/Filter.types';

/* Author @Lera24
Static filters
Description - [https://webitel.atlassian.net/browse/WTEL-6934]
Example - section CRM / lookups Contact groups / Contacts tab / Adding contacts popup (click on the "+" button) */

const props = defineProps<StaticFilterProps>();

const emit = defineEmits<StaticFilterEmits>();

const filterValue = computed(() => props.filter?.value);

const onValueChange = (value) => {
    if (isEmpty(value) && typeof value !== 'boolean') {
      return emit('delete:filter', props.filter);
    }

    if (isEmpty(filterValue.value)) {
      return emit('add:filter', {
        name: props.filterConfig.name,
        value,
      });
    }

    emit('update:filter', {
      ...props.filter,
      value,
    });
  }
;

</script>

<style lang="scss" scoped>
.static-filter-field {
  flex: 1;
}
</style>
