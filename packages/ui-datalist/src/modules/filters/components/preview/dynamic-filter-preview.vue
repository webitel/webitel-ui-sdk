<template>
  <dynamic-filter-config-view :disabled="readonly">
    <template #activator="{ toggle }">
      <div @click="toggle">
        <wt-popover>
          <template #activator="{ show: showChipPopoverCb, hide: hideChipPopover }">
            <div
              @pointerenter="(event) => showChipPopover(event, showChipPopoverCb)"
              @pointerleave="hideChipPopover"
            >
              <wt-chip
                color="primary"
                :removable="!filterConfig.notDeletable && !readonly"
                @remove.stop="deleteFilter"
              >
                {{ filter.label || filterConfig.label }}
              </wt-chip>
            </div>
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
        </wt-popover>
      </div>
    </template>

    <template #content="{ hide }">
      <slot
        name="form"
        v-bind="{ hide }"
      >
        <dynamic-filter-config-form
          :filter="props.filter"
          :filter-config="filterConfig"
          @cancel="hide"
          @submit="
            (payload) => submit(payload, { hide })
          "
        />
      </slot>
    </template>
  </dynamic-filter-config-view>
</template>

<script lang="ts" setup>
import { WtChip, WtLoader, WtPopover } from '@webitel/ui-sdk/components';
import { FilterInitParams } from '../../classes/Filter';
import { useFilterValuePreview } from '../../composables/useFilterValuePreview';
import DynamicFilterConfigForm from '../config/dynamic-view/dynamic-filter-config-form.vue';
import DynamicFilterConfigView from '../config/dynamic-view/dynamic-filter-config-view.vue';
import { DynamicFilterEmits, DynamicFilterProps } from '../types/Filter.types';
import DynamicFilterPreviewInfo from './dynamic-filter-preview-info.vue';

const props = defineProps<DynamicFilterProps>();

const emit = defineEmits<DynamicFilterEmits>();

const { localValue, isRenderPreview, fillLocalValue } = useFilterValuePreview({
	filter: () => props.filter,
	filterConfig: () => props.filterConfig,
});

const showChipPopover = (
	event: Event,
	showPopoverCb: (event: Event) => void,
) => {
	if (!localValue.value) {
		fillLocalValue();
	}

	showPopoverCb(event);
};

const submit = (
	filter: FilterInitParams,
	{
		hide,
	}: {
		hide: () => void;
	},
) => {
	emit('update:filter', filter);
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
