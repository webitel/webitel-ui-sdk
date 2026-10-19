<template>
  <nav
    v-if="hasItems"
    class="wt-navigation-rail"
    aria-label="Navigation rail"
  >
    <template v-for="section of sections" :key="section.name">
      <div
        v-if="section.items.length"
        :class="['wt-navigation-rail__group', `wt-navigation-rail__group--${section.name}`]"
      >
        <ul class="wt-navigation-rail__list">
          <li v-for="item of section.items" :key="item.id">
            <navigation-rail-button
              :item="item"
              :active="item.id === activeItemId"
              @select="emit('select', $event)"
            />
          </li>
        </ul>
      </div>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import NavigationRailButton from './_internals/navigation-rail-button.vue';
import type { NavigationRailItem } from './types/WtNavigationRail';

/**
 * Vertical app navigation. Holds no routing logic: emits `select`,
 * host application decides what to do (navigate, open panel, etc.).
 * Lists are data-driven by props. Renders nothing while both lists are empty.
 */
const props = withDefaults(
	defineProps<{
		/** Buttons pinned to the top */
		topItems?: NavigationRailItem[];
		/** Buttons pinned to the bottom */
		bottomItems?: NavigationRailItem[];
		/** Id of the active item */
		activeItemId?: string;
	}>(),
	{
		topItems: () => [],
		bottomItems: () => [],
		activeItemId: '',
	},
);

const hasItems = computed(
	() => !!props.topItems.length || !!props.bottomItems.length,
);

const sections = computed(
	() =>
		[
			{
				name: 'top',
				items: props.topItems,
			},
			{
				name: 'bottom',
				items: props.bottomItems,
			},
		] as const,
);

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

.wt-navigation-rail__group--bottom {
  margin-top: auto;
}

.wt-navigation-rail__group,
.wt-navigation-rail__list {
  display: flex;
  flex-direction: column;
  gap: var(--wt-navigation-rail-gap);
}

.wt-navigation-rail__list {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
