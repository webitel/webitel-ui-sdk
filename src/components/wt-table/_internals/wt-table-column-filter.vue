<template>
  <wt-popover class="wt-table-column-filter">
    <template #activator="{ toggle }">
      <wt-popover class="wt-table-column-filter__preview">
        <template #activator="{ show: showPreview, hide: hidePreview }">
          <!-- plain wrapper: listeners on wt-badge itself don't reach its root (same as the chip preview) -->
          <div
            class="wt-table-column-filter__wrapper"
            data-pc-section="columnfilterbutton"
            @pointerenter="showPreviewIfActive($event, showPreview)"
            @pointerleave="hidePreview()"
          >
            <wt-badge :hidden="!active">
              <wt-icon-btn
                icon="filte"
                @click="openFilter($event, toggle, hidePreview)"
                @mousedown.stop
              />
            </wt-badge>
          </div>
        </template>

        <template #default>
          <slot name="preview" />
        </template>
      </wt-popover>
    </template>

    <template #default="{ hide }">
      <slot v-bind="{ hide }" />
    </template>
  </wt-popover>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';

import WtBadge from '../../wt-badge/wt-badge.vue';
import WtIconBtn from '../../wt-icon-btn/wt-icon-btn.vue';
import WtPopover from '../../wt-popover/wt-popover.vue';

/**
 * Column header filter trigger: a filter icon that opens a popover.
 * Knows nothing about filters themselves — the popover content comes from the default slot
 * (scope: `hide`), `active` only shows the red badge on the icon.
 * While active, hovering the icon shows the `preview` slot (same card as the panel chip) in a
 * second popover; opening the filter popover hides it.
 *
 * `data-pc-section="columnfilterbutton"` makes PrimeVue skip sorting for clicks inside the wrapper
 * (the click still bubbles to `document`, so other open popovers close),
 * `@mousedown.stop` keeps PrimeVue from starting a column drag from the icon.
 *
 * [WTEL-7727](https://webitel.atlassian.net/browse/WTEL-7727)
 */
const props = withDefaults(
	defineProps<{
		/** Shows the badge on the icon (a filter is applied to this column) */
		active?: boolean;
	}>(),
	{
		active: false,
	},
);

const slots = useSlots();

const hasPreview = computed(() => props.active && !!slots.preview);

const showPreviewIfActive = (event: Event, show: (event: Event) => void) => {
	if (hasPreview.value) show(event);
};

const openFilter = (
	event: Event,
	toggle: (event: Event) => void,
	hidePreview: () => void,
) => {
	hidePreview();
	toggle(event);
};
</script>

<style scoped>
.wt-table-column-filter__wrapper {
  display: flex;
  align-items: center;
}
</style>
