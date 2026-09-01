<template>
  <dynamic-filter-config-view
    ref="dynamicFilterAddAction"
    disable-click-away
    class="dynamic-filter-add-action"
  >
    <template #activator="{toggle}">
      <div class="dynamic-filter-add-action-wrapper" @click="toggle">
        <p v-if="props.showLabel">
          {{ t('webitelUI.filters.addFilter') }}
        </p>
        <wt-icon-action action="add-filter" />
      </div>
    </template>

    <template #content="{ hide }">
      <slot name="form">
        <div ref="popoverContentRef">
          <dynamic-filter-config-form
            :filter-configs="props.filterConfigs"
            @cancel="hide"
            @submit="
              (payload) => submit(payload, { hide })
            "
          />
        </div>
      </slot>
    </template>
  </dynamic-filter-config-view>
</template>

<script lang="ts" setup>
import { onClickOutside, useEventListener } from '@vueuse/core';
import { WtIconAction } from '@webitel/ui-sdk/components';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { FilterInitParams } from '../classes/Filter';
import { BaseFilterConfig } from '../modules/filterConfig/classes/FilterConfig';
import DynamicFilterConfigForm from './config/dynamic-view/dynamic-filter-config-form.vue';
import DynamicFilterConfigView from './config/dynamic-view/dynamic-filter-config-view.vue';

interface Props {
	filterConfigs: BaseFilterConfig[];
	showLabel?: boolean;
}

const props = defineProps<Props>();

const { t } = useI18n();

const emit = defineEmits<{
	'add:filter': [
		FilterInitParams,
	];
}>();

const submit = (
	payload: FilterInitParams,
	{
		hide,
	}: {
		hide: () => void;
	},
) => {
	emit('add:filter', payload);
	hide();
};

const popoverContentRef = ref<HTMLElement | null>(null);
const dynamicFilterAddAction = ref<{
	hidePopover: () => void;
} | null>(null);

/**
 * @author @HlukhovYe
 *
 * https://webitel.atlassian.net/browse/WTEL-10240
 *
 * A click fully outside the popover can also be the same click that closes a
 * child select/multiselect/datepicker overlay (its own panel is teleported to
 * `body`, so it's not a descendant of `popoverContentRef`, and the `ignore`
 * list below only matches clicks landing directly on it, not this outside
 * click). The browser blurs the overlay's focused element (e.g. a multiselect
 * filter input) as part of the same mousedown that starts this click, so by
 * the time onClickOutside's own `click`-phase handler runs, `activeElement`
 * has already reset to `body` — too late to check. A capture-phase
 * `pointerdown` listener runs earlier, while focus is still intact, so it's
 * used here to snapshot whether an open field overlay currently has focus.
 * If so, let that overlay's own outside-click handler close it and leave this
 * popover open — otherwise both close on the same click.
 */
let hadOwnOpenFieldOverlayOnPointerdown = false;
useEventListener(
	document,
	'pointerdown',
	() => {
		const openFieldOverlay = document.querySelector(
			'.p-select-overlay, .p-multiselect-overlay, .p-datepicker-panel',
		);
		hadOwnOpenFieldOverlayOnPointerdown = !!(
			openFieldOverlay &&
			(popoverContentRef.value?.contains(document.activeElement) ||
				openFieldOverlay.contains(document.activeElement))
		);
	},
	{
		capture: true,
	},
);

/**
 * @author @Oleksandr Palonnyi
 *
 * [WTEL-8817](https://webitel.atlassian.net/browse/WTEL-8817)
 *
 * Close popover on outside click.
 * Capture phase fixes PrimeVue bug where stopPropagation() (used by navbar menus)
 * blocks default outside-click detection. Capture fires before the block.
 * Ignore: .wt-chip (activator), .p-popover (popover content)
 * */
onClickOutside(
	popoverContentRef,
	() => {
		if (hadOwnOpenFieldOverlayOnPointerdown) return;

		dynamicFilterAddAction?.value?.hidePopover();
	},
	{
		capture: true, // Fix for PrimeVue stopPropagation bug
		ignore: [
			'.wt-chip',
			'.p-popover',
			'.p-select-overlay',
			'.p-multiselect-overlay',
			'.p-datepicker-panel',
		], // Exclude activator, popover content, and teleported select/multiselect panels
	},
);
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
