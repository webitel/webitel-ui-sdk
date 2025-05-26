<template>
  <dynamic-filter-config-view
    disable-click-away
    class="dynamic-filter-add-action"
  >
    <template #activator>
      <div class="dynamic-filter-add-action-wrapper">
        <p v-if="props.showLabel">
          {{ t('webitelUI.filters.addFilter') }}
        </p>
        <wt-icon-action action="add-filter" />
      </div>
    </template>

    <template #content="{ tooltipSlotScope }">
      <slot
        name="form"
        v-bind="{ tooltipSlotScope }"
      >
        <dynamic-filter-config-form
          :filter-configs="props.filterConfigs"
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
import { WtIconAction } from '@webitel/ui-sdk/components';
import { useI18n } from 'vue-i18n';

import {FilterInitParams} from "../classes/Filter";
import {BaseFilterConfig} from "../modules/filterConfig/classes/FilterConfig";
import DynamicFilterConfigForm from './config/dynamic-view/dynamic-filter-config-form.vue';
import DynamicFilterConfigView from './config/dynamic-view/dynamic-filter-config-view.vue';

interface Props {
  filterConfigs: BaseFilterConfig[];
  showLabel?: boolean;
}

const props = defineProps<Props>();

const { t } = useI18n();

const emit = defineEmits<{
  'add:filter': [FilterInitParams];
}>();

const submit = (payload: FilterInitParams, { hide }) => {
  emit('add:filter', payload);
  hide();
};
</script>

<style lang="scss" scoped>
.dynamic-filter-add-action {
  display: flex;

  &-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-2xs);
    cursor: pointer;
    width: fit-content;
  }
}
</style>
