<template>
  <wt-popover class="wt-table-column-filter">
    <template #activator="{ toggle }">
      <wt-popover class="wt-table-column-filter__preview">
        <template #activator="{ show, hide }">
          <div
            class="wt-table-column-filter__wrapper"
            data-pc-section="columnfilterbutton"
            @pointerenter="showPreview($event, show)"
            @pointerleave="hide"
          >
            <wt-badge :hidden="!active">
              <wt-icon-btn
                icon="table-filter"
                :size="ComponentSize.SM"
                @click="openFilter($event, toggle, hide)"
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
import { ComponentSize } from '@webitel/ui-sdk/enums';
import { useSlots } from 'vue';
import WtBadge from '../../wt-badge/wt-badge.vue';
import WtIconBtn from '../../wt-icon-btn/wt-icon-btn.vue';
import WtPopover from '../../wt-popover/wt-popover.vue';

/**
 * Column header filter icon: popover content from the default slot (scope `hide`); while
 * `active`, hovering shows the `preview` slot in a second popover instead.
 * `data-pc-section="columnfilterbutton"` stops PrimeVue sorting on click here while still
 * bubbling to `document` (closes other popovers); `@mousedown.stop` blocks column drag.
 *
 * [WTEL-7727](https://webitel.atlassian.net/browse/WTEL-7727)
 */
const props = defineProps<{
	/** Shows the badge on the icon (a filter is applied to this column) */
	active?: boolean;
}>();

const slots = useSlots();

const showPreview = (event: Event, show: (event: Event) => void) => {
	if (props.active && slots.preview) show(event);
};

const openFilter = (
	event: Event,
	toggle: (event: Event) => void,
	hide: () => void,
) => {
	hide();
	toggle(event);
};
</script>

<style scoped>
.wt-table-column-filter__wrapper {
  display: flex;
  align-items: center;
}
</style>
