<template>
  <dynamic-filter-config-view :disabled="readonly">
    <template #activator="{ visible: configFormVisible }">
      <wt-tooltip
        :disabled="configFormVisible"
        @update:visible="!localValue && fillLocalValue()"
      >
        <template #activator>
          <wt-chip color="primary">
            {{ filter.label || filterConfig.label }}
            <wt-icon-btn
              v-if="!filterConfig.notDeletable && !readonly"
              color="on-primary"
              icon="close--filled"
              size="sm"
              @mousedown.stop="deleteFilter"
            />
          </wt-chip>
        </template>

        <template #default>
          <dynamic-filter-preview-info>
            <template #header>
              {{ filterConfig.label }}
            </template>

            <template #default>
              <slot name="info">
                <wt-loader
                  v-if="!isRenderPreview"
                  size="sm"
                />
                <component
                  :is="filterConfig.valuePreviewComponent"
                  v-else
                  :filter="props.filter"
                  :filter-config="filterConfig"
                  :value="localValue"
                />
              </slot>
            </template>
          </dynamic-filter-preview-info>
        </template>
      </wt-tooltip>
    </template>

    <template #content="{ tooltipSlotScope }">
      <slot
        name="form"
        v-bind="{ tooltipSlotScope }"
      >
        <dynamic-filter-config-form
          :filter="props.filter"
          :filter-config="filterConfig"
          @cancel="() => tooltipSlotScope.hide()"
          @submit="
            (payload) => submit(payload, { hide: tooltipSlotScope.hide })
          "
        />
      </slot>
    </template>
  </dynamic-filter-config-view>
</template>

<script lang="ts" setup>
import {
  WtChip,
  WtIconBtn,
  WtLoader,
  WtTooltip,
} from '@webitel/ui-sdk/components';
import { computed,ref } from 'vue';
import { useI18n } from 'vue-i18n';

import {FilterData, IFilter} from "../../classes/Filter";
import {AnyFilterConfig} from "../../modules/filterConfig/classes/FilterConfig";
import {
  FilterOptionToPreviewApiSearchMethodMap,
} from '../../modules/filterConfig/components';
import DynamicFilterConfigForm from '../config/dynamic-filter-config-form.vue';
import DynamicFilterConfigView from '../config/dynamic-filter-config-view.vue';
import DynamicFilterPreviewInfo from './dynamic-filter-preview-info.vue';
import { FilterOption } from '../../modules/filterConfig/enums/FilterOption';

interface Props {
  filter: IFilter;
  /**
   * @description
   * this filter config
   */
  filterConfig: AnyFilterConfig;
  readonly?: boolean;
}

const { t } = useI18n();

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:filter': [FilterData];
  'delete:filter': [IFilter];
}>();

const localValue = ref();

/**
 * @author @dlohvinov
 *
 * @description
 * loading filters preview data -> main preview component
 * instead of tooltip-components to avoid api requests spam
 */
const fillLocalValue = async (filter = props.filter) => {
  const filterName = props.filter.name;
  const filterValue = filter.value;

  let valueSearchMethod;

  if (props.filterConfig.searchRecords) {
    /* arrow fn here preserves filterConfig class "this" */
    valueSearchMethod = (...params) => props.filterConfig.searchRecords(...params)
  } else {
    valueSearchMethod = /* compat */ FilterOptionToPreviewApiSearchMethodMap[filterName];
  }

  if(filterName === FilterOption.ContactLabel) {
    return localValue.value = filterValue;
  }

  if (valueSearchMethod) {
    const { items } = await valueSearchMethod({ id: filterValue }, {
      filterValue,
      filterName,
      filterConfig: props.filterConfig,
    });
    localValue.value = items;
  } else {
    localValue.value = filterValue;
  }
};

// [https://webitel.atlassian.net/browse/WTEL-6732]
// if type filter is boolean and value = false, need display preview
const isRenderPreview = computed(() => localValue.value === false || localValue.value);

const submit = (filter: IFilter, { hide }) => {
  emit('update:filter', filter);
  fillLocalValue(filter);
  hide();
};

const deleteFilter = () => {
  emit('delete:filter', props.filter);
};
</script>

<style lang="scss" scoped>
.wt-chip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2xs);
}

.wt-loader {
  margin: auto;
}
</style>
