<template>
  <dynamic-filter-config-view :disabled="dummy">
    <template #activator="{ visible: configFormVisible }">
      <wt-tooltip
        :disabled="configFormVisible"
        @update:visible="!localValue && fillLocalValue()"
      >
        <template #activator>
          <wt-chip color="primary">
            {{ filter.label || t(`webitelUI.filters.${filter.name}`) }}
            <wt-icon-btn
              v-if="!filterConfig.notDeletable"
              icon="close--filled"
              size="sm"
              color="on-primary"
              @mousedown.stop="deleteFilter"
            />
          </wt-chip>
        </template>

        <template #default>
          <dynamic-filter-preview-info>
            <template #header>
              {{ t(`webitelUI.filters.${props.filter.name}`) }}
            </template>

            <template #default>
              <slot name="info">
                <wt-loader
                  v-if="!localValue"
                  size="sm"
                />
                <component
                  :is="FilterOptionToPreviewComponentMap[filter.name]"
                  v-else
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
          :options="filterOptions"
          @cancel="() => tooltipSlotScope.hide()"
          @submit="(payload) => submit(payload, { hide: tooltipSlotScope.hide })"
        />
      </slot>
    </template>
  </dynamic-filter-config-view>
</template>

<script lang="ts" setup>
import { WtChip, WtIconBtn, WtLoader, WtTooltip } from '@webitel/ui-sdk/components';
import { computed,ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type {FilterOption} from "../../enums/FilterOption";
import type {FilterData, IFilter} from '../../types/Filter';
import DynamicFilterConfigForm from '../config/dynamic-filter-config-form.vue';
import DynamicFilterConfigView from '../config/dynamic-filter-config-view.vue';
import { FilterOptionToApiSearchMethodMap,FilterOptionToPreviewComponentMap } from '../filter-options';
import DynamicFilterPreviewInfo from './dynamic-filter-preview-info.vue';

interface Props {
  filter: IFilter;
  /**
   * @description
   * is needed for form component to localize selected filter name value and/or
   * pass filter options configs
   */
  filterOptions: FilterOption[];
  dummy?: boolean /* https://webitel.atlassian.net/browse/WTEL-6308?focusedCommentId=657415 */;
}

const { t } = useI18n();

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:filter': [FilterData];
  'delete:filter': [IFilter];
}>();

const filterConfig = computed(() => {
  const thisFilterOption = props.filterOptions.find((option) => {
    return option.value === props.filter.name;
  });

  return thisFilterOption;
});

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

  const valueSearchMethod = FilterOptionToApiSearchMethodMap[filterName];

  if (valueSearchMethod) {
    const { items } = await valueSearchMethod({ id: filterValue });
    localValue.value = items;
  } else {
    localValue.value = filterValue;
  }
};

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
  justify-content: center;
  align-items: center;
  gap: var(--spacing-2xs);
}

.wt-loader {
  margin: auto;
}
</style>
