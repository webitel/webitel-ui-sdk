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
import { useI18n } from 'vue-i18n';

import { FilterData, FilterInitParams, IFilter } from '../../../classes/Filter';
import { AnyFilterConfig } from '../../../modules/filterConfig';

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

const { t } = useI18n();

const filterValue = computed(() => props.filter?.value || null);

const onValueChange = (value) => {
  const condition =
    (typeof value === 'object' && Object.values(value).every(v => isEmpty(v))) ||
    (isEmpty(value) && typeof value !== 'boolean');

  if (condition) {
    emit('delete:filter', props.filter);
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
