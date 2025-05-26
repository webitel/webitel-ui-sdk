<template>
  <!--  TODO: maybe this wrapper is not needed here? -->
  <div class="static-filter-field">
    <component
      :is="filterConfig.valueInputComponent"
      :model-value="filterValue"
      :filter-config="filterConfig"
      :label="labelText"
      :disable:validation="true /* coz staticView filter is always present */"
      @update:model-value="onValueChange"
    />
  </div>
</template>

<script setup lang="ts">
import { isEmpty } from '@webitel/ui-sdk/scripts';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { FilterData, FilterInitParams, IFilter } from '../../../classes/Filter';
import { AnyFilterConfig } from '../../../modules/filterConfig';

const props = defineProps<{
  filter: IFilter; // TODO: share me from dynamic-filter-preview.vue
  /**
   * @description
   * this filter config
   */
  filterConfig: AnyFilterConfig; // TODO: share me from dynamic-filter-preview.vue
}>();


const emit = defineEmits<{
  'add:filter': [FilterInitParams]; // TODO: share me from dynamic-filter-add-action.vue
  'update:filter': [FilterData]; // TODO: share me from dynamic-filter-preview.vue
  'delete:filter': [IFilter]; // TODO: share me from dynamic-filter-preview.vue
}>();

const { t } = useI18n();

const filterValue = computed(() => props.filter?.value);

const labelText = computed(() => {
  return t('name me from filterConfig.name');
});

const onValueChange = (value) => {
  if (isEmpty(value)) {
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
};

</script>

<style scoped lang="scss">
.static-filter-field {

}
</style>
