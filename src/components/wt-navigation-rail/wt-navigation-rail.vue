<template>
  <nav class="wt-navigation-rail" aria-label="Navigation rail">
    <ul v-if="topItems.length" class="wt-navigation-rail__group">
      <li v-for="item of topItems" :key="item.id">
        <navigation-rail-button
          :item="item"
          :active="item.id === activeItemId"
          @select="emit('select', $event)"
        />
      </li>
    </ul>
    <ul v-if="bottomItems.length" class="wt-navigation-rail__group wt-navigation-rail__group--bottom">
      <li v-for="item of bottomItems" :key="item.id">
        <navigation-rail-button
          :item="item"
          :active="item.id === activeItemId"
          @select="emit('select', $event)"
        />
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import NavigationRailButton from './_internals/navigation-rail-button.vue';
import type { NavigationRailItem } from './types/WtNavigationRail';

/**
 * Vertical app navigation. Holds no routing logic: emits `select`,
 * host application decides what to do (navigate, open panel, etc.).
 */
const {
	topItems = [],
	bottomItems = [],
	activeItemId = '',
} = defineProps<{
	/** Buttons pinned to the top */
	topItems?: NavigationRailItem[];
	/** Buttons pinned to the bottom */
	bottomItems?: NavigationRailItem[];
	/** Id of the active item */
	activeItemId?: string;
}>();

const emit = defineEmits<{
	/** Fires on click of enabled item */
	select: [
		item: NavigationRailItem,
	];
}>();
</script>

<style scoped>
.wt-navigation-rail {
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  gap: var(--wt-navigation-rail-gap);
  box-sizing: border-box;
  background: var(--wt-navigation-rail-background);
  padding: var(--wt-navigation-rail-padding-y) var(--wt-navigation-rail-padding-x);
  width: var(--wt-navigation-rail-width);
  min-height: 0;
}

.wt-navigation-rail__group {
  display: flex;
  flex-direction: column;
  gap: var(--wt-navigation-rail-gap);
  margin: 0;
  padding: 0;
  list-style: none;
}

.wt-navigation-rail__group--bottom {
  margin-top: auto;
}
</style>
