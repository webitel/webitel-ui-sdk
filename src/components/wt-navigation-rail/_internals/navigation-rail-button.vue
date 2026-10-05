<template>
  <wt-tooltip :disabled="!item.label" placement="right">
    <template #activator>
      <wt-button
        :class="{ 'navigation-rail-button--active': active }"
        :aria-label="item.label"
        :aria-current="active ? 'page' : undefined"
        :badge="item.badge ? String(item.badge.value) : undefined"
        :badge-severity="item.badge?.severity ?? 'success'"
        :disabled="item.disabled"
        :icon="item.icon"
        :size="ComponentSize.SM"
        :variant="ButtonVariant.TEXT"
        class="navigation-rail-button"
        @click="emit('select', item)"
      />
    </template>
    {{ item.label }}
  </wt-tooltip>
</template>

<script setup lang="ts">
import { ButtonVariant, ComponentSize } from '../../../enums';
import WtButton from '../../wt-button/wt-button.vue';
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
/* wt-button theme colors are overridden with navigation rail tokens */
.navigation-rail-button.p-button.p-button-text {
  --icon-color: var(--wt-navigation-rail-button-icon-color);
  background: transparent;
  color: var(--wt-navigation-rail-button-icon-color);
}

.navigation-rail-button.p-button.p-button-text:not(:disabled):hover,
.navigation-rail-button.p-button.p-button-text:not(:disabled):active {
  --icon-color: var(--wt-navigation-rail-button-icon-color);
  background: var(--wt-navigation-rail-button-background--hover);
}

.navigation-rail-button--active.p-button.p-button-text,
.navigation-rail-button--active.p-button.p-button-text:not(:disabled):active {
  --icon-color: var(--wt-navigation-rail-button-icon-color--active);
  background: var(--wt-navigation-rail-button-background--active);
}

.navigation-rail-button--active.p-button.p-button-text:not(:disabled):hover {
  --icon-color: var(--wt-navigation-rail-button-icon-color--active-hover);
  background: var(--wt-navigation-rail-button-background--active-hover);
}

.navigation-rail-button :deep(.wt-badge) {
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
