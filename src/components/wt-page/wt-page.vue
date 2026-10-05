<template>
  <div class="wt-page">
    <div v-if="$slots.header" class="wt-page__header">
      <slot name="header" />
    </div>
    <div class="wt-page__main">
      <wt-navigation-rail
        v-if="showNavigationRail"
        :top-items="navigationRailTopItems"
        :bottom-items="navigationRailBottomItems"
        :active-item-id="navigationRailActiveItemId"
        class="wt-page__navigation-rail"
        @select="emit('navigation-rail:select', $event)"
      />
      <div class="wt-page__body">
        <!-- @slot Layouts of the page -->
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NavigationRailItem } from '../wt-navigation-rail/types/WtNavigationRail';
import WtNavigationRail from '../wt-navigation-rail/wt-navigation-rail.vue';

/**
 * Top structural level of the interface: full-width header + optional
 * navigation rail + body, where the body distributes its width between
 * one or more `wt-layout`s.
 *
 * Navigation rail logic lives in the host application: wt-page only renders
 * the rail and re-emits its events.
 */
const {
	showNavigationRail = false,
	navigationRailTopItems = [],
	navigationRailBottomItems = [],
	navigationRailActiveItemId = '',
} = defineProps<{
	/** Shows navigation rail on the left of the body, below the header */
	showNavigationRail?: boolean;
	navigationRailTopItems?: NavigationRailItem[];
	navigationRailBottomItems?: NavigationRailItem[];
	/** Id of the active navigation rail item */
	navigationRailActiveItemId?: string;
}>();

const emit = defineEmits<{
	/** Fires when navigation rail item is selected */
	'navigation-rail:select': [
		item: NavigationRailItem,
	];
}>();

defineSlots<{
	header?: () => unknown;
	default?: () => unknown;
}>();
</script>

<style scoped>
.wt-page {
  display: flex;
  flex-direction: column;
  gap: var(--wt-page-gap);
  box-sizing: border-box;
  background: var(--wt-page-background-color);
  padding: var(--wt-page-padding-y) var(--wt-page-padding-x);
  width: 100%;
  height: 100%;
  min-height: 0;
}

.wt-page__header {
  flex: 0 0 auto;
}

.wt-page__main {
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
}

.wt-page__navigation-rail {
  flex: 0 0 auto;
}

.wt-page__body {
  display: flex;
  position: relative;
  flex: 1 1 auto;
  gap: var(--wt-page-body-gap);
  box-sizing: border-box;
  background: var(--wt-page-body-background-color);
  padding: var(--wt-page-body-padding-y) var(--wt-page-body-padding-x);
  min-width: 0;
  min-height: 0;
}
</style>
