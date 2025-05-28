<template>
  <div class="static-filter-field">
    <component
      :is="filterConfig.valueInputComponent"
      :filter-config="filterConfig"
      :model-value="filterValue"
      :placeholder="filterConfig.label"
      disable-validation
      hide-label
      @update:model-value="onValueChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { isEmpty } from '@webitel/ui-sdk/scripts';
import { computed } from 'vue';
import { FilterData, FilterInitParams, IFilter } from '../../../classes/Filter';
import { AnyFilterConfig } from '../../../modules/filterConfig';

/* Author @Lera24
Static filters
https://webitel.atlassian.net/browse/WTEL-6934
Example - section CRM / lookups Contact groups / Contacts tab / Adding contacts popup (click on the "+" button)

This type of filters includes:

1 - displaying all filters on the screen (in dynamic - only when selecting a value)
2 - no validation, because filters are optional (disable-validation flag)
3 - no label, because different ui representation (hide-label flag)
4 - request API goes after each value is selected */

const props = defineProps<{
  filter: IFilter;
  /**
   * @description
   * this filter config
   */
  filterConfig: AnyFilterConfig;
}>();


const emit = defineEmits<{
  'add:filter': [FilterInitParams];
  'update:filter': [FilterData];
  'delete:filter': [IFilter];
}>();

const filterValue = computed(() => props.filter?.value);

const onValueChange = (value) => {
  const condition =
    (typeof value === 'object' && Object.values(value).every(v => isEmpty(v))) ||
    (isEmpty(value) && typeof value !== 'boolean');

  if (condition) {
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
