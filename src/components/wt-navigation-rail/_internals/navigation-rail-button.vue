<template>
  <wt-tooltip :disabled="!item.label" placement="right">
    <template #activator>
      <button
        :class="{
          'navigation-rail-button--active': active,
        }"
        :aria-label="item.label"
        :aria-current="active ? 'page' : undefined"
        :disabled="item.disabled"
        class="navigation-rail-button"
        type="button"
        @click="emit('select', item)"
      >
        <wt-icon :icon="item.icon" />
        <wt-badge-new
          v-if="item.badge"
          :value="item.badge.value"
          :severity="item.badge.severity ?? 'success'"
          class="navigation-rail-button__badge"
        />
      </button>
    </template>
    {{ item.label }}
  </wt-tooltip>
</template>

<script setup lang="ts">
import WtBadgeNew from '../../wt-badge-new/wt-badge.vue';
import WtIcon from '../../wt-icon/wt-icon.vue';
import WtTooltip from '../../wt-tooltip/wt-tooltip.vue';
import type { NavigationRailItem } from '../types/WtNavigationRail';

defineProps<{
	item: NavigationRailItem;
	active?: boolean;
}>();

const emit = defineEmits<{
	select: [
		item: NavigationRailItem,
	];
}>();
</script>

<style scoped>
.navigation-rail-button {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border: 0;
  border-radius: var(--wt-navigation-rail-button-radius);
  background: transparent;
  cursor: pointer;
  padding: var(--wt-navigation-rail-button-padding);
  transition: var(--transition);
}

.navigation-rail-button :deep(.wt-icon) {
  width: var(--wt-navigation-rail-button-icon-size);
  height: var(--wt-navigation-rail-button-icon-size);
  fill: var(--wt-navigation-rail-button-icon-color);
}

.navigation-rail-button:hover:not(:disabled) {
  background: var(--wt-navigation-rail-button-background--hover);
}

.navigation-rail-button:focus-visible {
  outline: 2px solid var(--wt-navigation-rail-button-icon-color);
  outline-offset: 2px;
}

.navigation-rail-button--active {
  background: var(--wt-navigation-rail-button-background--active);
}

.navigation-rail-button--active:hover:not(:disabled) {
  background: var(--wt-navigation-rail-button-background--active-hover);
}

.navigation-rail-button--active :deep(.wt-icon) {
  fill: var(--wt-navigation-rail-button-icon-color--active);
}

.navigation-rail-button--active:hover:not(:disabled) :deep(.wt-icon) {
  fill: var(--wt-navigation-rail-button-icon-color--active-hover);
}

.navigation-rail-button:disabled {
  opacity: 0.5;
  cursor: default;
}

.navigation-rail-button__badge {
  position: absolute;
  top: var(--wt-navigation-rail-badge-offset-y);
  left: var(--wt-navigation-rail-badge-offset-x);
  /* p-badge sets own width/min-width (1.5rem), override to match design */
  width: auto;
  min-width: var(--wt-navigation-rail-badge-size);
  height: var(--wt-navigation-rail-badge-size);
  padding: 0 var(--wt-navigation-rail-badge-padding-x);
}
</style>
